import { FIBOT_SYSTEM_PROMPT } from '../data/fibotKnowledge';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Rantai model gratis: kalau satu kena batas kuota (429) / provider error,
// otomatis coba model berikutnya. Urutan bisa disesuaikan sesuai daftar
// terbaru di openrouter.ai/models (cari yang bertanda ":free").
const FIBOT_MODEL_CANDIDATES = [
  'openrouter/free',
];

const LOCAL_STORAGE_KEY = 'fibot_custom_openrouter_api_key';
const MODEL_CACHE_KEY = 'fibot_preferred_openrouter_model';

// Ingat model terakhir yang berhasil, agar request berikutnya tidak selalu
// mulai dari model yang sedang kena limit
let preferredModelIndex = (() => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem(MODEL_CACHE_KEY);
      const idx = FIBOT_MODEL_CANDIDATES.indexOf(saved);
      if (idx !== -1) return idx;
    }
  } catch {
    /* ignore */
  }
  return 0;
})();

function rememberWorkingModel(index) {
  preferredModelIndex = index;
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(MODEL_CACHE_KEY, FIBOT_MODEL_CANDIDATES[index]);
    }
  } catch {
    /* ignore */
  }
}

/**
 * Retrieve the active OpenRouter API Key from environment or local storage.
 */
export function getActiveOpenRouterApiKey() {
  const envKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (
    envKey &&
    typeof envKey === 'string' &&
    envKey.trim() !== '' &&
    !envKey.includes('your_openrouter_api_key')
  ) {
    return envKey.trim();
  }

  if (typeof window !== 'undefined' && window.localStorage) {
    const savedKey = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedKey && savedKey.trim() !== '') {
      return savedKey.trim();
    }
  }

  return '';
}

/**
 * Store a custom user-provided API key in local storage.
 */
export function saveCustomOpenRouterApiKey(key) {
  if (typeof window !== 'undefined' && window.localStorage) {
    if (!key || key.trim() === '') {
      window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    } else {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, key.trim());
    }
  }
}

/**
 * Check if an API key is available (OpenRouter keys start with "sk-or-").
 */
export function hasValidOpenRouterApiKey() {
  const key = getActiveOpenRouterApiKey();
  return Boolean(key && key.startsWith('sk-or-'));
}

/**
 * Small abort-aware delay helper.
 */
function delay(ms, signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    if (signal) {
      signal.addEventListener(
        'abort',
        () => {
          clearTimeout(timer);
          reject(new DOMException('Aborted', 'AbortError'));
        },
        { once: true }
      );
    }
  });
}

/**
 * Single OpenRouter chat-completion request.
 */
function requestOpenRouter(apiKey, body, signal) {
  return fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      // Optional OpenRouter attribution headers (recommended by their docs)
      'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'https://localhost',
      'X-Title': 'ADIAN Portfolio - Fibot AI',
    },
    body,
    signal,
  });
}

/**
 * Send messages thread to OpenRouter Chat Completion API (Gemma free tier).
 * @param {Array<{role: 'user' | 'assistant' | 'system', content: string}>} conversationHistory
 * @param {AbortSignal} [signal]
 * @returns {Promise<string>}
 */
export async function sendChatMessageToFibot(conversationHistory, signal) {
  const apiKey = getActiveOpenRouterApiKey();

  if (!apiKey) {
    throw new Error(
      'OpenRouter API key is not set yet. Add it to your `.env.local` file as VITE_OPENROUTER_API_KEY.'
    );
  }

  const messagesPayload = [
    { role: 'system', content: FIBOT_SYSTEM_PROMPT },
    ...conversationHistory.map((msg) => ({
      role: msg.role === 'fibot' ? 'assistant' : msg.role,
      content: msg.content,
    })),
  ];

  const makeBody = (model) =>
    JSON.stringify({
      model,
      messages: messagesPayload,
      temperature: 0.6,
      max_tokens: 400,
    });

  let lastDetail = '';

  for (let attempt = 0; attempt < FIBOT_MODEL_CANDIDATES.length; attempt++) {
    const modelIndex =
      (preferredModelIndex + attempt) % FIBOT_MODEL_CANDIDATES.length;
    const model = FIBOT_MODEL_CANDIDATES[modelIndex];

    let response;
    try {
      response = await requestOpenRouter(apiKey, makeBody(model), signal);
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new DOMException('Aborted', 'AbortError');
      }
      // Gangguan jaringan -> lanjut ke model berikutnya
      lastDetail = `Koneksi gagal (${error.message})`;
      continue;
    }

    // Sukses - ingat model ini untuk request berikutnya
    if (response.ok) {
      rememberWorkingModel(modelIndex);
      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content;
      if (!reply) {
        throw new Error('Tidak ada respons yang diterima dari Fibot.');
      }
      return reply.trim();
    }

    // Baca pesan error dari server
    let detail = '';
    try {
      const errorData = await response.json();
      detail = errorData?.error?.message || '';
    } catch {
      detail = '';
    }
    if (detail) lastDetail = `${model}: ${detail}`;

    // API key bermasalah -> tidak ada gunanya mencoba model lain
    if (response.status === 401 || response.status === 403) {
      throw new Error(
        `Your OpenRouter API key is invalid or expired. ${detail}`.trim()
      );
    }

    // 429 (limit kuota) / 402 (kredit habis) / 5xx (provider overload/error)
    // -> coba model gratis berikutnya dalam rantai, dengan backoff bertahap
    const retryable =
      response.status === 429 ||
      response.status === 402 ||
      response.status >= 500 ||
      /provider/i.test(detail);

    if (retryable && attempt < FIBOT_MODEL_CANDIDATES.length - 1) {
      await delay(600 * (attempt + 1), signal);
      continue;
    }

    throw new Error(
      detail ||
        `Terjadi kesalahan pada server OpenRouter (${response.status}).`
    );
  }

  throw new Error(
    `All free AI models are currently rate-limited.${
      lastDetail ? ` Last detail: ${lastDetail}` : ''
    } Please try again later (free quotas usually reset daily).`
  );
}
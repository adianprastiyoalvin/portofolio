import React, { useState, useEffect, useRef } from 'react';
import FibotFace from './FibotFace';
import { SUGGESTED_QUESTIONS } from '../../data/fibotKnowledge';
import { sendChatMessageToFibot } from '../../lib/openrouter';

/**
 * Format simple markdown text into formatted elements (bold, bullet lists, links, paragraphs).
 */
function FormattedMessage({ text }) {
  if (!text) return null;

  const lines = text.split('\n');

  return (
    <div className="fibot-formatted-content">
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={lineIdx} className="fibot-line-gap" />;
        }

        // Bullet lists
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || /^\d+\.\s/.test(trimmed)) {
          const content = trimmed.replace(/^[-*]\s+|\d+\.\s+/, '');
          return (
            <div key={lineIdx} className="fibot-list-item">
              <span className="fibot-bullet">•</span>
              <span>{renderInlineStyles(content)}</span>
            </div>
          );
        }

        return (
          <p key={lineIdx} className="fibot-paragraph">
            {renderInlineStyles(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

/**
 * Parse bold (**bold**) and inline code (`code`) and links
 */
function renderInlineStyles(str) {
  const parts = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|https?:\/\/[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(str)) !== null) {
    if (match.index > lastIndex) {
      parts.push(str.substring(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(<strong key={match.index}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(<code key={match.index} className="fibot-inline-code">{token.slice(1, -1)}</code>);
    } else if (token.startsWith('http://') || token.startsWith('https://')) {
      parts.push(
        <a
          key={match.index}
          href={token}
          target="_blank"
          rel="noreferrer"
          className="fibot-link"
        >
          {token}
        </a>
      );
    } else if (token.includes('@') && !token.includes(' ')) {
      parts.push(
        <a
          key={match.index}
          href={`mailto:${token}`}
          className="fibot-link"
        >
          {token}
        </a>
      );
    } else {
      parts.push(token);
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < str.length) {
    parts.push(str.substring(lastIndex));
  }

  return parts.length > 0 ? parts : str;
}

export default function FibotDrawer({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Render phases: null = unmounted | 'open' = drawer visible | 'closing' = slide-out animation
  const [renderPhase, setRenderPhase] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Idle personality for the hero avatar: smooth wide glances + natural blinks
  // Neutral x = 48 compensates FibotFace's 'see-center' -48px rig shift,
  // so the resting face looks straight ahead (eyes centered).
  const [heroGaze, setHeroGaze] = useState({ x: 48, y: 0 });
  const [heroIsBlinking, setHeroIsBlinking] = useState(false);

  const targetGazeRef = useRef({ x: 48, y: 0 });
  const currentGazeRef = useRef({ x: 48, y: 0 });

  useEffect(() => {
    if (!isOpen || isLoading) {
      // Reset to a neutral resting face whenever idle stops
      targetGazeRef.current = { x: 48, y: 0 };
      currentGazeRef.current = { x: 48, y: 0 };
      setHeroGaze({ x: 48, y: 0 });
      setHeroIsBlinking(false);
      return undefined;
    }

    // Final eye-rig offsets in SVG user units.
    // Safe horizontal range is roughly +-110 before the pupils touch the face
    // circle edge; +-95 keeps a comfortable margin.
    const GAZE_POSITIONS = [-95, 0, 95];
    // FibotFace 'see-center' shifts the rig by -48 on X, so compensate for it
    const CENTER_COMPENSATION = 48;

    let gazeTimer;
    let blinkTimer;
    let blinkOpenTimer;
    let rafId;

    /* --- Smooth lerp gaze loop (rAF): eyes glide organically to their target --- */
    const animateGaze = () => {
      const curr = currentGazeRef.current;
      const target = targetGazeRef.current;

      // Damping factor 0.07 -> slower, silkier glide than the floating avatar
      const nextX = curr.x + (target.x - curr.x) * 0.07;
      const nextY = curr.y + (target.y - curr.y) * 0.07;

      currentGazeRef.current = { x: nextX, y: nextY };

      if (Math.abs(nextX - curr.x) > 0.05 || Math.abs(nextY - curr.y) > 0.05) {
        setHeroGaze({ x: nextX, y: nextY });
      }

      rafId = requestAnimationFrame(animateGaze);
    };

    /* --- Random glance scheduler: far left / center / far right --- */
    const scheduleGlance = () => {
      gazeTimer = setTimeout(() => {
        targetGazeRef.current = {
          x:
            GAZE_POSITIONS[Math.floor(Math.random() * GAZE_POSITIONS.length)] +
            CENTER_COMPENSATION,
          y: Math.random() * 20 - 10,
        };
        scheduleGlance();
      }, 2500 + Math.random() * 2000);
    };

    /* --- Natural organic blinking (same feel as the floating Fibot) --- */
    const scheduleBlink = () => {
      blinkTimer = setTimeout(() => {
        setHeroIsBlinking(true);
        blinkOpenTimer = setTimeout(() => {
          setHeroIsBlinking(false);
          scheduleBlink();
        }, 180);
      }, 3500 + Math.random() * 4000);
    };

    rafId = requestAnimationFrame(animateGaze);
    scheduleGlance();
    scheduleBlink();

    return () => {
      clearTimeout(gazeTimer);
      clearTimeout(blinkTimer);
      clearTimeout(blinkOpenTimer);
      cancelAnimationFrame(rafId);

      targetGazeRef.current = { x: 48, y: 0 };
      currentGazeRef.current = { x: 48, y: 0 };
      setHeroGaze({ x: 48, y: 0 });
      setHeroIsBlinking(false);
    };
  }, [isOpen, isLoading]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Mount / unmount with slide-in & slide-out animation phases
  useEffect(() => {
    if (isOpen) {
      setRenderPhase('open');
      return;
    }
    setRenderPhase((prev) => {
      if (prev !== 'open') return prev;
      setTimeout(() => setRenderPhase(null), 340);
      return 'closing';
    });
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 320);
    }
  }, [isOpen]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const messageContent = (textToSend || inputValue).trim();
    if (!messageContent || isLoading) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageContent,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      abortControllerRef.current = new AbortController();
      const aiReply = await sendChatMessageToFibot(
        updatedMessages,
        abortControllerRef.current.signal
      );

      setMessages((prev) => [
        ...prev,
        {
          id: `fibot-${Date.now()}`,
          role: 'fibot',
          content: aiReply,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      if (error.name !== 'AbortError') {
        setMessages((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            role: 'fibot',
            content: `⚠️ **Oops, something went wrong:** ${error.message}`,
            isError: true,
            timestamp: new Date(),
          },
        ]);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!renderPhase) return null;

  return (
    <div className={`fibot-drawer-root ${renderPhase === 'open' ? 'is-open' : ''}`}>
      {/* Backdrop overlay */}
      <div className="fibot-drawer-backdrop" onClick={onClose} />

      {/* Drawer Panel Container */}
      <div className="fibot-drawer-panel" role="dialog" aria-labelledby="fibot-hero-headline">
        {/* ============================================================
            1. TOP MINIMAL CONTROL BAR (Close only)
            ============================================================ */}
        <div className="fibot-drawer-topbar">
          <div className="fibot-topbar-actions">
            {/* Close Modal Button */}
            <button
              type="button"
              className="fibot-drawer-close-btn"
              onClick={onClose}
              title="Close (Esc)"
              aria-label="Close modal"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* 2. SCROLLABLE BODY (FIGMA HERO + CHAT STREAM) */}
        <div className="fibot-chat-body">
          <div className="fibot-chat-body-inner">
          {/* ============================================================
              FIGMA HERO VIEW (Desktop - 1, Node 41:107)
              ============================================================ */}
          <div className="fibot-figma-hero">
            <div className="fibot-hero-text-wrap">
              <span className="fibot-hero-subtitle">Let’s Ask</span>
              <h2 className="fibot-hero-headline" id="fibot-hero-headline">Fibot</h2>
              <p className="fibot-hero-description">
                Fibot is a personal AI chatbot that can answer some questions about ADIAN himself!
              </p>
            </div>

            {/* Centered Large CSS/SVG Avatar with Idle Eye Personality */}
            <div className="fibot-hero-avatar-wrap">
              <FibotFace
                size={148}
                state="see-center"
                eyeX={heroGaze.x}
                eyeY={heroGaze.y}
                isBlinking={heroIsBlinking}
                isThinking={isLoading}
                className="fibot-hero-pure-face"
              />
            </div>

            {/* Greeting Speech Bubble */}
            <div className="fibot-hero-speech-bubble">
              <p>
                I’m <strong>Fibot</strong>, what do you want to know?
              </p>
            </div>

            {/* Suggested Question Chips */}
            {messages.length === 0 && (
              <div className="fibot-suggestions-wrapper">
                <span className="fibot-suggestions-title">Suggested Questions:</span>
                <div className="fibot-chips-grid">
                  {SUGGESTED_QUESTIONS.map((question, qIdx) => (
                    <button
                      key={qIdx}
                      type="button"
                      className="fibot-chip-btn"
                      onClick={() => handleSendMessage(question)}
                      disabled={isLoading}
                    >
                      <span>{question}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ============================================================
              CONVERSATION MESSAGES LIST
              ============================================================ */}
          {messages.length > 0 && (
            <div className="fibot-messages-list">
              {messages.map((msg) => {
                const isFibot = msg.role === 'fibot';
                return (
                  <div
                    key={msg.id}
                    className={`fibot-message-row ${isFibot ? 'is-bot' : 'is-user'} ${
                      msg.isError ? 'is-error' : ''
                    }`}
                  >
                    {isFibot && (
                      <div className="fibot-bubble-avatar">
                        <FibotFace size={30} state="see-center" eyeX={48} />
                      </div>
                    )}

                    <div className="fibot-message-bubble">
                      <FormattedMessage text={msg.content} />
                      <span className="fibot-message-time">
                        {msg.timestamp?.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Loading / Thinking Indicator */}
              {isLoading && (
                <div className="fibot-message-row is-bot is-thinking">
                  <div className="fibot-bubble-avatar">
                    <FibotFace size={30} state="see-center" eyeX={48} isThinking={true} />
                  </div>
                  <div className="fibot-message-bubble fibot-thinking-bubble">
                    <div className="fibot-typing-dots">
                      <span className="fibot-dot" />
                      <span className="fibot-dot" />
                      <span className="fibot-dot" />
                    </div>
                    <span className="fibot-thinking-label">Fibot is thinking...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
          </div>
        </div>

        {/* ============================================================
            3. INPUT BAR (FIGMA Node 48:83 - Ask Fibot + Sent Icon)
            ============================================================ */}
        <div className="fibot-input-footer">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="fibot-input-form"
          >
            <input
              ref={inputRef}
              type="text"
              className="fibot-chat-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Fibot"
              disabled={isLoading}
              maxLength={500}
              aria-label="Ask Fibot"
            />
            <button
              type="submit"
              className={`fibot-send-btn ${inputValue.trim() ? 'is-active' : ''}`}
              disabled={!inputValue.trim() || isLoading}
              aria-label="Send message"
              title="Send (Enter)"
            >
              {/* Exact Figma Sent SVG Vector */}
              <svg width="20" height="20" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M105.239 15.2646C94.3485 3.53681 12.4324 32.266 12.5 42.755C12.5767 54.6495 44.4904 58.3085 53.336 60.7905C58.6555 62.2825 60.08 63.8125 61.3065 69.3905C66.8615 94.6525 69.6505 107.217 76.007 107.498C86.139 107.946 115.867 26.71 105.239 15.2646Z"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinejoin="round"
                />
                <path
                  d="M57.4995 62.5L74.9995 45"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
import React, { useEffect } from 'react';

/**
 * Reusable image lightbox for overview documentation photos.
 * Closes on backdrop click, close button, or Escape key.
 * Pauses body scroll while open.
 */
export default function Lightbox({ image, title, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="doc-lightbox-backdrop" onClick={onClose}>
      <div
        className="doc-lightbox-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={title || 'Documentation preview'}
      >
        <div className="doc-lightbox-img-container">
          {image && (
            <img
              src={image}
              alt={title || 'Documentation'}
              className="doc-lightbox-img"
              loading="eager"
              decoding="async"
            />
          )}
          <button
            type="button"
            className="doc-lightbox-close"
            onClick={onClose}
            aria-label="Close image viewer"
            title="Close (Esc)"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
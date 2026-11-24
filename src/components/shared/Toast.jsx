import React from 'react';

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 1000,
        background: 'rgba(20, 19, 28, 0.95)',
        color: '#ffffff',
        padding: '12px 24px',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
        fontSize: '14px',
        fontWeight: 500,
        backdropFilter: 'blur(10px)',
        animation: 'slideUpToast 0.3s ease-out',
        pointerEvents: 'auto',
      }}
    >
      {message}
    </div>
  );
}
import React, { forwardRef } from 'react';

export const DarkBtn = forwardRef(function DarkBtn(
  { children, href, onClick, className = '', ...props },
  ref
) {
  if (href) {
    return (
      <a ref={ref} href={href} onClick={onClick} className={`dark-btn ${className}`} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button ref={ref} type="button" onClick={onClick} className={`dark-btn ${className}`} {...props}>
      {children}
    </button>
  );
});

export default DarkBtn;
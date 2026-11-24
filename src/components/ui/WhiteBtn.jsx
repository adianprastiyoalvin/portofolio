import React, { forwardRef } from 'react';

export const WhiteBtn = forwardRef(function WhiteBtn(
  { children, href, onClick, className = '', ...props },
  ref
) {
  if (href) {
    return (
      <a ref={ref} href={href} onClick={onClick} className={`white-btn ${className}`} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button ref={ref} type="button" onClick={onClick} className={`white-btn ${className}`} {...props}>
      {children}
    </button>
  );
});

export default WhiteBtn;
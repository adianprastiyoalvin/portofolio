import React, { forwardRef } from 'react';

export const PillBtn = forwardRef(function PillBtn(
  { children, href, onClick, className = '', ...props },
  ref
) {
  const baseClassName = `pill-btn ${className}`.trim();

  if (href) {
    return (
      <a ref={ref} href={href} onClick={onClick} className={baseClassName} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button ref={ref} type="button" onClick={onClick} className={baseClassName} {...props}>
      {children}
    </button>
  );
});

export default PillBtn;
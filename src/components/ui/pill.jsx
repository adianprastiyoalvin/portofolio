import React, { forwardRef } from 'react';

export const Pill = forwardRef(function Pill(
  { children, className = '', ...props },
  ref
) {
  return (
    <span ref={ref} className={`pill-badge ${className}`.trim()} {...props}>
      {children}
    </span>
  );
});

export default Pill;
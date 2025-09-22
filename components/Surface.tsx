import React from 'react';

const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ');

export default function Surface({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl',
        'shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_8px_30px_rgba(0,0,0,0.35)]',
        'p-5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

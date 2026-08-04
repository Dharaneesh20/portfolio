import React from 'react';

interface StudioHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
  children?: React.ReactNode;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
  children,
}) => {
  const alignmentClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col ${alignmentClass} space-y-4 mb-10 max-w-4xl mx-auto px-4 ${className}`}>
      {eyebrow && (
        <div className="inline-flex items-center space-x-2 font-mono text-xs sm:text-sm tracking-[0.25em] uppercase font-medium text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20">
          <span>{eyebrow}</span>
        </div>
      )}

      <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.15]">
        {title}
      </h2>

      {subtitle && (
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl font-sans leading-relaxed">
          {subtitle}
        </p>
      )}

      {children && <div className="pt-2">{children}</div>}
    </div>
  );
};

export default StudioHeader;

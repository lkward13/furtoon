import React from 'react';

const SectionTitle = ({ 
  title, 
  subtitle, 
  eyebrow,
  centered = false,
  className = '',
  ...props 
}) => {
  const containerClasses = [
    'space-y-4',
    centered ? 'text-center' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} {...props}>
      {eyebrow && (
        <p className="text-primary-600 font-semibold text-sm uppercase tracking-wide">
          {eyebrow}
        </p>
      )}
      
      <h2 className="section-title">
        {title}
      </h2>
      
      {subtitle && (
        <p className="section-subtitle">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;

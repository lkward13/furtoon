import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false,
  onClick,
  type = 'button',
  as: Component = 'button',
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'btn-primary focus:ring-primary-500',
    secondary: 'btn-secondary focus:ring-primary-500',
    ghost: 'btn-ghost focus:ring-surface-500',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const disabledClasses = 'opacity-50 cursor-not-allowed hover:transform-none hover:shadow-none';
  
  const classes = [
    baseClasses,
    variants[variant],
    sizes[size],
    disabled || loading ? disabledClasses : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <Component
      type={Component === 'button' ? type : undefined}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <div className="loading-spinner mr-2" />
      )}
      {children}
    </Component>
  );
};

export default Button;

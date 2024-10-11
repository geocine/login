import React, { InputHTMLAttributes, ButtonHTMLAttributes } from 'react';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={`bg-card border-border shadow-lg rounded-[2px] ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={`p-6 space-y-1 ${className}`} {...props}>
    {children}
  </div>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => (
  <input
    className={`w-full p-2 bg-input border-input text-foreground placeholder-muted-foreground rounded-[2px] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-shadow ${className}`}
    {...props}
  />
);

export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
  <button
    className={`w-full p-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-[2px] ${className}`}
    {...props}
  >
    {children}
  </button>
);
import React from 'react';

interface FantasyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  variant?: 'primary' | 'icon';
}

export const FantasyButton: React.FC<FantasyButtonProps> = ({ 
  children, 
  active, 
  className = '', 
  variant = 'primary',
  ...props 
}) => {
  const baseStyles = "transition-all duration-200 border-2 shadow-lg active:translate-y-0.5 relative overflow-hidden group";
  
  const variants = {
    primary: `
      px-4 py-2 rounded-lg font-header font-bold tracking-wider
      ${active 
        ? 'bg-gold text-leather-dark border-leather-dark shadow-inner' 
        : 'bg-leather text-parchment border-gold hover:bg-leather-dark hover:border-parchment'
      }
    `,
    icon: `
      p-2 rounded-full flex items-center justify-center
      ${active
        ? 'bg-gold text-leather-dark border-leather-dark'
        : 'bg-leather-dark text-gold border-gold hover:bg-leather hover:text-parchment'
      }
    `
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {/* Shine effect */}
      <div className="absolute inset-0 bg-white/10 translate-y-full skew-y-12 group-hover:translate-y-0 transition-transform duration-500 ease-out" />
    </button>
  );
};
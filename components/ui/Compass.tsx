import React from 'react';
import { Compass as CompassIcon } from 'lucide-react';

export const Compass: React.FC = () => {
  return (
    <div className="absolute top-4 right-4 z-10 opacity-80 pointer-events-none hidden md:block">
       <div className="relative w-24 h-24 flex items-center justify-center bg-leather-dark/80 rounded-full border-4 border-gold shadow-xl">
          <CompassIcon size={64} className="text-parchment animate-pulse" />
          <div className="absolute top-1 text-gold font-header font-bold text-xs">N</div>
          <div className="absolute bottom-1 text-gold font-header font-bold text-xs">S</div>
          <div className="absolute left-1 text-gold font-header font-bold text-xs">W</div>
          <div className="absolute right-1 text-gold font-header font-bold text-xs">E</div>
       </div>
    </div>
  );
};
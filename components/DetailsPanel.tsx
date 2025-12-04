import React from 'react';
import { X, MapPin } from 'lucide-react';
import { MapMarkerData } from '../types';
import { FantasyButton } from './ui/FantasyButton';

interface DetailsPanelProps {
  marker: MapMarkerData | null;
  onClose: () => void;
}

export const DetailsPanel: React.FC<DetailsPanelProps> = ({ marker, onClose }) => {
  if (!marker) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 md:top-0 md:left-0 md:bottom-0 md:right-auto md:w-96 z-40 p-4 md:p-6 flex flex-col justify-end md:justify-center pointer-events-none">
      <div className="pointer-events-auto bg-parchment bg-paper-texture rounded-xl border-4 border-double border-leather-dark shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-slide-up md:animate-slide-right">
        
        {/* Header Image */}
        <div className="relative h-48 bg-leather-dark">
          <img 
            src={marker.imageUrl} 
            alt={marker.title} 
            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 p-1 bg-black/50 text-parchment rounded-full hover:bg-leather-dark transition-colors"
          >
            <X size={20} />
          </button>

          <div className="absolute bottom-4 left-4">
            <span className="inline-block px-2 py-0.5 bg-gold text-leather-dark text-xs font-bold uppercase tracking-widest rounded mb-1">
              {marker.type}
            </span>
            <h2 className="text-2xl font-fantasy text-parchment drop-shadow-md leading-none">
              {marker.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          <div className="flex items-start gap-3 mb-4 text-leather-dark/80">
            <MapPin className="shrink-0 mt-1" size={18} />
            <p className="text-sm font-header italic">
              Координаты: {Math.round(marker.coordinates.x)}, {Math.round(marker.coordinates.y)}
            </p>
          </div>
          
          <div className="prose prose-p:text-leather-dark prose-headings:font-fantasy prose-p:font-serif">
            <p className="first-letter:text-4xl first-letter:font-fantasy first-letter:mr-1 first-letter:float-left text-lg leading-relaxed">
              {marker.description}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-leather/20 flex gap-2">
            <FantasyButton className="w-full flex justify-center text-sm" onClick={() => alert("Путешествие началось!")}>
              Проложить Путь
            </FantasyButton>
          </div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { MapPin, Castle, Trees, Mountain, Skull } from 'lucide-react';
import { MapMarkerData } from '../../types';

interface MarkerProps {
  data: MapMarkerData;
  scale: number;
  isSelected: boolean;
  isEditMode: boolean;
  showImages: boolean;
  onClick: (e: React.MouseEvent) => void;
  onDragStart: (e: React.MouseEvent | React.TouchEvent, id: string) => void;
}

export const Marker: React.FC<MarkerProps> = ({
  data,
  scale,
  isSelected,
  isEditMode,
  showImages,
  onClick,
  onDragStart
}) => {
  // Adjust marker size based on zoom level to keep it readable but not huge
  const size = Math.max(32, 48 / Math.sqrt(scale)); 
  
  const getIcon = () => {
    switch (data.type) {
      case 'city': return <Castle size={size * 0.6} />;
      case 'forest': return <Trees size={size * 0.6} />;
      case 'dungeon': return <Skull size={size * 0.6} />;
      default: return <MapPin size={size * 0.6} />;
    }
  };

  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-colors duration-300 z-20`}
      style={{
        left: `${data.coordinates.x}%`,
        top: `${data.coordinates.y}%`,
        cursor: isEditMode ? 'move' : 'pointer',
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      onMouseDown={(e) => isEditMode && onDragStart(e, data.id)}
      onTouchStart={(e) => isEditMode && onDragStart(e, data.id)}
    >
      <div className={`
        relative flex flex-col items-center group
        ${isSelected ? 'z-50' : 'z-20'}
      `}>
        
        {/* The visual marker */}
        <div 
          style={{ width: size, height: size }}
          className={`
            flex items-center justify-center rounded-full border-2 shadow-2xl transition-all duration-300
            ${isSelected 
              ? 'bg-gold border-parchment scale-125 shadow-gold/50' 
              : 'bg-leather-dark border-gold hover:scale-110 hover:bg-leather'
            }
            ${showImages ? 'overflow-hidden bg-cover bg-center' : ''}
          `}
        >
           {showImages ? (
             <img 
              src={data.imageUrl} 
              alt={data.title} 
              className="w-full h-full object-cover pointer-events-none" 
             />
           ) : (
             <span className={`${isSelected ? 'text-leather-dark' : 'text-gold'}`}>
               {getIcon()}
             </span>
           )}
        </div>

        {/* Pin point triangle */}
        <div className={`
          w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent
          ${isSelected ? 'border-t-gold' : 'border-t-leather-dark'}
          transition-colors duration-300
        `} />

        {/* Label (only on hover or selected) */}
        <div className={`
          absolute top-full mt-1 px-2 py-1 bg-black/70 text-parchment text-xs rounded whitespace-nowrap font-fantasy tracking-wide border border-gold/30 backdrop-blur-sm
          opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
          ${isSelected ? 'opacity-100' : ''}
        `}>
          {data.title}
        </div>

      </div>
    </div>
  );
};
import React, { useRef, useState, useEffect } from 'react';
import { MapMarkerData, ViewState } from '../../types';
import { Marker } from './Marker';
import { MIN_SCALE, MAX_SCALE, MAP_IMAGE_URL } from '../../constants';

interface InteractiveMapProps {
  markers: MapMarkerData[];
  selectedId: string | null;
  isEditMode: boolean;
  showImages: boolean;
  onSelectMarker: (marker: MapMarkerData | null) => void;
  onUpdateMarkerPosition: (id: string, x: number, y: number) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  markers,
  selectedId,
  isEditMode,
  showImages,
  onSelectMarker,
  onUpdateMarkerPosition
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewState, setViewState] = useState<ViewState>({ scale: 1, x: 0, y: 0 });
  const [isDraggingMap, setIsDraggingMap] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [draggingMarkerId, setDraggingMarkerId] = useState<string | null>(null);

  // Center map on load
  useEffect(() => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      setViewState({
        scale: 1,
        x: (clientWidth / 2) - (clientWidth / 2), // Start centered (0 offset means center if we set origin correctly)
        y: 0 
      });
    }
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const scaleAdjustment = -e.deltaY * 0.001;
    const newScale = Math.min(Math.max(viewState.scale + scaleAdjustment, MIN_SCALE), MAX_SCALE);
    
    // Simple zoom to center logic (could be improved to zoom to mouse, but this is robust)
    setViewState(prev => ({
      ...prev,
      scale: newScale
    }));
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (draggingMarkerId) return; // Prioritize marker drag
    
    setIsDraggingMap(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    setDragStart({ x: clientX - viewState.x, y: clientY - viewState.y });
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    // 1. Handling Marker Drag (Edit Mode)
    if (draggingMarkerId && isEditMode && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate relative position within the container considering the current scale/pan
      // We need coordinates relative to the IMAGE, not the screen
      
      // Screen coord relative to container center (which is where transform origin roughly is effectively for simple pan)
      // Actually simpler: Screen -> Image Coords
      // Image is centered.
      
      // Let's rely on the container dimensions.
      // The image fills the container fully at scale 1.
      
      // X coordinate relative to the container-left
      const relX = clientX - rect.left; 
      const relY = clientY - rect.top;

      // Adjust for map transform (Translate & Scale)
      // The content div is centered by flex, so transform applies from center.
      // Math is hard for centering transform. Let's simplify CSS.
      // CSS: transform-origin: 0 0; translate(x,y) scale(s).
      
      const contentX = (relX - viewState.x) / viewState.scale;
      const contentY = (relY - viewState.y) / viewState.scale;

      const percentX = Math.min(Math.max((contentX / rect.width) * 100, 0), 100);
      const percentY = Math.min(Math.max((contentY / rect.height) * 100, 0), 100);

      onUpdateMarkerPosition(draggingMarkerId, percentX, percentY);
      return;
    }

    // 2. Handling Map Pan
    if (isDraggingMap) {
      setViewState(prev => ({
        ...prev,
        x: clientX - dragStart.x,
        y: clientY - dragStart.y
      }));
    }
  };

  const handlePointerUp = () => {
    setIsDraggingMap(false);
    setDraggingMarkerId(null);
  };

  const startMarkerDrag = (e: React.MouseEvent | React.TouchEvent, id: string) => {
    e.stopPropagation();
    setDraggingMarkerId(id);
  };

  // Zoom controls for UI buttons
  const zoomIn = () => setViewState(p => ({ ...p, scale: Math.min(p.scale * 1.2, MAX_SCALE) }));
  const zoomOut = () => setViewState(p => ({ ...p, scale: Math.max(p.scale / 1.2, MIN_SCALE) }));
  const resetView = () => setViewState({ scale: 1, x: 0, y: 0 });

  return (
    <div className="relative w-full h-full bg-leather-dark overflow-hidden select-none">
      
      {/* Zoom Controls Overlay */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-30">
        <button onClick={zoomIn} className="w-10 h-10 bg-parchment border-2 border-leather-dark rounded-full text-xl font-bold hover:bg-gold transition">+</button>
        <button onClick={zoomOut} className="w-10 h-10 bg-parchment border-2 border-leather-dark rounded-full text-xl font-bold hover:bg-gold transition">-</button>
        <button onClick={resetView} className="w-10 h-10 bg-leather text-parchment border-2 border-gold rounded-full text-xs font-bold hover:bg-leather-dark transition">●</button>
      </div>

      <div 
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none flex items-center justify-center"
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        onWheel={handleWheel}
      >
        <div 
          className="relative origin-top-left"
          style={{
            width: '100%',
            height: '100%',
            transform: `translate(${viewState.x}px, ${viewState.y}px) scale(${viewState.scale})`,
            transition: isDraggingMap || draggingMarkerId ? 'none' : 'transform 0.1s ease-out'
          }}
        >
          {/* Map Image Layer */}
          <img 
            src={MAP_IMAGE_URL} 
            alt="Fantasy Map" 
            className="w-full h-full object-contain pointer-events-none select-none drop-shadow-2xl"
          />

          {/* Markers Layer */}
          <div className="absolute inset-0 w-full h-full">
            {markers.map(marker => (
              <Marker
                key={marker.id}
                data={marker}
                scale={viewState.scale}
                isSelected={selectedId === marker.id}
                isEditMode={isEditMode}
                showImages={showImages}
                onClick={() => onSelectMarker(marker)}
                onDragStart={startMarkerDrag}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
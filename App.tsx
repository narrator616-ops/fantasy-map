import React, { useState } from 'react';
import { InteractiveMap } from './components/Map/InteractiveMap';
import { DetailsPanel } from './components/DetailsPanel';
import { Compass } from './components/ui/Compass';
import { FantasyButton } from './components/ui/FantasyButton';
import { INITIAL_MARKERS } from './constants';
import { MapMarkerData } from './types';
import { Settings, Image as ImageIcon, Move } from 'lucide-react';

export default function App() {
  const [markers, setMarkers] = useState<MapMarkerData[]>(INITIAL_MARKERS);
  const [selectedMarker, setSelectedMarker] = useState<MapMarkerData | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showImagesOnMap, setShowImagesOnMap] = useState(false);

  const handleUpdateMarkerPosition = (id: string, x: number, y: number) => {
    setMarkers(prev => prev.map(m => 
      m.id === id ? { ...m, coordinates: { x, y } } : m
    ));
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      // Save logic could go here
      console.log("Positions saved:", markers);
    }
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden font-serif">
      
      {/* Map Layer */}
      <InteractiveMap 
        markers={markers}
        selectedId={selectedMarker?.id || null}
        isEditMode={isEditMode}
        showImages={showImagesOnMap}
        onSelectMarker={setSelectedMarker}
        onUpdateMarkerPosition={handleUpdateMarkerPosition}
      />

      {/* UI Overlay: Top Bar */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start pointer-events-none z-30">
        <div className="pointer-events-auto flex flex-col gap-2">
           <h1 className="text-4xl md:text-6xl font-fantasy text-gold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-widest stroke-leather-dark">
             RPG Map
           </h1>
        </div>

        {/* Toolbar */}
        <div className="pointer-events-auto flex flex-col gap-3">
          <FantasyButton 
            variant="icon"
            active={isEditMode}
            onClick={toggleEditMode}
            title={isEditMode ? "Сохранить позиции" : "Переместить метки"}
          >
            <Move size={20} />
          </FantasyButton>
          
          <FantasyButton 
            variant="icon"
            active={showImagesOnMap}
            onClick={() => setShowImagesOnMap(!showImagesOnMap)}
            title="Показать фото на карте"
          >
            <ImageIcon size={20} />
          </FantasyButton>

          <FantasyButton 
            variant="icon"
            onClick={() => window.open('https://github.com/new', '_blank')}
            title="Настройки"
          >
            <Settings size={20} />
          </FantasyButton>
        </div>
      </div>

      {/* Compass Decoration */}
      <Compass />

      {/* Edit Mode Warning Banner */}
      {isEditMode && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-red-900/90 text-parchment px-4 py-2 rounded border border-red-500 shadow-xl z-30 pointer-events-none font-header text-sm">
          Режим редактирования: Перетащите метки
        </div>
      )}

      {/* Details Panel (Modal/Sidebar) */}
      <DetailsPanel 
        marker={selectedMarker} 
        onClose={() => setSelectedMarker(null)} 
      />

    </div>
  );
}
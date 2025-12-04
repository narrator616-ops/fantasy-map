export interface Coordinates {
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
}

export interface MapMarkerData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  coordinates: Coordinates;
  type: 'city' | 'dungeon' | 'forest' | 'landmark';
}

export interface ViewState {
  scale: number;
  x: number;
  y: number;
}
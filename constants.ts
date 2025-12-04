
import { MapMarkerData } from './types';

// ВАЖНО: Замените эти названия файлов на названия ваших картинок, которые вы загрузите в репозиторий.
// Файл карты должен называться map.jpg и лежать рядом с index.html
export const MAP_IMAGE_URL = "./map.jpg";

export const INITIAL_MARKERS: MapMarkerData[] = [
  {
    id: '1',
    title: "Цитадель Зари",
    description: "Древняя крепость, охраняющая восточные границы королевства. Легенды гласят, что первый луч солнца всегда падает на ее шпиль.",
    // Загрузите файл city.jpg в репозиторий
    imageUrl: "./city.jpg", 
    coordinates: { x: 50, y: 50 },
    type: 'city'
  },
  {
    id: '2',
    title: "Шепчущий Лес",
    description: "Мистический лес, где деревья меняют свои места по ночам. Путникам не рекомендуется сходить с тропы.",
    // Загрузите файл forest.jpg в репозиторий
    imageUrl: "./forest.jpg",
    coordinates: { x: 25, y: 40 },
    type: 'forest'
  },
  {
    id: '3',
    title: "Пещеры Дракона",
    description: "Глубокие подземелья, наполненные золотом и опасностью. Здесь спит последний великий ящер.",
    // Загрузите файл dungeon.jpg в репозиторий
    imageUrl: "./dungeon.jpg",
    coordinates: { x: 70, y: 70 },
    type: 'dungeon'
  }
];

export const MIN_SCALE = 0.5;
export const MAX_SCALE = 4;
export const ZOOM_SENSITIVITY = 0.001;

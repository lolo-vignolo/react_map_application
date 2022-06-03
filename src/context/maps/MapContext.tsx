/* eslint import/no-webpack-loader-syntax: off  */
//@ts-ignore
import { Map } from '!mapbox-gl';
import { createContext } from 'react';

export interface MapObject {
  isReady: boolean;
  map?: Map;
  duration?: number;
  distance?: number;
  setMaps: (map: Map) => void;
  getRouteBetweenPooints: (
    start: [number, number],
    end: [number, number]
  ) => Promise<void>;
}

export const MapContext = createContext<MapObject>({} as MapObject);

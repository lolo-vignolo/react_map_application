import { createContext } from 'react';
import { Feature } from '../../interfaces/placesInterfaces';

export interface PlcesContextProps {
  isLoading: boolean;
  userLocation?: [number, number];
  searchPlaceByTerm: (query: string) => Promise<Feature[]>;
  isLoadingPLaces: boolean;
  places: Feature[];
}

export const PlacesContext = createContext<PlcesContextProps>(
  {} as PlcesContextProps
);

import React, { useEffect, useReducer } from 'react';
import { searchApi } from '../../apis';
import { getUserLocation } from '../../helpers';
import { Feature, PlacesResponse } from '../../interfaces/placesInterfaces';
import { PlacesContext } from './PlacesContext';
import { placesReducer } from './placesReducer';

export interface PlcesState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPLaces: boolean;
  places: Feature[];
}

export interface Props {
  children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: PlcesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPLaces: false,
  places: [],
};

export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation().then((LngLat) => {
      dispatch({
        type: 'SET_USER_LOCATION',
        payload: LngLat,
      });
    });
  }, []);

  const searchPlaceByTerm = async (query: string): Promise<Feature[]> => {
    if (query.length === 0) dispatch({ type: 'CLEAR_PLACES', payload: [] });
    if (!state.userLocation) throw new Error('No hay ubicacion');

    dispatch({
      type: 'SET_IS_LOADING',
    });

    const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(','),
      },
    });

    dispatch({
      type: 'SET_PLACES',
      payload: resp.data.features,
    });
    console.log(resp.data.features);

    return resp.data.features;
  };

  return (
    <PlacesContext.Provider
      value={{
        ...state,
        //methods
        searchPlaceByTerm,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};

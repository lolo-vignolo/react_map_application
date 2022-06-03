/* eslint import/no-webpack-loader-syntax: off  */
//@ts-ignore
import { Map, Marker } from '!mapbox-gl';
import { MapState } from './MapProvider';

type MapActions =
  | {
      type: 'SET_MAP';
      payload: Map;
    }
  | {
      type: 'SET_MARKERS';
      payload: Marker[];
    }
  | {
      type: 'SET_DURATION';
      payload: number;
    }
  | {
      type: 'SET_DISTANCE';
      payload: number;
    };

export const mapReducer = (state: MapState, action: MapActions): MapState => {
  switch (action.type) {
    case 'SET_MAP':
      return {
        ...state,
        isReady: true,
        map: action.payload,
      };
    case 'SET_MARKERS':
      return {
        ...state,
        markers: action.payload,
      };
    case 'SET_DURATION':
      return {
        ...state,
        duration: action.payload,
      };
    case 'SET_DISTANCE':
      return {
        ...state,
        distance: action.payload,
      };

    default:
      return state;
  }
};

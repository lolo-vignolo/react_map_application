import { Feature } from '../../interfaces/placesInterfaces';
import { PlcesState } from './PlacesProvider';

// const INITIAL_STATE: PlcesState = {
//   isLoading: true,
//   userLocation: undefined,
// };

type PlacesAction =
  | {
      type: 'SET_USER_LOCATION';
      payload: [number, number];
    }
  | {
      type: 'SET_PLACES';
      payload: Feature[];
    }
  | {
      type: 'SET_IS_LOADING';
    }
  | {
      type: 'CLEAR_PLACES';
      payload: [];
    };

export const placesReducer = (
  state: PlcesState,
  action: PlacesAction
): PlcesState => {
  switch (action.type) {
    case 'SET_USER_LOCATION':
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload,
      };
    case 'SET_IS_LOADING':
      return {
        ...state,
        isLoadingPLaces: true,
        places: [],
      };
    case 'SET_PLACES':
      return {
        ...state,
        isLoadingPLaces: false,
        places: action.payload,
      };
    case 'CLEAR_PLACES':
      return {
        ...state,
        isLoadingPLaces: false,
        places: action.payload,
      };

    default:
      return state;
  }
};

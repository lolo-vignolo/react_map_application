/* eslint import/no-webpack-loader-syntax: off  */
//@ts-ignore
import mapboxgl, { AnySourceData, Map, Marker, Popup } from '!mapbox-gl';
import { useContext, useEffect, useReducer } from 'react';
import { directionsApi } from '../../apis';
import { Directions } from '../../interfaces/directions';
import { PlacesContext } from '../places/PlacesContext';
import { MapContext } from './MapContext';
import { mapReducer } from './mapReducer';

export interface MapState {
  isReady: boolean;
  map?: Map;
  markers?: Marker[];
  duration?: number;
  distance?: number;
}

const MAP_INITIAL_STATE: MapState = {
  isReady: false,
  map: undefined,
};

export interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, MAP_INITIAL_STATE);

  const { places } = useContext(PlacesContext);

  useEffect(() => {
    state.markers?.forEach((marker) => marker.remove());

    const newMarkers: Marker[] = [];
    places.forEach((place) => {
      const [lng, lat] = place.center; //center es una propiedad del objeto que recibo de la api, la cual tiene la lng y lat.
      const popup = new Popup().setHTML(
        `<h6>${place.text}</h6> <p>${place.place_name}</p>`
      );
      const marker = new Marker({
        color: 'red',
      })
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(state.map!);

      newMarkers.push(marker);

      dispatch({
        type: 'SET_MARKERS',
        payload: newMarkers,
      });
    });
  }, [places]);

  const setMaps = (map: Map) => {
    const myLocationPopUp = new Popup().setHTML(
      `<h3>My Location</h3> <p>You are here</p>`
    );
    new Marker()
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopUp)
      .addTo(map);

    dispatch({
      type: 'SET_MAP',
      payload: map,
    });
  };

  const getRouteBetweenPooints = async (
    start: [number, number],
    end: [number, number]
  ) => {
    const resp = await directionsApi.get<Directions>(
      `/${start.join(',')};${end.join(',')}`
    );

    const { coordinates } = resp.data.routes[0].geometry;

    let duration = 0;
    let distance = 0;
    resp.data.routes.forEach((route) => {
      duration += route.duration;
      duration = Math.floor(duration / 60);
      distance += route.distance;
    });
    dispatch({
      type: 'SET_DURATION',
      payload: duration,
    });
    dispatch({
      type: 'SET_DISTANCE',
      payload: distance,
    });

    //bounds

    const bounds = new mapboxgl.LngLatBounds();

    coordinates.forEach((coordinate) => {
      const newCoordinates: [number, number] = [coordinate[0], coordinate[1]];
      bounds.extend(newCoordinates);
    });

    state.map?.fitBounds(bounds, {
      padding: 150,
    });

    //polyline
    const soursData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates,
            },
          },
        ],
      },
    };

    if (state.map?.getLayer('RouateString')) {
      state.map.removeLayer('RouateString');
      state.map.removeSource('RouateString');
    }

    state.map?.addSource('RouateString', soursData);

    state.map?.addLayer({
      id: 'RouateString',
      type: 'line',
      source: 'RouateString',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#888',
        'line-width': 8,
      },
    });
  };

  return (
    <MapContext.Provider value={{ ...state, setMaps, getRouteBetweenPooints }}>
      {children}
    </MapContext.Provider>
  );
};

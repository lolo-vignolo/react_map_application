/* eslint import/no-webpack-loader-syntax: off  */
import { useContext, useLayoutEffect, useRef } from 'react';

//@ts-ignore
import mapboxgl from '!mapbox-gl';

import { PlacesContext } from '../context';
import { Loading } from './Loading';
import { MapContext } from '../context/maps/MapContext';

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMaps } = useContext(MapContext);
  const mapDiv = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (isLoading) {
      return;
    }

    const map = new mapboxgl.Map({
      container: mapDiv.current!, //container ID
      style: 'mapbox://styles/mapbox/streets-v11', //STYLE url
      center: userLocation, // starting position [lng, lat]
      zoom: 13, // starting zoom
    });

    setMaps(map);
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div
      ref={mapDiv}
      style={{
        backgroundColor: ' #fff',
        height: '100vh',
        left: 0,
        position: 'fixed',
        top: 0,
        width: '100vw',
      }}
    ></div>
  );
};

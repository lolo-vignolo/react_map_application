import { useContext } from 'react';
import { PlacesContext } from '../context';
import { MapContext } from '../context/maps/MapContext';

export const BtnMyLocation = () => {
  const { isReady, map } = useContext(MapContext);
  const { isLoading, userLocation } = useContext(PlacesContext);
  const handleClick = () => {
    if (isReady && !isLoading) {
      map!.flyTo({ zoom: 14, center: userLocation });
    } else {
      throw new Error('Map is not ready');
    }
  };
  return (
    <button className="btn btn-primary btn-myLocation" onClick={handleClick}>
      My Location
    </button>
  );
};

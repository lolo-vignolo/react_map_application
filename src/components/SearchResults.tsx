import { useContext, useState } from 'react';
import { PlacesContext } from '../context';
import { MapContext } from '../context/maps/MapContext';
import { Feature } from '../interfaces/placesInterfaces';
import { LoadingPlaces } from './LoadingPlaces';

export const SearchResults = () => {
  const [active, setactive] = useState('');
  const { places, isLoadingPLaces, userLocation } = useContext(PlacesContext);
  const { map, getRouteBetweenPooints, distance, duration } =
    useContext(MapContext);

  let time = '';

  if (duration) {
    if (Number(duration) > 60) {
      time = Math.floor(duration / 60).toString() + ' Hs';
    } else {
      time = duration.toString() + ' min';
    }
  }

  let distanceString = '';

  if (distance) {
    if (Number(distance) > 1000) {
      distanceString = Math.floor(distance / 1000).toString() + ' km';
    } else {
      distanceString = Math.floor(distance).toString() + ' mts';
    }
  }

  const onPlceCliched = (place: Feature) => {
    setactive(place.id);
    map!.flyTo({
      zoom: 14,
      center: [place.center[0], place.center[1]],
    });
  };

  if (isLoadingPLaces) {
    return <LoadingPlaces />;
  }

  if (places.length === 0) {
    return <></>;
  }

  const getRoute = (place: Feature) => {
    if (!userLocation) return;
    getRouteBetweenPooints(userLocation, [place.center[0], place.center[1]]);
  };

  return (
    <>
      <ul className="list-group mt-3">
        {places.map((place) => (
          <li
            key={place.id}
            className={
              `list-group-item  list-group-item-action pointer` +
              (place.id === active ? ' activeItem' : '')
            }
            onClick={() => onPlceCliched(place)}
          >
            <h6> {place.text}</h6>
            <p className="text-muted" style={{ fontSize: '12px' }}>
              {place.place_name}
            </p>

            <button
              onClick={() => getRoute(place)}
              className={
                `btn btn-outline-primary btn-sm ` +
                (place.id === active ? 'btn-outline-dark ' : '')
              }
            >
              Search Address
            </button>
          </li>
        ))}
      </ul>
      <h4 className="distance">
        Distance: {distanceString ? distanceString : ''}
      </h4>
      <h5 className="time">Time: {time ? time : ''} </h5>
    </>
  );
};

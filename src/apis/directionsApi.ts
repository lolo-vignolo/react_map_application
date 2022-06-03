import axios from 'axios';

//axios create se usa para crear el url

const directionsApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    steps: false,
    alternatives: false,
    geometries: 'geojson',
    overview: 'simplified',
    access_token: process.env.MAPBOX_API,
  },
});

export default directionsApi;

import axios from 'axios';

//axios create se usa para crear el url

const searchApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: 5,
    language: 'es',
    access_token: process.env.MAPBOX_API,
  },
});

export default searchApi;

/* eslint import/no-webpack-loader-syntax: off  */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapsApp } from './MapsApp';
//@ts-ignore
import mapboxgl from '!mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken =
  'pk.eyJ1IjoibG9sby12aWdub2xvIiwiYSI6ImNsMjN4YmlnZTA5d2MzY214aHJqc3Vid2QifQ.KZvwLkyVzm0Po6vaYzngPw';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);

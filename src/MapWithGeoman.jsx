import React, { useEffect, useRef } from 'react';
import ml from 'maplibre-gl';
import { Geoman } from '@geoman-io/maplibre-geoman-free';

import 'maplibre-gl/dist/maplibre-gl.css';
import '@geoman-io/maplibre-geoman-free/dist/maplibre-geoman.css';

// const mapLibreStyle = {
//   version: 8,
//   glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
//   sources: {
//     'osm-tiles': {
//       type: 'raster',
//       tiles: [
//         'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
//       ],
//       tileSize: 256,
//       attribution: '© OpenStreetMap contributors',
//     },
//   },
//   layers: [
//     {
//       id: 'osm-tiles-layer',
//       type: 'raster',
//       source: 'osm-tiles',
//       minzoom: 0,
//       maxzoom: 19,
//     },
//   ],
// };

const mapLibreStyle = {
  version: 8,
  sources: {
    'raster-tiles': {
      type: 'raster',
      tiles: [
        'https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'
      ],
      tileSize: 256,
    },
  },
  layers: [
    {
      id: 'raster-layer',
      type: 'raster',
      source: 'raster-tiles',
      minzoom: 0,
      maxzoom: 19,
    },
  ],
};

const gmOptions = {
  // geoman options here
};

const MapWithGeoman = ({ useVector = true }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const style = useVector
      ? 'https://demotiles.maplibre.org/style.json' // vector style
      : mapLibreStyle

    const map = new ml.Map({
      container: mapContainerRef.current,
      style,
      center: [-74.5, 40],
      zoom: 9,
    });

    const geoman = new Geoman(map, gmOptions);

    map.on('load', () => {
      console.log('Geoman fully loaded');

      // Here you can add your geojson shapes for example
      const shapeGeoJson = {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [0, 51] },
        properties: {},
      };
      // add a geojson shape to the map
      geoman.features.importGeoJsonFeature(shapeGeoJson);


      const shapeGeoJson2 = {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [3, 52] },
        properties: {},
      };
      // geoman instance is also available on the map object
      map.gm?.features.importGeoJsonFeature(shapeGeoJson2);
    });

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, [useVector]);

  return (
    <div>
      <div ref={mapContainerRef} style={{ height: '600px', width: '100%' }} />
    </div>
  );
};

export default MapWithGeoman;
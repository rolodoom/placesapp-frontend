// Mapbox and React
// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/

import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

import './Map.css';

const Map = props => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  mapboxgl.accessToken = import.meta.env.VITE_MAP_API_KEY;
  const { lng, lat } = props.location;
  const zoom = 12;
  const mapStyle = 'mapbox://styles/rolodoom/cle5tsdez001801pft83htnau';

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map(
      {
        container: mapContainer.current,
        style: mapStyle,
        center: [lng, lat],
        zoom: zoom,
      },
      [lng, lat]
    );

    // Add Marker
    // https://docs.mapbox.com/help/tutorials/custom-markers-gl-js/
    const marker = document.createElement('div');
    marker.className = 'map-marker';
    marker.style.backgroundImage = `url(/img/pin.png)`;
    new mapboxgl.Marker(marker).setLngLat([lng, lat]).addTo(map.current);
  });

  return (
    <div
      ref={mapContainer}
      className={`map ${props.className}`}
      style={props.style}
    />
  );
};

export default Map;

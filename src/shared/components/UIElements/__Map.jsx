// import mapboxgl from 'mapbox-gl';
import { Map as ReactMapGL, Marker, NavigationControl } from 'react-map-gl';

import './Map.scss';

const Map = props => {
  const accessToken = import.meta.env.VITE_MAP_API_KEY;
  const lng = props.location.lng;
  const lat = props.location.lat;
  const mapStyle = 'mapbox://styles/rolodoom/cle5tsdez001801pft83htnau';
  // const mapStyle = 'mapbox://styles/mapbox/streets-v12';
  const initialViewState = {
    longitude: lng,
    latitude: lat,
    zoom: 15,
    scrollZoom: false,
  };

  return (
    <ReactMapGL
      mapboxAccessToken={accessToken}
      mapStyle={mapStyle}
      initialViewState={initialViewState}
    >
      <Marker longitude={lng} latitude={lat} anchor="bottom">
        <div
          className="map-marker"
          style={{ backgroundImage: `url(/img/pin.png)` }}
        ></div>
      </Marker>
      <NavigationControl />
    </ReactMapGL>
  );
};

export default Map;

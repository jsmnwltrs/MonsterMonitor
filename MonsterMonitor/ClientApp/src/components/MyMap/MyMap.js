import React from 'react';
import {
  Map as
  LeafletMap,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import './MyMap.scss';


class MyMap extends React.Component {
  render() {
    return (
      <div className = "map-container">
        <h1>Map Page</h1>
        <LeafletMap
        center={[50, 10]}
        zoom={6}
        maxZoom={10}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer
          url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png'
        />
         <Marker position={[50, 10]}>
          <Popup>
            Popup for any custom information.
          </Popup>
        </Marker>
      </LeafletMap>
      </div>
    );
  }
}

export default MyMap;

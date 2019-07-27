import React from 'react';
import {
  Map,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import './MyMap.scss';
import { ReactLeafletSearch } from 'react-leaflet-search';

class MyMap extends React.Component {
  render() {
    const myPopup = (SearchInfo) => {
      return (
        <Popup>
          <div>
            <p>I am a custom popUp</p>
            <p>latitude and longitude from search component: lat:{SearchInfo.latLng[0]} lng:{SearchInfo.latLng[1]}</p>
            <p>Info from search component: {SearchInfo.info}</p>
          </div>
        </Popup>
      );
    };

    return (
      <div className = "map">
        <Map
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
        <ReactLeafletSearch position="topleft" popUp={ myPopup}/>
        <TileLayer
          url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png'
        />
         <Marker position={[50, 10]}>
          <Popup>
            Popup for any custom information.
          </Popup>
        </Marker>
      </Map>
      </div>
    );
  }
}

export default MyMap;

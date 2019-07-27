import React from 'react';
import {
  Map,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import sightingRequests from '../../helpers/data/sightingRequests';
import './MyMap.scss';

class MyMap extends React.Component {
 state = {
   sightings: [],
 }

 componentDidMount() {
   this.setStates();
 }

 setStates = () => {
   sightingRequests.getSightingsByIsActive(true)
     .then((sightings) => {
       this.setState({ sightings });
     })
     .catch((error) => {
       console.error(error);
     });
 }

 makeMarkers = () => {
   const { sightings } = this.state;
   const sightingMarkers = sightings.map(sighting => (
    <Marker
    key={sighting.id}
    position={[sighting.latitude, sighting.longitude]}
    >
    <Popup className='pop-up'>
    Title: {sighting.title}
    Location: {sighting.location}
    Threat Level: {sighting.threatLevel}
    </Popup>
    </Marker>

   ));
   return sightingMarkers;
 }

 render() {
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
        ref='map'
        >
          <TileLayer
            noWrap={true}
            url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png'
          />
          {this.makeMarkers()}
        </Map>
      </div>
   );
 }
}

export default MyMap;

import React from 'react';
import {
  Map,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import { Button } from 'reactstrap';
import SearchField from 'react-search-field';
import sightingRequests from '../../helpers/data/sightingRequests';
import userRequests from '../../helpers/data/userRequests';
import mapRequests from '../../helpers/data/mapRequests';
import './MyMap.scss';

class MyMap extends React.Component {
 state = {
   sightings: [],
   user: [],
   lat: 0,
   long: 0,
 }

 componentDidMount() {
   this.setSightings();
   this.setUser();
 }

 setSightings = () => {
   sightingRequests.getSightingsByIsActive(true)
     .then((sightings) => {
       this.setState({ sightings });
     })
     .catch((error) => {
       console.error(error);
     });
 }

 setUser = () => {
   userRequests.getUserByEmail()
     .then((user) => {
       this.setState({ user });
       this.getUserCoordinates();
     })
     .catch((error) => {
       console.error(error);
     });
 }

 getUserCoordinates = () => {
   const { user } = this.state;
   mapRequests.getCoordinates(user.location).then((coordinates) => {
     this.setState({ lat: coordinates.latitude, long: coordinates.longitude });
     this.refs.map.leafletElement.panTo([coordinates.latitude, coordinates.longitude]);
   }).catch((error) => {
     console.error(error);
   });
 }

 searchChange = (value, e) => {
   e.preventDefault();
   if (value === '') {
     console.log('none');
   } else {
     mapRequests.getCoordinates(value).then((coordinates) => {
       this.setState({ lat: coordinates.latitude, long: coordinates.longitude });
       this.refs.map.leafletElement.panTo([coordinates.latitude, coordinates.longitude]);
     }).catch((error) => {
       console.error(error);
     });
   }
 }

 makeUserMarker = () => {
   const { user, lat, long } = this.state;
   return <Marker
   key={user.id}
   position={[lat, long]}
   >
   <Popup className='pop-up'>
   <img className='avatar' src={user.imageUrl} alt='avatar'></img>
   Username: {user.username}
   Location: {user.location}
   </Popup>
   </Marker>;
 }

 makeSightingMarkers = () => {
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
   const { lat, long } = this.state;

   const map = (
    <Map
        center={[lat, long]}
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
          {this.makeSightingMarkers()}
          {this.makeUserMarker()}
        </Map>
   );

   return (
     <div>
       <Button onClick={this.getUserCoordinates}>
         Near Me
       </Button>
       <SearchField
            placeholder="Search locations..."
            onChange={this.searchChange}
          />
      <div className = "map">
        {map}
      </div>
    </div>
   );
 }
}

export default MyMap;

import React from 'react';
import {
  Map,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
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
   userLat: 0,
   userLong: 0,
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
     this.setState({
       lat: coordinates.latitude,
       long: coordinates.longitude,
       userLong: coordinates.longitude,
       userLat: coordinates.latitude,
     });
     this.refs.map.leafletElement.panTo([coordinates.latitude, coordinates.longitude]);
   }).catch((error) => {
     console.error(error);
   });
 }

 searchLocation = (value, e) => {
   if (value !== '') {
     mapRequests.getCoordinates(value).then((coordinates) => {
       this.setState({ lat: coordinates.latitude, long: coordinates.longitude });
       this.refs.map.leafletElement.panTo([coordinates.latitude, coordinates.longitude]);
     }).catch((error) => {
       console.error(error);
     });
   }
 }

 makeUserMarker = () => {
   const { user, userLat, userLong } = this.state;
   const Profile = '/profile';
   return <Marker
   key={user.id}
   position={[userLat, userLong]}
   >
   <Popup className='pop-up'>
   <Row className='d-flex justify-content-center'>
   <img className='marker-avatar' src={user.imageUrl} alt='avatar'></img>
   </Row>
   <Row className='d-flex justify-content-center'>{user.username}</Row>
   <Row className='d-flex justify-content-center'>{user.location}</Row>
   <Row className='d-flex justify-content-center'>
   <Link to={Profile}>
    Profile Details
    </Link>
   </Row>
   </Popup>
   </Marker>;
 }

 makeSightingMarkers = () => {
   const { sightings } = this.state;
   const sightingMarkers = sightings.map((sighting) => {
     const SightingDetails = `/sightingdetails/${sighting.id}`;
     return (
     <Marker
    key={sighting.id}
    position={[sighting.latitude, sighting.longitude]}
    >
    <Popup className='pop-up'>
    <Row className='d-flex justify-content-center'><i className="fas fa-pastafarianism fa-5x"></i></Row>
    <Row className='d-flex justify-content-center'><h6><strong>{sighting.title}</strong></h6></Row>
    <Row className='d-flex justify-content-center'>{sighting.location}</Row>
    <Row className='d-flex justify-content-center text-danger'>{sighting.threatLevel}</Row>
    <Row className='d-flex justify-content-center'>
    <Link to={SightingDetails}>
    Sighting Details
    </Link>
    </Row>
    </Popup>
     </Marker>
     );
   });
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
      <Row>
      <Col className="col-9">
        {map}
      </Col>
      <Col className='col-3 mt-4'>
      <Row className='m-3'>
        <SearchField
          classNames='search-field'
          placeholder="Search locations..."
          onSearchClick={this.searchLocation}
          onEnter={this.searchLocation}
        />
      </Row>
        <Row className='m-3'>
          <Button className='nearme-button' onClick={this.getUserCoordinates}>
            Near Me
          </Button>
        </Row>
      </Col>
      </Row>
    </div>
   );
 }
}

export default MyMap;

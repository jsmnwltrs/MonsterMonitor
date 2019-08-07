import React from 'react';
import {
  Map,
  TileLayer,
  Marker,
} from 'react-leaflet';
import { Row, Col } from 'reactstrap';
import './SightingDetails.scss';
import moment from 'moment';
import sightingRequests from '../../helpers/data/sightingRequests';
import userRequests from '../../helpers/data/userRequests';
import UserLike from '../UserLike/UserLike';
import Comments from '../Comments/Comments';

const defaultSighting = {
  id: 0,
  userId: 0,
  title: '',
  location: '',
  description: '',
  imageUrl: '',
  videoUrl: '',
  dateCreated: '',
  threatLevel: '',
  isActive: false,
  isAnon: false,
  latitude: 0,
  longitude: 0,
};

const defaultUser = {
  id: 0,
  username: '',
  email: '',
  imageUrl: '',
  location: '',
};

class SightingDetails extends React.Component {
  state = {
    sighting: defaultSighting,
    currentUser: defaultUser,
    user: defaultUser,
  }

  componentDidMount() {
    this.setSighting();
    this.setCurrentUser();
  }

  setSighting = () => {
    const sightingId = this.props.match.params.id;
    sightingRequests.getSightingById(sightingId)
      .then((result) => {
        const sighting = result.data;
        this.setState({ sighting });
        this.setUser();
      }).catch((error) => {
        console.error(error);
      });
  }

  setUser = () => {
    const { sighting } = this.state;
    userRequests.getUserById(sighting.userId)
      .then((user) => {
        this.setState({ user });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setCurrentUser = () => {
    userRequests.getUserByEmail()
      .then((currentUser) => {
        this.setState({ currentUser });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  makeMarker = () => {
    const { sighting } = this.state;
    const sightingMarker = <Marker
     key={sighting.id}
     position={[sighting.latitude, sighting.longitude]}
     >
    </Marker>;
    return sightingMarker;
  }

  render() {
    const { sighting, currentUser, user } = this.state;

    const map = (
      <Map
          id='map-preview'
          center={[sighting.latitude, sighting.longitude]}
          zoom={6}
          maxZoom={10}
          attributionControl={false}
          zoomControl={false}
          doubleClickZoom={false}
          scrollWheelZoom={false}
          dragging={false}
          animate={false}
          easeLinearity={0.35}
          >
            <TileLayer
              noWrap={true}
              url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png'
            />
            {this.makeMarker()}
          </Map>
    );

    return (
      <div>
        <h1>{sighting.title}</h1>
        <p>Posted by {(sighting.isAnon) ? 'Anonymous' : user.username}</p>
        <p>{moment(sighting.dateCreated).format('MMMM Do YYYY, h:mma')}</p>
        <p>{sighting.threatLevel}</p>
        <Row>
          <Col>
            <img src={sighting.imageUrl} alt='sighting pic'/>
          </Col>
          <Col>
            {map}
          </Col>
        </Row>
        <p>{sighting.description}</p>
        <UserLike user={currentUser} sighting={sighting}/>
        <Comments sighting={sighting} history={this.props.history}/>
      </div>
    );
  }
}

export default SightingDetails;

import React from 'react';
import {
  Map,
  TileLayer,
  Marker,
} from 'react-leaflet';
import {
  Row,
  Col,
  Card,
  CardText,
  CardSubtitle,
  CardTitle,
} from 'reactstrap';
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
    const defaultImage = 'http://cdn.onlinewebfonts.com/svg/img_556571.png';

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
      <div className='d-flex justify-content-center m-5'>
        <Card className='sighting-details-container'>
          <CardTitle className='sighting-title mt-2 mb-2 mr-5 ml-5'>{sighting.title}</CardTitle>
          <CardSubtitle
            className='mt-1 mb-4 mr-5 ml-5 sighting-username'>
            <div className='d-flex flex-wrap'>
              <img className='sighting-avatar'
                src={(sighting.isAnon) ? defaultImage : user.imageUrl}
                alt='avatar'
              />
            <div className='mt-5 ml-2'>
              {(sighting.isAnon) ? 'Anonymous' : user.username}
            </div>
            </div>
          </CardSubtitle>
          <CardText className='mt-1 mr-5 ml-5'>
            <p className='sighting-date'>{moment(sighting.dateCreated).format('MMMM Do YYYY')}</p>
          </CardText>
          <Row className='mt-1 mb-1 mr-5 ml-5'>
            <Col>
              <img className='sighting-image' src={sighting.imageUrl} alt='sighting pic'/>
            </Col>
            <Col>
              {map}
            </Col>
          </Row>
          <CardText className='mt-1 mb-1 mr-5 ml-5'>
            <div className='d-flex flex-wrap'>
              <strong className='mr-2'>Threat Level:</strong>
              <p className='sighting-threat'>{sighting.threatLevel}</p>
            </div>
            <div className='sighting-desc'>
              <p className='m-3'>{sighting.description}</p>
            </div>
          </CardText>
          <UserLike user={currentUser} sighting={sighting}/>
        </Card>
        </div>
        <Comments sighting={sighting} history={this.props.history}/>
      </div>
    );
  }
}

export default SightingDetails;

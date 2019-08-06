import React from 'react';
import './Profile.scss';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
} from 'reactstrap';
import userRequests from '../../helpers/data/userRequests';
import ProfileModal from '../ProfileModal/ProfileModal';
import SightingManagement from '../SightingManagement/SightingManagement';
import UserComments from '../UserComments/UserComments';

const defaultUser = {
  id: 0,
  username: '',
  email: '',
  imageUrl: '',
  location: '',
};

class Profile extends React.Component {
  state = {
    user: defaultUser,
  }

  componentDidMount() {
    this.setUserState();
  }

  setUserState = () => {
    userRequests.getUserByEmail()
      .then((user) => {
        this.setState({ user });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onSubmitUser = (userObject) => {
    userRequests.updateUser(userObject)
      .then(() => {
        this.setUserState();
      })
      .catch((error) => {
        console.error(error);
      });
  }


  render() {
    const { user } = this.state;

    if (user.id === 0) {
      return (
        <div></div>
      );
    }

    return (
      <div>
        <Row className='m-5'>
          <Col className='col-1'></Col>
          <Col className='profile-container col-2'>
            <Card className='d-flex justify-content-center'>
              <Row className='d-flex justify-content-center mt-3'>
              <CardImg top width="100%" className='profile-avatar' src={user.imageUrl} alt='profile-avatar' />
              </Row>
              <CardBody>
                <CardSubtitle className='d-flex justify-content-center'>{user.username}</CardSubtitle>
                <CardText className='d-flex justify-content-center mt-1'>{user.location}</CardText>
                <ProfileModal user={user} onSubmit={this.onSubmitUser}/>
              </CardBody>
            </Card>
          </Col>
          <Col className='col-1'></Col>
          <Col className='comments-container col-7'>
          <UserComments />
          </Col>
          <Col className='col-1'></Col>
        </Row>
        <SightingManagement userId={user.id} history={this.props.history}/>
      </div>
    );
  }
}

export default Profile;

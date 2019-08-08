import React from 'react';
import './ProfileModal.scss';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import userShape from '../../helpers/props/userShape';

const defaultUser = {
  id: 0,
  username: '',
  email: '',
  imageUrl: '',
  location: '',
};

class ProfileModal extends React.Component {
  static propTypes = {
    user: userShape,
    onSubmit: PropTypes.func,
  }

  state = {
    newUser: defaultUser,
    modal: false,
  }

  toggle = () => {
    const tempUser = {};
    tempUser.email = this.props.user.email;
    tempUser.username = this.props.user.username;
    tempUser.imageUrl = this.props.user.imageUrl;
    tempUser.location = this.props.user.location;
    tempUser.id = this.props.user.id;
    this.setState(prevState => ({
      modal: !prevState.modal,
      newUser: tempUser,
    }));
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempUser = { ...this.state.newUser };
    tempUser[name] = e.target.value;
    this.setState({ newUser: tempUser });
  }

  usernameChange = e => this.formFieldStringState('username', e);

  imageUrlChange = e => this.formFieldStringState('imageUrl', e);

  locationChange = e => this.formFieldStringState('location', e);

  formSubmit = (e) => {
    const { onSubmit } = this.props;
    const myUser = { ...this.state.newUser };
    e.preventDefault();
    onSubmit(myUser);
    this.setState({ newUser: defaultUser });
    this.toggle();
  }

  render() {
    const { newUser, modal } = this.state;

    return (
        <div>
          <div className='d-flex justify-content-center'>
          <Button className='edit-profile-btn' onClick={this.toggle}>Edit Profile</Button>
          </div>
          <Modal isOpen={modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Edit Profile</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.formSubmit}>
                <FormGroup>
                  <Label for="exampleUsername">Username</Label>
                  <Input
                    type="username"
                    name="username"
                    id="exampleUsername"
                    placeholder="your username"
                    value={newUser.username}
                    onChange={this.usernameChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleImageUrl">Image URL</Label>
                  <Input
                    type="imageUrl"
                    name="imageUrl"
                    id="exampleImageUrl"
                    placeholder="your profile image url"
                    value={newUser.imageUrl}
                    onChange={this.imageUrlChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleLocation">Location</Label>
                  <Input
                    type="location"
                    name="location"
                    id="exampleLocation"
                    placeholder="your location"
                    value={newUser.location}
                    onChange={this.locationChange}
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.formSubmit} color="secondary">Save</Button>
              <Button onClick={this.toggle} color="danger">Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
    );
  }
}

export default ProfileModal;

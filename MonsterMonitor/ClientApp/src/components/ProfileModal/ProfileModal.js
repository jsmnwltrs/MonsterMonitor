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
import userRequests from '../../helpers/data/userRequests';

const defaultUser = {
  id: 0,
  username: '',
  email: '',
  imageUrl: '',
  location: '',
};

class ProfileModal extends React.Component {

  state = {
    user: defaultUser,
    modal: false,
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

  showModal = () => {
    this.setState({ modal: true });
  }

  hideModal = () => {
    this.setState({ modal: false });
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempUser = { ...this.props.user };
    tempUser[name] = e.target.value;
    this.setState({ user: tempUser });
  }

  render() {
    const { user } = this.props;

      return (
        <div>
          <Modal isOpen={this.state.modal}>
            <ModalHeader>Edit Profile</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="exampleUsername">Username</Label>
                  <Input
                    type="username"
                    name="username"
                    id="exampleUsername"
                    placeholder="your username"
                    value={user.username}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleImageUrl">Image URL</Label>
                  <Input
                    type="imageUrl"
                    name="imageUrl"
                    id="exampleImageUrl"
                    placeholder="your profile image url"
                    value={user.imageUrl}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleLocation">Location</Label>
                  <Input
                    type="location"
                    name="location"
                    id="exampleLocation"
                    placeholder="your location"
                    value={user.location}
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary">Save</Button>
              <Button color="secondary" onClick={this.hideModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
}

export default ProfileModal;

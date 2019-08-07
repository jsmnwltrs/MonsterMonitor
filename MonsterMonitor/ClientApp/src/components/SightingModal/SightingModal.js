import React from 'react';
import './SightingModal.scss';
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
  CustomInput,
  DropdownItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import PropTypes from 'prop-types';
import sightingShape from '../../helpers/props/sightingShape';
import mapRequests from '../../helpers/data/mapRequests';
import threatLevelsArray from '../../helpers/data/threatLevels';

const defaultSighting = {
  userId: 0,
  title: '',
  location: '',
  description: '',
  imageUrl: '',
  videoUrl: '',
  dateCreated: '',
  threatLevel: '',
  isActive: true,
  isAnon: false,
  latitude: 0,
  longitude: 0,
};

class SightingModal extends React.Component {
  static propTypes = {
    sighting: sightingShape,
    userId: PropTypes.number,
    onSubmit: PropTypes.func,
    isEditing: PropTypes.bool,
    changeIsEditing: PropTypes.func,
  }

  state = {
    newSighting: defaultSighting,
    modal: false,
    dropdownValue: 'Unknown',
    threatLevels: threatLevelsArray,
    dropdownOpen: false,
  }

  componentWillReceiveProps(props) {
    if (props.isEditing) {
      this.openEditModal(props.sighting);
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  closeModal = () => {
    this.setState({ newSighting: {}, modal: false });
    if (this.props.isEditing) {
      this.props.changeIsEditing(false);
    }
  }

  openEditModal = (sighting) => {
    const tempSighting = defaultSighting;
    tempSighting.id = sighting.id;
    tempSighting.userId = sighting.userId;
    tempSighting.title = sighting.title;
    tempSighting.location = sighting.location;
    tempSighting.description = sighting.description;
    tempSighting.imageUrl = sighting.imageUrl;
    tempSighting.videoUrl = sighting.videoUrl;
    tempSighting.dateCreated = sighting.dateCreated;
    tempSighting.threatLevel = sighting.threatLevel;
    tempSighting.isActive = sighting.isActive;
    tempSighting.isAnon = sighting.isAnon;
    tempSighting.latitude = sighting.latitude;
    tempSighting.longitude = sighting.longitude;
    this.setState(prevState => ({
      modal: !prevState.modal,
      newSighting: tempSighting,
      dropdownValue: sighting.threatLevel,
    }));
  }

  openAddModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const mySighting = { ...this.state.newSighting };
    if (!this.props.isEditing) {
      mySighting.dateCreated = new Date();
      mySighting.userId = this.props.userId;
    }
    onSubmit(mySighting);
    this.setState({ newSighting: {}, modal: false });
  }

  generateCoordinates = () => {
    const tempSighting = { ...this.state.newSighting };
    mapRequests.getCoordinates(tempSighting.location).then((coordinates) => {
      tempSighting.latitude = coordinates.latitude;
      tempSighting.longitude = coordinates.longitude;
      this.setState({ newSighting: tempSighting });
    }).catch((error) => {
      console.error(error);
    });
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempSighting = { ...this.state.newSighting };
    tempSighting[name] = e.target.value;
    this.setState({ newSighting: tempSighting });
  }

  titleChange = e => this.formFieldStringState('title', e);

  descriptionChange = e => this.formFieldStringState('description', e);

  imageUrlChange = e => this.formFieldStringState('imageUrl', e);

  videoUrlChange = e => this.formFieldStringState('videoUrl', e);

  threatLevelChange = e => this.formFieldStringState('threatLevel', e);

  locationChange = e => this.formFieldStringState('location', e);

  isAnonChange = (e) => {
    const tempSighting = { ...this.state.newSighting };
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    tempSighting.isAnon = value;
    this.setState({ newSighting: tempSighting });
  }

  changeThreatLevelValue = (e) => {
    const tempSighting = { ...this.state.newSighting };
    tempSighting.threatLevel = e.target.value;
    const dropdownValue = e.target.value;
    this.setState({ newSighting: tempSighting, dropdownValue });
  }

  render() {
    const {
      newSighting,
      modal,
      threatLevels,
      dropdownValue,
    } = this.state;

    const threatLevelItems = threatLevels.map((threatLevel) => {
      if (dropdownValue === threatLevel.option) {
        return <div key={threatLevel.id}></div>;
      }
      if (threatLevel.option === 'All') {
        return <div key={threatLevel.id}></div>;
      }
      return (<DropdownItem
        value={threatLevel.option}
        key={threatLevel.id}
        onClick={this.changeThreatLevelValue}>
        {threatLevel.option}
        </DropdownItem>);
    });

    return (
        <div>
          <Button className='' onClick={this.openAddModal}>Add New Sighting</Button>
          <Modal isOpen={modal}>
            <ModalHeader>
            {(this.props.isEditing === true) ? 'Edit Sighting' : 'Add Sighting'}
            </ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <CustomInput
                    inline
                    label='Post as Anonymous'
                    type="checkbox"
                    name="isAnon"
                    id="exampleCustomInline"
                    checked={newSighting.isAnon}
                    onChange={this.isAnonChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleTitle">Title:</Label>
                  <Input
                    type="title"
                    name="title"
                    id="exampleTitle"
                    placeholder="sighting title"
                    value={newSighting.title}
                    onChange={this.titleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    Threat Level:
                  <DropdownToggle className='ml-2' caret>
                    {dropdownValue}
                  </DropdownToggle>
                  <DropdownMenu>
                    {threatLevelItems}
                  </DropdownMenu>
                  </Dropdown>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleLocation">Location:</Label>
                  <Input
                    type="location"
                    name="location"
                    id="exampleLocation"
                    placeholder="sighting location"
                    value={newSighting.location}
                    onChange={this.locationChange}
                  />
                </FormGroup>
                <FormGroup className='d-flex justify-content-between'>
                  <Button onClick={this.generateCoordinates}>Generate Coordinates</Button>
                  <Label className='m-6'>Longitude: <p>{newSighting.longitude}</p></Label>
                  <Label className='m-6'>Latitude: <p>{newSighting.latitude}</p></Label>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleDescription">Description:</Label>
                  <Input
                    type="description"
                    name="description"
                    id="exampleDescription"
                    placeholder="sighting description"
                    value={newSighting.description}
                    onChange={this.descriptionChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleImageUrl">Image URL:</Label>
                  <Input
                    type="imageUrl"
                    name="imageUrl"
                    id="exampleImageUrl"
                    placeholder="sighting image url"
                    value={newSighting.imageUrl}
                    onChange={this.imageUrlChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleVideoUrl">Video URL:</Label>
                  <Input
                    type="videoUrl"
                    name="videoUrl"
                    id="exampleVideoUrl"
                    placeholder="sighting video url"
                    value={newSighting.videoUrl}
                    onChange={this.videoUrlChange}
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.formSubmit} color="primary">Save</Button>
              <Button onClick={this.closeModal} color="secondary">Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
    );
  }
}

export default SightingModal;

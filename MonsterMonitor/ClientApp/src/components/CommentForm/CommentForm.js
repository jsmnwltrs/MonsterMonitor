import React from 'react';
import {
  FormGroup,
  Col,
  Input,
  Label,
  Button,
} from 'reactstrap';
import PropTypes from 'prop-types';
import './CommentForm.scss';
import sightingShape from '../../helpers/props/sightingShape';
import userShape from '../../helpers/props/userShape';

const defaultComment = {
  userId: 0,
  sightingId: 0,
  dateCreated: '',
  message: '',
  isAnon: false,
};

class CommentForm extends React.Component {
  static propTypes = {
    sighting: sightingShape,
    currentUser: userShape,
    onSubmit: PropTypes.func,
  }

  state = {
    newComment: defaultComment,
  }

  formSubmit = () => {
    const { sighting, currentUser, onSubmit } = this.props;
    const myComment = { ...this.state.newComment };
    myComment.userId = currentUser.id;
    myComment.sightingId = sighting.id;
    myComment.dateCreated = new Date();
    onSubmit(myComment);
  }

  messageChange = (e) => {
    e.preventDefault();
    const tempComment = { ...this.state.newComment };
    tempComment.message = e.target.value;
    this.setState({ newComment: tempComment });
  }

  isAnonChange = (e) => {
    const tempComment = { ...this.state.newComment };
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    tempComment.isAnon = value;
    this.setState({ newComment: tempComment });
  }

  render() {
    const { newComment } = this.state;
    return (
      <div>
        <FormGroup row>
          <Col sm={10}>
            <Input
              type="textarea"
              name="text"
              id="exampleText"
              onChange={this.messageChange}
              />
          </Col>
        </FormGroup>
        <FormGroup>
          <Label for="exampleIsAnon">Post as Anonymous</Label>
          <Input
            type="checkbox"
            name="isAnon"
            id="exampleIsAnon"
            checked={newComment.isAnon}
            onChange={this.isAnonChange}
          />
        </FormGroup>
        <Button onClick={this.formSubmit}>
          Post Comment
        </Button>
      </div>
    );
  }
}

export default CommentForm;

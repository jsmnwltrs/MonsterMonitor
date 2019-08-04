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
import commentShape from '../../helpers/props/commentShape';

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
    commentToEdit: commentShape,
    isEditing: PropTypes.bool,
  }

  state = {
    newComment: defaultComment,
  }

  componentWillReceiveProps(props) {
    if (props.isEditing) {
      this.setCommentState(props.commentToEdit);
    }
  }

  setCommentState = (comment) => {
    const tempComment = { ...this.state.newComment };
    tempComment.id = comment.id;
    tempComment.userId = comment.userId;
    tempComment.sightingId = comment.sightingId;
    tempComment.dateCreated = comment.dateCreated;
    tempComment.message = comment.message;
    tempComment.isAnon = comment.isAnon;
    this.setState({ newComment: tempComment });
  }

  formSubmit = () => {
    const { isEditing, onSubmit } = this.props;
    const myComment = { ...this.state.newComment };
    if (!isEditing) {
      const { sighting, currentUser } = this.props;
      myComment.userId = currentUser.id;
      myComment.sightingId = sighting.id;
      myComment.dateCreated = new Date();
    }
    onSubmit(myComment);
    this.setState({ newComment: defaultComment });
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
              value={newComment.message}
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

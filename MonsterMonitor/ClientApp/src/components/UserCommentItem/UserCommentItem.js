import React from 'react';
import './UserCommentItem.scss';
import PropTypes from 'prop-types';
import {
  FormGroup,
  Col,
  Input,
  Label,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import userShape from '../../helpers/props/userShape';
import commentShape from '../../helpers/props/commentShape';

class UserCommentItem extends React.Component {
  static propTypes = {
    user: userShape,
    comment: commentShape,
    deleteComment: PropTypes.func,
    updateComment: PropTypes.func,
  }

  state = {
    isEditing: false,
    newComment: {},
  }

  componentDidMount() {
    this.setComment(this.props.comment);
  }

  setComment = (comment) => {
    const tempComment = { ...this.state.newComment };
    tempComment.id = comment.id;
    tempComment.userId = comment.userId;
    tempComment.sightingId = comment.sightingId;
    tempComment.dateCreated = comment.dateCreated;
    tempComment.message = comment.message;
    tempComment.isAnon = comment.isAnon;
    this.setState({ newComment: tempComment });
  }

  deleteCommentEvent = () => {
    const { deleteComment, comment } = this.props;
    deleteComment(comment.id);
  }

  updateCommentEvent = () => {
    const { newComment } = this.state;
    const { updateComment } = this.props;
    updateComment(newComment);
    this.setState({ isEditing: false });
  }

  showEditForm = () => {
    this.setState({ isEditing: true });
  }

  hideEditForm = () => {
    this.setState({ isEditing: false });
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
    const { comment, user } = this.props;
    const { isEditing, newComment } = this.state;
    const SightingDetails = `/sightingdetails/${comment.sightingId}`;
    const defaultImage = 'http://cdn.onlinewebfonts.com/svg/img_556571.png';

    const makeButtons = () => {
      if (isEditing) {
        return (
          <div>
            <button className="btn btn-default" onClick={this.updateCommentEvent}>
              <i className="fas fa-check-circle"></i>
            </button>
            <button className="btn btn-default" onClick={this.hideEditForm}>
              <i className="fas fa-times-circle"></i>
            </button>
          </div>
        );
      }
      return (
        <div>
          <Link to={SightingDetails}>
            Sighting Details
          </Link>
          <button className="btn btn-default" onClick={this.showEditForm}>
            <i className="far fa-edit"></i>
          </button>
          <button className="btn btn-default" onClick={this.deleteCommentEvent}>
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      );
    };

    const makeForm = () => {
      if (isEditing) {
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
          </div>
        );
      }
      return (
        <p>{comment.message}</p>
      );
    };

    if (user.id === 0) {
      return (
        <div></div>
      );
    }

    return (
      <div>
        <p>{(comment.isAnon) ? 'Anonymous' : ''}</p>
        <p>{comment.dateCreated}</p>
        {makeForm()}
        {makeButtons()}
      </div>
    );
  }
}

export default UserCommentItem;

import React from 'react';
import './UserCommentItem.scss';
import PropTypes from 'prop-types';
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

  componentWillReceiveProps(props) {
    this.setComment(props.comment);
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

  deleteCommentEvent = () => {
    const { deleteComment, comment } = this.props;
    deleteComment(comment.id);
  }

  showEditForm = () => {
    this.setState({ isEditing: true });
  }

  hideEditForm = () => {
    this.setState({ isEditing: false });
  }

  render() {
    const { comment, user } = this.props;
    const { isEditing } = this.state;
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


    if (user.id === 0) {
      return (
        <div></div>
      );
    }

    if (comment.isAnon) {
      return (
      <div>
        <img className='avatar' src={defaultImage} alt='avatar'/>
        <p>Anonymous</p>
        <p>{comment.dateCreated}</p>
        <p>{comment.message}</p>
        {makeButtons()}
      </div>
      );
    }

    return (
      <div>
        <img className='avatar' src={user.imageUrl} alt='avatar'/>
        <p>{user.username}</p>
        <p>{comment.dateCreated}</p>
        <p>{comment.message}</p>
        {makeButtons()}
      </div>
    );
  }
}

export default UserCommentItem;

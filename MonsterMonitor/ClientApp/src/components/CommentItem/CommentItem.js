import React from 'react';
import './CommentItem.scss';
import PropTypes from 'prop-types';
import commentShape from '../../helpers/props/commentShape';
import userShape from '../../helpers/props/userShape';
import userRequests from '../../helpers/data/userRequests';

const defaultUser = {
  id: 0,
  username: '',
  email: '',
  imageUrl: '',
  location: '',
};

class CommentItem extends React.Component {
  static propTypes = {
    comment: commentShape,
    currentUser: userShape,
    deleteComment: PropTypes.func,
    passCommentToEdit: PropTypes.func,
  }

  state = {
    user: defaultUser,
    currentUser: defaultUser,
  }

  constructor(props) {
    super(props);
    this.setUserState(props.comment, props.currentUser);
  }

  setUserState(comment, currentUser) {
    userRequests.getUserById(comment.userId)
      .then((user) => {
        this.setState({ user, currentUser });
      }).catch((error) => {
        console.error(error);
      });
  }

  deleteCommentEvent = () => {
    const { comment, deleteComment } = this.props;
    deleteComment(comment.id);
  }

  updateCommentEvent = () => {
    const { passCommentToEdit, comment } = this.props;
    passCommentToEdit(comment);
  }

  goToProfile = () => {
    const { user, currentUser } = this.state;
    if (user.id === currentUser.id) {
      this.props.history.push('/profile');
    }
  }

  render() {
    const { comment } = this.props;
    const { user, currentUser } = this.state;
    const defaultImage = 'http://cdn.onlinewebfonts.com/svg/img_556571.png';

    const makeButtons = () => {
      if (user.id === currentUser.id) {
        return (
          <div>
            <button className="btn btn-default" onClick={this.updateCommentEvent}>
              <i className="far fa-edit"></i>
            </button>
            <button className="btn btn-default" onClick={this.deleteCommentEvent}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        );
      }
      return (
        <div></div>
      );
    };

    if (user.id === 0) {
      return (
        <div></div>
      );
    }

    return (
      <div>
        <img className='avatar'
        src={(comment.isAnon) ? defaultImage : user.imageUrl}
        alt='avatar'
        onClick={this.goToProfile}
        />
        <p>{(comment.isAnon) ? 'Anonymous' : user.username}</p>
        <p>{comment.dateCreated}</p>
        <p>{comment.message}</p>
        {makeButtons()}
      </div>
    );
  }
}

export default CommentItem;

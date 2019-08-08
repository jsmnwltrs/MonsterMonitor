import React from 'react';
import './CommentItem.scss';
import PropTypes from 'prop-types';
import moment from 'moment';
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

    if (user.id === 0) {
      return (
        <div></div>
      );
    }

    if (user.id === currentUser.id) {
      return (
        <div className='outgoing-comment'>
          <div className='d-flex flex-wrap justify-content-end mr-4'>
          <div className='mt-2'>
            <p className='mr-3 username'><strong>{(comment.isAnon) ? 'Anonymous' : user.username}</strong></p>
            <div className='mr-3 message-box'>
              <p className='m-2'>{comment.message}</p>
            </div>
          </div>
          <div className='mt-3'>
            <img className='avatar'
              src={(comment.isAnon) ? defaultImage : user.imageUrl}
              alt='avatar'
              onClick={this.goToProfile}
            />
          </div>
          </div>
        <div className='d-flex justify-content-end mr-5'>
          <button className="btn btn-default" onClick={this.updateCommentEvent}>
            <i className="far fa-edit"></i>
          </button>
          <button className="btn btn-default" onClick={this.deleteCommentEvent}>
            <i className="fas fa-trash-alt"></i>
          </button>
          <p className='mt-3 mr-5'>{moment(comment.dateCreated).format('MMMM Do YYYY, h:mma')}</p>
        </div>
      </div>
      );
    }

    return (
      <div className='incoming-comment ml-4'>
      <div className='d-flex flex-wrap justify-content-start ml-4'>
      <div className='mt-3'>
        <img className='avatar'
          src={(comment.isAnon) ? defaultImage : user.imageUrl}
          alt='avatar'
        />
      </div>
      <div className='mt-2'>
        <p className='ml-3 username'><strong>{(comment.isAnon) ? 'Anonymous' : user.username}</strong></p>
        <div className='ml-3 message-box'>
          <p className='m-2'>{comment.message}</p>
        </div>
      </div>
      </div>
    <div className='d-flex justify-content-start ml-5'>
      <p className='mt-3 ml-5'>{moment(comment.dateCreated).format('MMMM Do YYYY, h:mma')}</p>
    </div>
  </div>
    );
  }
}

export default CommentItem;

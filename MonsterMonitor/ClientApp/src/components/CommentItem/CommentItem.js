import React from 'react';
import './CommentItem.scss';
import commentShape from '../../helpers/props/commentShape';
import userRequests from '../../helpers/data/userRequests';

class CommentItem extends React.Component {
  static propTypes = {
    comment: commentShape,
  }

  state = {
    user: {},
  }

  componentWillReceiveProps(props) {
    this.setUserState(props.comment);
  }

  setUserState(comment) {
    userRequests.getUserById(comment.userId)
      .then((user) => {
        this.setState({ user });
      }).catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { comment } = this.props;
    const { user } = this.state;
    const defaultImage = 'http://cdn.onlinewebfonts.com/svg/img_556571.png';

    if (comment.isAnon) {
      return (
      <div>
        <img className='avatar' src={defaultImage} alt='avatar'/>
        <p>Anonymous</p>
        <p>{comment.dateCreated}</p>
        <p>{comment.message}</p>
      </div>
      );
    }

    return (
      <div>
        <img className='avatar' src={user.imageUrl} alt='avatar'/>
        <p>{user.username}</p>
        <p>{comment.dateCreated}</p>
        <p>{comment.message}</p>
      </div>
    );
  }
}

export default CommentItem;

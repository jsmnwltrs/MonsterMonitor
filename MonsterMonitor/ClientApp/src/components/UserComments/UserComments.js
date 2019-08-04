import React from 'react';
import './UserComments.scss';
import UserCommentItem from '../UserCommentItem/UserCommentItem';
import userRequests from '../../helpers/data/userRequests';
import commentRequests from '../../helpers/data/commentRequests';

const defaultUser = {
  id: 0,
  username: '',
  email: '',
  imageUrl: '',
  location: '',
};

class UserComments extends React.Component {
  state = {
    user: defaultUser,
    comments: [],
  }

  componentDidMount() {
    this.setUserState();
  }

  setUserState = () => {
    userRequests.getUserByEmail()
      .then((user) => {
        this.setState({ user });
        this.setComments();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setComments = () => {
    const { user } = this.state;
    commentRequests.getCommentsByUserId(user.id)
      .then((comments) => {
        this.setState({ comments });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  deleteComment = (commentId) => {
    commentRequests.deleteComment(commentId)
      .then(() => {
        this.setComments();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { comments, user } = this.state;

    const userCommentItemComponents = comments.map(comment => (
      <UserCommentItem
        key={comment.id}
        comment={comment}
        user={user}
        deleteComment={this.deleteComment}
      />
    ));

    if (user.id === 0) {
      return (
        <div></div>
      );
    }

    return (
      <div>
        <h2>User Comments</h2>
        {userCommentItemComponents}
      </div>
    );
  }
}

export default UserComments;

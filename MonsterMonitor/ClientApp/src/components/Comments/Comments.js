import React from 'react';
import './Comments.scss';
import commentRequests from '../../helpers/data/commentRequests';
import userRequests from '../../helpers/data/userRequests';
import CommentItem from '../CommentItem/CommentItem';
import CommentForm from '../CommentForm/CommentForm';
import sightingShape from '../../helpers/props/sightingShape';

class Comments extends React.Component {
  static propTypes = {
    sighting: sightingShape,
  }

  state = {
    comments: [],
    currentUser: {},
    sightingId: 0,
    isEditing: false,
    commentToEdit: {},
  }

  componentWillReceiveProps(props) {
    this.getComments(props.sighting);
  }

  getComments = (sighting) => {
    commentRequests.getCommentsBySightingId(sighting.id)
      .then((comments) => {
        this.setState({ comments, sightingId: sighting.id });
        this.setCurrentUserState();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  resetComments = () => {
    const { sightingId } = this.state;
    commentRequests.getCommentsBySightingId(sightingId)
      .then((comments) => {
        this.setState({ comments });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setCurrentUserState = () => {
    userRequests.getUserByEmail()
      .then((currentUser) => {
        this.setState({ currentUser });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onSubmit = (commentObject) => {
    const { isEditing } = this.state;
    if (isEditing) {
      commentRequests.updateComment(commentObject)
        .then(() => {
          this.resetComments();
          this.setState({ isEditing: false });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      commentRequests.addComment(commentObject)
        .then(() => {
          this.resetComments();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  passCommentToEdit = (commentObject) => {
    this.setState({ commentToEdit: commentObject, isEditing: true });
  }

  deleteComment = (commentId) => {
    commentRequests.deleteComment(commentId)
      .then(() => {
        this.resetComments();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const {
      comments,
      currentUser,
      isEditing,
      commentToEdit,
    } = this.state;
    const { sighting } = this.props;

    const commentItemComponents = comments.map(comment => (
      <CommentItem
        key={comment.id}
        comment={comment}
        currentUser={currentUser}
        deleteComment={this.deleteComment}
        passCommentToEdit={this.passCommentToEdit}
        history={this.props.history}
      />
    ));

    return (
      <div>
        <h2>Comments</h2>
        <div className='message-board'>
          {commentItemComponents}
        </div>
        <div className='message-form'>
          <CommentForm
            sighting={sighting}
            currentUser={currentUser}
            onSubmit={this.onSubmit}
            isEditing={isEditing}
            commentToEdit={commentToEdit}
          />
        </div>
      </div>
    );
  }
}

export default Comments;

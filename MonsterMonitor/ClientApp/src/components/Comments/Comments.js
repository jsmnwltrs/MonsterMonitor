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
    commentRequests.addComment(commentObject)
      .then(() => {
        this.resetComments();
      })
      .catch((error) => {
        console.error(error);
      });
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
    const { comments, currentUser } = this.state;
    const { sighting } = this.props;

    const commentItemComponents = comments.map(comment => (
      <CommentItem
        key={comment.id}
        comment={comment}
        currentUser={currentUser}
        deleteComment={this.deleteComment}
      />
    ));

    return (
      <div>
        <h2>Comments</h2>
        <div className='message-board'>
          {commentItemComponents}
        </div>
        <div className='message-form'>
          <CommentForm sighting={sighting} currentUser={currentUser} onSubmit={this.onSubmit}/>
        </div>
      </div>
    );
  }
}

export default Comments;

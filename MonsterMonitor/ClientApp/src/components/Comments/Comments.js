import React from 'react';
import './Comments.scss';
import commentRequests from '../../helpers/data/commentRequests';
import CommentItem from '../CommentItem/CommentItem';

class Comments extends React.Component {
  state = {
    comments: [],
  }

  componentWillReceiveProps(props) {
    this.getComments(props.sighting);
  }

  getComments = (sighting) => {
    commentRequests.getCommentsBySightingId(sighting.id)
      .then((comments) => {
        this.setState({ comments });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { comments } = this.state;

    const commentItemComponents = comments.map(comment => (
      <CommentItem
        key={comment.id}
        comment={comment}
      />
    ));

    return (
      <div>
        <h2>Comments</h2>
        {commentItemComponents}
      </div>
    );
  }
}

export default Comments;

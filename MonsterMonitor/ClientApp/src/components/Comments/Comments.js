import React from 'react';
import './Comments.scss';
import commentRequests from '../../helpers/data/commentRequests';

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
    return (
      <h2>Comments</h2>
    );
  }
}

export default Comments;

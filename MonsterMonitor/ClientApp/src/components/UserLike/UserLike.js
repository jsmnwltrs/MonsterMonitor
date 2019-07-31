import React from 'react';
import './UserLike.scss';
import userShape from '../../helpers/props/userShape';
import sightingShape from '../../helpers/props/sightingShape';
import userLikeRequests from '../../helpers/data/userLikeRequests';

class UserLike extends React.Component {
  static propTypes = {
    user: userShape,
    sighting: sightingShape,
  }

  state = {
    totalLikes: 0,
    totalDislikes: 0,
    userLike: {},
  }

  componentWillReceiveProps(props) {
    this.setUserLike(props);
  }

  setUserLike = (props) => {
    const { sighting, user } = props;
    userLikeRequests.getUserLikeBySightingIdAndUserId(sighting.id, user.id)
      .then((userLike) => {
        this.setState({ userLike, ready: true });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  likeEvent = (bool) => {
    const { userLike } = this.state;
    if (userLike === '') {
      this.addUserLike(bool);
    }
    if (userLike !== '') {
      this.updateUserLike(bool);
    }
  }

  addUserLike = (bool) => {
    const { sighting, user } = this.props;
    const tempUserLike = {};
    tempUserLike.userId = user.id;
    tempUserLike.sightingId = sighting.id;
    tempUserLike.isLiked = bool;
    userLikeRequests.addUserLike(tempUserLike)
      .then((userLike) => {
        this.setState({ userLike });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  updateUserLike = (bool) => {
    const tempUserLike = { ...this.state.userLike };
    tempUserLike.isLiked = bool;
    userLikeRequests.updateUserLike(tempUserLike)
      .then((userLike) => {
        this.setState({ userLike });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  deleteEvent = () => {
    const { userLike } = this.state;
    userLikeRequests.deleteUserLike(userLike.id)
      .then(() => {
        this.setState({ userLike: '' });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { userLike } = this.state;

    const makeButtons = () => {
      if (userLike.isLiked) {
        return (
        <div>
          <button onClick={this.deleteEvent}><i className="fas fa-thumbs-up"></i></button>
          <p>{this.state.totalLikes}</p>
          <button onClick={() => {
            this.likeEvent(false);
          }}><i className="far fa-thumbs-down"></i></button>
          <p>{this.state.totalDislikes}</p>
        </div>
        );
      }
      if (userLike.isLiked === false) {
        return (
          <div>
            <button onClick={() => {
              this.likeEvent(true);
            }}><i className="far fa-thumbs-up"></i></button>
            <p>{this.state.totalLikes}</p>
            <button onClick={this.deleteEvent}><i className="fas fa-thumbs-down"></i></button>
            <p>{this.state.totalDislikes}</p>
          </div>
        );
      }
      return (
        <div>
          <button onClick={() => {
            this.likeEvent(true);
          }}><i className="far fa-thumbs-up"></i></button>
          <p>{this.state.totalLikes}</p>
          <button onClick={() => {
            this.likeEvent(false);
          }}><i className="far fa-thumbs-down"></i></button>
          <p>{this.state.totalDislikes}</p>
        </div>
      );
    };

    return (
      <div>
       {makeButtons()}
      </div>
    );
  }
}

export default UserLike;

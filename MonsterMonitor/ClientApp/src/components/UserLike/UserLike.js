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
    ready: false,
  }

  componentWillReceiveProps(props) {
    if (props.user.id !== 0 && props.sighting.id !== 0) {
      this.setUserLike(props);
    }
  }

  setUserLike = (props) => {
    const { sighting, user } = props;
    userLikeRequests.getUserLikeBySightingIdAndUserId(sighting.id, user.id)
      .then((userLike) => {
        this.setState({ userLike });
        this.setTotals(props.sighting);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setTotals = (sighting) => {
    userLikeRequests.getUserLikesBySightingId(sighting.id)
      .then((userLikes) => {
        const totalLikes = userLikes.filter(userLike => userLike.isLiked === true).length;
        const totalDislikes = userLikes.filter(userLike => userLike.isLiked === false).length;
        this.setState({ totalLikes, totalDislikes, ready: true });
      })
      .catch();
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
        this.setTotals(sighting);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  updateUserLike = (bool) => {
    const { sighting } = this.props;
    const tempUserLike = { ...this.state.userLike };
    tempUserLike.isLiked = bool;
    userLikeRequests.updateUserLike(tempUserLike)
      .then((userLike) => {
        this.setState({ userLike });
        this.setTotals(sighting);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  deleteEvent = () => {
    const { userLike } = this.state;
    const { sighting } = this.props;
    userLikeRequests.deleteUserLike(userLike.id)
      .then(() => {
        this.setState({ userLike: '' });
        this.setTotals(sighting);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { userLike, ready } = this.state;

    const makeButtons = () => {
      if (userLike.isLiked) {
        return (
        <div>
          <i onClick={this.deleteEvent}
          className="fas fa-thumbs-up fa-2x m-3 checked-buttons">  {this.state.totalLikes}</i>
          <i onClick={() => {
            this.likeEvent(false);
          }} className="far fa-thumbs-down fa-2x m-3 buttons">  {this.state.totalDislikes}</i>
        </div>
        );
      }
      if (userLike.isLiked === false) {
        return (
          <div>
            <i onClick={() => {
              this.likeEvent(true);
            }}className="far fa-thumbs-up fa-2x m-3 buttons">  {this.state.totalLikes}</i>
            <i onClick={this.deleteEvent}
            className="fas fa-thumbs-down fa-2x m-3 checked-buttons">  {this.state.totalDislikes}</i>
          </div>
        );
      }
      return (
        <div>
          <i onClick={() => {
            this.likeEvent(true);
          }} className="far fa-thumbs-up fa-2x m-3 buttons">  {this.state.totalLikes}</i>
          <i onClick={() => {
            this.likeEvent(false);
          }} className="far fa-thumbs-down fa-2x m-3 buttons">  {this.state.totalDislikes}</i>
        </div>
      );
    };

    if (!ready) {
      return <div></div>;
    }

    return (
      <div className='mt-1 mb-1 mr-5 ml-5'>
       {makeButtons()}
      </div>
    );
  }
}

export default UserLike;

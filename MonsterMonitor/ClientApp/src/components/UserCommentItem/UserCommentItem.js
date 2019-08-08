import React from 'react';
import './UserCommentItem.scss';
import PropTypes from 'prop-types';
import {
  FormGroup,
  Col,
  Input,
  CustomInput,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import userShape from '../../helpers/props/userShape';
import commentShape from '../../helpers/props/commentShape';

class UserCommentItem extends React.Component {
  static propTypes = {
    user: userShape,
    comment: commentShape,
    deleteComment: PropTypes.func,
    updateComment: PropTypes.func,
  }

  state = {
    isEditing: false,
    newComment: {},
  }

  componentDidMount() {
    this.setComment(this.props.comment);
  }

  setComment = (comment) => {
    const tempComment = { ...this.state.newComment };
    tempComment.id = comment.id;
    tempComment.userId = comment.userId;
    tempComment.sightingId = comment.sightingId;
    tempComment.dateCreated = comment.dateCreated;
    tempComment.message = comment.message;
    tempComment.isAnon = comment.isAnon;
    this.setState({ newComment: tempComment });
  }

  deleteCommentEvent = () => {
    const { deleteComment, comment } = this.props;
    deleteComment(comment.id);
  }

  updateCommentEvent = () => {
    const { newComment } = this.state;
    const { updateComment } = this.props;
    updateComment(newComment);
    this.setState({ isEditing: false });
  }

  showEditForm = () => {
    this.setState({ isEditing: true });
  }

  hideEditForm = () => {
    this.setState({ isEditing: false });
  }

  messageChange = (e) => {
    e.preventDefault();
    const tempComment = { ...this.state.newComment };
    tempComment.message = e.target.value;
    this.setState({ newComment: tempComment });
  }

  isAnonChange = (e) => {
    const tempComment = { ...this.state.newComment };
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    tempComment.isAnon = value;
    this.setState({ newComment: tempComment });
  }

  render() {
    const { comment, user } = this.props;
    const { isEditing, newComment } = this.state;
    const SightingDetails = `/sightingdetails/${comment.sightingId}`;

    const makeButtons = () => {
      if (isEditing) {
        return (
          <div>
            <button className="btn btn-default" onClick={this.updateCommentEvent}>
              <i className="fas fa-check-circle"></i>
            </button>
            <button className="btn btn-default" onClick={this.hideEditForm}>
              <i className="fas fa-times-circle"></i>
            </button>
          </div>
        );
      }
      return (
        <div>
          <button className="btn btn-default" onClick={this.showEditForm}>
            <i className="far fa-edit"></i>
          </button>
          <button className="btn btn-default mb-1" onClick={this.deleteCommentEvent}>
            <i className="fas fa-trash-alt"></i>
          </button>
          <div>
          <Link to={SightingDetails}>
            Sighting Details
          </Link>
          </div>
        </div>
      );
    };

    const makeForm = () => {
      if (isEditing) {
        return (
          <div>
            <FormGroup row>
              <Col sm={10}>
                <Input
                  className='message-input'
                  type="textarea"
                  name="text"
                  id="exampleText"
                  value={newComment.message}
                  onChange={this.messageChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
                <CustomInput
                  inline
                  label='Post as Anonymous'
                  type="checkbox"
                  name="isAnon"
                  id="exampleIsAnon"
                  checked={newComment.isAnon}
                  onChange={this.isAnonChange}
                />
            </FormGroup>
          </div>
        );
      }
      return (
        <div className='message-container'>
        <p className='m-3'>{comment.message}</p>
        </div>
      );
    };

    if (user.id === 0) {
      return (
        <div></div>
      );
    }

    return (
      <div className='comment-card m-3'>
        <Card style={{ backgroundColor: 'rgb(209, 206, 206)', borderColor: 'black' }}>
        <CardBody>
          <CardTitle className='comment-date'>{moment(comment.dateCreated).format('MMMM Do YYYY, h:mma')}</CardTitle>
          <CardSubtitle
            className='comment-isAnon'>
              <strong>{(comment.isAnon) ? 'Anonymous' : 'Public'}</strong>
          </CardSubtitle>
          <CardText>{makeForm()}</CardText>
          {makeButtons()}
        </CardBody>
      </Card>
      </div>
    );
  }
}

export default UserCommentItem;

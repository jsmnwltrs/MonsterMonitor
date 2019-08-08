import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';
import './SightingItem.scss';
import moment from 'moment';

import sightingShape from '../../helpers/props/sightingShape';

class SightingItem extends React.Component {
  static propTypes = {
    sighting: sightingShape,
  }

  goToSightingDetails = () => {
    const { sighting } = this.props;
    this.props.history.push(`/sightingdetails/${sighting.id}`);
  }

  render() {
    const { sighting } = this.props;
    return (
      <div className='m-4'>
      <Card onClick={this.goToSightingDetails}>
        <CardBody>
          <CardTitle className='card-title'>{sighting.title}</CardTitle>
          <CardText>
            <Row className='card-date m-1'>
              {moment(sighting.dateCreated).format('MMMM Do YYYY')}
            </Row>
            <Row>
              <Col className='card-threat col-8'>
                {sighting.threatLevel}
              </Col>
              <Col className='col-4'>
                <i className="fas fa-thumbs-up mt-2"> {sighting.likes}</i>
                <i className="fas fa-thumbs-down ml-4 mt-2"> {sighting.dislikes}</i>
              </Col>
            </Row>
          </CardText>
        </CardBody>
        <CardImg
          className='card-img'
          top width="100%"
          src={sighting.imageUrl}
          alt="Card image cap"
        />
      </Card>
    </div>
    );
  }
}

export default SightingItem;

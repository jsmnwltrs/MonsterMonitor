import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
} from 'reactstrap';
import './SightingItem.scss';

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
        <CardImg
          className='card-img'
          top width="100%"
          src={sighting.imageUrl}
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle>{sighting.title}</CardTitle>
          <CardSubtitle>{sighting.threatLevel}</CardSubtitle>
          <CardText>
          <Row>
          {sighting.dateCreated}
          </Row>
          <Row>
          <i className="fas fa-thumbs-up">{sighting.likes}</i>
          <i className="fas fa-thumbs-down">{sighting.dislikes}</i>
          </Row>
          </CardText>
        </CardBody>
      </Card>
    </div>
    );
  }
}

export default SightingItem;

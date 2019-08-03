import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,
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
      <div>
      <Card onClick={this.goToSightingDetails}>
        <CardImg
          top width="100%"
          src={sighting.imageUrl}
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle>{sighting.title} Date:{sighting.dateCreated}</CardTitle>
          <CardSubtitle>{sighting.threatLevel}</CardSubtitle>
          <CardText>{sighting.description} Rating:{sighting.rating}</CardText>
        </CardBody>
      </Card>
    </div>
    );
  }
}

export default SightingItem;

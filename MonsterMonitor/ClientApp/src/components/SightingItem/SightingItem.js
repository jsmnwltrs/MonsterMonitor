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

  render() {
    const { sighting } = this.props;

    return (
      <div>
      <Card>
        <CardImg
          top width="100%"
          src={sighting.imageUrl}
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle>{sighting.title}</CardTitle>
          <CardSubtitle>{sighting.threatLevel}</CardSubtitle>
          <CardText>{sighting.description}</CardText>
        </CardBody>
      </Card>
    </div>
    );
  }
}

export default SightingItem;

import PropTypes from 'prop-types';

const sightingShape = PropTypes.shape({
  id: PropTypes.number,
  userId: PropTypes.number,
  title: PropTypes.string,
  location: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  videoUrl: PropTypes.string,
  dateCreated: PropTypes.string,
  threatLevel: PropTypes.string,
  isActive: PropTypes.bool,
  isAnon: PropTypes.bool,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
});

export default sightingShape;

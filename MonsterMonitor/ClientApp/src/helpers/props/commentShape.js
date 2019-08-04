import PropTypes from 'prop-types';

const commentShape = PropTypes.shape({
  id: PropTypes.number,
  userId: PropTypes.number,
  sightingId: PropTypes.number,
  dateCreated: PropTypes.string,
  message: PropTypes.string,
  isAnon: PropTypes.bool,
});

export default commentShape;

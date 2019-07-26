import PropTypes from 'prop-types';

const orderShape = PropTypes.shape({
  id: PropTypes.number,
  username: PropTypes.string,
  email: PropTypes.string,
  imageUrl: PropTypes.string,
  location: PropTypes.string,
});

export default orderShape;

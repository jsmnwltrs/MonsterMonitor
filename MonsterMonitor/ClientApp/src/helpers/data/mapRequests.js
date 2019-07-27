import Geocode from 'react-geocode';
import apiKeys from '../apikeys';

const getCoordinates = (location) => {
  Geocode.setApiKey(apiKeys.GoogleGeoApi.key);
  Geocode.fromAddress(location).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      const coordinates = {
        latitude: lat,
        longitude: lng,
      };
      return coordinates;
    },
    (error) => {
      console.error(error);
    },
  );
};

export default getCoordinates;

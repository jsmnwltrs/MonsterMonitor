import Geocode from 'react-geocode';
import apiKeys from '../apikeys';

const getCoordinates = location => new Promise((resolve, reject) => {
  Geocode.setApiKey(apiKeys.GoogleGeoApi.key);
  Geocode.fromAddress(location)
    .then((response) => {
      const { lat, lng } = response.results[0].geometry.location;
      const coordinates = {
        latitude: lat,
        longitude: lng,
      };
      resolve(coordinates);
    }).catch((error) => {
      reject(error);
    });
});

export default {
  getCoordinates,
};

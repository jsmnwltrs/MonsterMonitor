import axios from 'axios';
import apiKeys from '../apikeys';

const monApiBaseUrl = apiKeys.monApi.apiBaseUrl;

const getSightingsByIsActive = isActive => new Promise((resolve, reject) => {
  axios.get(`${monApiBaseUrl}/sightings/byIsActive/${isActive}`)
    .then((result) => {
      if (result != null) {
        const allUsers = result.data;
        resolve(allUsers);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  getSightingsByIsActive,
};

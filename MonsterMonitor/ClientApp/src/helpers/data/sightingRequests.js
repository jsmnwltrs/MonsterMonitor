import axios from 'axios';
import apiKeys from '../apikeys';

const monApiBaseUrl = apiKeys.monApi.apiBaseUrl;

const getSightingById = sightingId => axios.get(`${monApiBaseUrl}/sightings/byId/${sightingId}`);

const getSightingsByUserId = userId => new Promise((resolve, reject) => {
  axios.get(`${monApiBaseUrl}/sightings/byUserId/${userId}`)
    .then((result) => {
      if (result != null) {
        const sightings = result.data;
        resolve(sightings);
      }
    }).catch((err) => {
      reject(err);
    });
});

const getSightingsByIsActive = isActive => new Promise((resolve, reject) => {
  axios.get(`${monApiBaseUrl}/sightings/byIsActive/${isActive}`)
    .then((result) => {
      if (result != null) {
        const sightings = result.data;
        resolve(sightings);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  getSightingById,
  getSightingsByUserId,
  getSightingsByIsActive,
};

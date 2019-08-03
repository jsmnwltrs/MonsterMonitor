import axios from 'axios';
import apiKeys from '../apikeys';

const monApiBaseUrl = apiKeys.monApi.apiBaseUrl;

const getSightingById = sightingId => axios.get(`${monApiBaseUrl}/sightings/byId/${sightingId}`);

const addSighting = sightingObject => axios.post(`${monApiBaseUrl}/sightings/add`, sightingObject);

const updateSighting = sightingObject => axios.put(`${monApiBaseUrl}/sightings/update`, sightingObject);

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

const getSightingsByUserIdAndIsActive = (userId, isActive) => new Promise((resolve, reject) => {
  axios.get(`${monApiBaseUrl}/sightings/byUserIdAndIsActive/${userId}/${isActive}`)
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

const getSightingsByThreatLevel = threatLevel => new Promise((resolve, reject) => {
  axios.get(`${monApiBaseUrl}/sightings/filterByThreatLevel/${threatLevel}`)
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


const sortByMostRecent = sightings => new Promise((resolve, reject) => {
  axios.get(`${monApiBaseUrl}/sightings/sortByMostRecent`, sightings)
    .then((result) => {
      if (result != null) {
        const sortedSightings = result.data;
        resolve(sortedSightings);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

const sortByMostPopular = sightings => new Promise((resolve, reject) => {
  axios.get(`${monApiBaseUrl}/sightings/sortByMostPopular`, sightings)
    .then((result) => {
      if (result != null) {
        const sortedSightings = result.data;
        resolve(sortedSightings);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  getSightingById,
  addSighting,
  updateSighting,
  getSightingsByUserId,
  getSightingsByIsActive,
  getSightingsByUserIdAndIsActive,
  getSightingsByThreatLevel,
  sortByMostRecent,
  sortByMostPopular,
};

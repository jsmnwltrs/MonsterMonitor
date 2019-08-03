import axios from 'axios';
import apiKeys from '../apikeys';

const monApiBaseUrl = apiKeys.monApi.apiBaseUrl;

const getCommentsBySightingId = sightingId => new Promise((resolve, reject) => {
  axios.get(`${monApiBaseUrl}/comments/bysightingid/${sightingId}`)
    .then((result) => {
      const comments = result.data;
      resolve(comments);
    })
    .catch((error) => {
      reject(error);
    });
});

export default {
  getCommentsBySightingId,
};

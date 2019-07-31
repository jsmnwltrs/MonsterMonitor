import axios from 'axios';
import apiKeys from '../apikeys';

const monApiBaseUrl = apiKeys.monApi.apiBaseUrl;

const getUserLikeBySightingIdAndUserId = (sightingId, userId) => new Promise((resolve, reject) => {
  axios.get(`${monApiBaseUrl}/userlikes/bySightingIdAndUserId/${sightingId}/${userId}`)
    .then((result) => {
      const userLike = result.data;
      if (result != null) {
        resolve(userLike);
      }
      resolve(userLike);
    })
    .catch((err) => {
      reject(err);
    });
});

const addUserLike = userLikeObject => new Promise((resolve, reject) => {
  axios.post(`${monApiBaseUrl}/userlikes/add`, userLikeObject)
    .then((result) => {
      const userLike = result.data;
      resolve(userLike);
    })
    .catch((err) => {
      reject(err);
    });
});

const updateUserLike = userLikeObject => new Promise((resolve, reject) => {
  axios.put(`${monApiBaseUrl}/userlikes/update`, userLikeObject)
    .then((result) => {
      const userLike = result.data;
      resolve(userLike);
    })
    .catch((err) => {
      reject(err);
    });
});

const deleteUserLike = userLikeId => axios.delete(`${monApiBaseUrl}/userlikes/delete/${userLikeId}`);


export default {
  getUserLikeBySightingIdAndUserId,
  addUserLike,
  updateUserLike,
  deleteUserLike,
};

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

const getCommentsByUserId = userId => new Promise((resolve, reject) => {
  axios.get(`${monApiBaseUrl}/comments/byUserId/${userId}`)
    .then((result) => {
      const comments = result.data;
      resolve(comments);
    })
    .catch((error) => {
      reject(error);
    });
});

const addComment = commentObject => axios.post(`${monApiBaseUrl}/comments/add`, commentObject);

const updateComment = commentObject => axios.put(`${monApiBaseUrl}/comments/update`, commentObject);

const deleteComment = commentId => axios.delete(`${monApiBaseUrl}/comments/delete/${commentId}`);

export default {
  getCommentsBySightingId,
  getCommentsByUserId,
  addComment,
  updateComment,
  deleteComment,
};

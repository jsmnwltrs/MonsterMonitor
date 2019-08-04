import axios from 'axios';
import apiKeys from '../apikeys';
import authRequests from './authRequests';

const monApiBaseUrl = apiKeys.monApi.apiBaseUrl;

const getAllUsers = () => new Promise((resolve, reject) => {
  axios.get(`${monApiBaseUrl}/users/all`)
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

const getUserByEmail = () => new Promise((resolve, reject) => {
  const userEmail = authRequests.getUserEmail();
  getAllUsers()
    .then((users) => {
      const currentUser = users.find(user => user.email === userEmail);
      resolve(currentUser);
    })
    .catch((error) => {
      reject(error);
    });
});

const getUserById = userId => new Promise((resolve, reject) => {
  axios.get(`${monApiBaseUrl}/users/byId/${userId}`)
    .then((result) => {
      const user = result.data;
      resolve(user);
    })
    .catch((error) => {
      reject(error);
    });
});

const addUser = userObject => axios.post(`${monApiBaseUrl}/users/add`, userObject);

const updateUser = userObject => axios.put(`${monApiBaseUrl}/users/update`, userObject);

export default {
  addUser,
  getUserByEmail,
  getAllUsers,
  updateUser,
  getUserById,
};

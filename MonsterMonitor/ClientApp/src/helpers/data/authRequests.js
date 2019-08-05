import firebase from 'firebase/app';
import axios from 'axios';

axios.interceptors.request.use((request) => {
  const token = sessionStorage.getItem('token');
  if (token != null) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
}, function (err) {
  return Promise.reject(err);
});

axios.interceptors.response.use((response) => {
  return response;
}, (errorResponse) => {
  console.error('Blew up');
});

const loginUser = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

const logoutUser = () => firebase.auth().signOut();

const getUid = () => firebase.auth().currentUser.uid;

const getUserEmail = () => firebase.auth().currentUser.email;

const getCurrentUserJwt = () => firebase
  .auth()
  .currentUser.getIdToken()
  .then(token => sessionStorage.setItem('token', token));

export default {
  getUid,
  getUserEmail,
  loginUser,
  logoutUser,
  getCurrentUserJwt,
};

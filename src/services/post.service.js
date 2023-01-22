import api from './api';
// import axios from 'axios';
// import authHeader from './auth-header';

// const API_URL = import.meta.env.VITE_API_URL;

const getAllPublicProducts = () => {
  return api.get('/public');
};

const getAllPrivateProducts = () => {
  return api.get('/private');
};

const postService = {
  getAllPublicProducts,
  getAllPrivateProducts,
};

export default postService;

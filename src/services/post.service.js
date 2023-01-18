import axios from 'axios';
import authHeader from './auth-header';

const API_URL = import.meta.env.VITE_API_URL;

const getAllPublicProducts = () => {
  return axios.get(API_URL + '/public');
};

const getAllPrivateProducts = () => {
  return axios.get(API_URL + '/private', {
    headers: authHeader(),
  });
};

const postService = {
  getAllPublicProducts,
  getAllPrivateProducts,
};

export default postService;

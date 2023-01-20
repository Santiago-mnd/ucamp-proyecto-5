import api from './api';
import TokenService from './token.service';

// const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

const signup = (username, email, password) => {
  return api
    .post('auth/signup', {
      username,
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem(
          'user',
          JSON.stringify(response.data)
        );
      }
      return response.data;
    });
};

const login = (email, password) => {
  return api
    .post('/auth/login', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem(
          'user',
          JSON.stringify(response.data)
        );
      }
      return response.data;
    });
};

const logout = () => {
  // localStorage.removeItem('user');
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;

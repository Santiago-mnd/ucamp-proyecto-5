import api from './api';
import TokenService from './token.service';

// const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

const signup = async (username, email, password) => {
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

const login = async (email, password) => {
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
        localStorage.setItem(
          'email',
          JSON.stringify(email)
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

import axios from 'axios';
import TokenService from './token.service';
import authService from './auth.service';
import { useNavigate } from 'react-router-dom';

const API_URL = `${import.meta.env.VITE_API_URL}`;

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Before making request, do the following
instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// With response data, do the following
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      if (
        (err.response.status === 403 &&
          !originalConfig._retry) ||
        (err.response.status === 401 &&
          !originalConfig._retry)
      ) {
        originalConfig._retry = true;

        try {
          const rs = await instance.post('/auth/token', {
            refreshToken:
              TokenService.getLocalRefreshToken(),
          });

          console.log('response', rs);

          const { accessToken } = rs.data;

          console.log('updateNewAccessToken', accessToken);
          TokenService.updateNewAccessToken(accessToken);

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;

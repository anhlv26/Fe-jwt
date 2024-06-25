import axios from 'axios';
import { toast } from 'react-toastify';

//create an object (authorizedAxiosInstance or called axios custom)
let authorizedAxiosInstance = axios.create();

// set maximum wait time to 10 munites
authorizedAxiosInstance.defaults.timeout = 10 * 60 * 1000;

// withCredentials: allow axios auto send cookie in every request to BE
// authorizedAxiosInstance.defaults.withCredentials = true

//config interceptors between requests and responses
authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    //Handle centralized errors returned from all APIs
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('error ', error);
    if (error.statusCode !== 410) {
      toast.error(error.response?.data?.message || error?.message);
    }
    return Promise.reject(error);
  }
);

export default authorizedAxiosInstance;

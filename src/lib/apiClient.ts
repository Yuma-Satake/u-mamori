import axios, { AxiosRequestConfig } from 'axios';
import { API_ENDPOINT } from './env.ts';

const config: AxiosRequestConfig = {
  baseURL: API_ENDPOINT,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
  transformResponse: [
    function transformResponse(data) {
      return JSON.parse(data);
    },
  ],
};

export const apiClient = axios.create(config);

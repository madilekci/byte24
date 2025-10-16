'use client';
import axios, { AxiosError } from 'axios';
axios.defaults.withCredentials = true;
import { API_URL } from '../constants/server';

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

const api = {
  axios: axiosInstance,
  AxiosError,
};

export default api;

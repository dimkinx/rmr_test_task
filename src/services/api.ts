import axios, {AxiosInstance} from 'axios';
import {API_BASE_URL, API_PORT, REQUEST_TIMEOUT} from '../common/constants';

const createAPI = (): AxiosInstance => axios.create({
  baseURL: `${API_BASE_URL}:${API_PORT}`,
  timeout: REQUEST_TIMEOUT,
});

export {createAPI};

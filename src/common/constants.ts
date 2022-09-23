const API_BASE_URL = 'http://localhost';
const API_PORT = 3001;
const REQUEST_TIMEOUT = 5000;
const FULL_DATE_FORMAT = 'YYYY-MM-DD';
const DATE_FORMAT = 'D';
const TIME_FORMAT = 'HH:mm';
const RAW_TIME_FORMAT = 'HH-mm';
const CURRENT_MONTH_OF_YEAR = '2021-05';
const MINUTES_TO_HOUR = 60;
const MILLISECONDS_TO_HOUR = 3600000;
const MILLISECONDS_TO_SECONDS = 60000;
const FILTER_TIMEOUT = 100;
const PAD_MAX_LENGTH = 2;

const APIRoute = {
  Users: '/api/users',
} as const;

const AppRoute = {
  Main: '/',
  NotFound: '*',
} as const;

const Namespace = {
  Product: 'product',
} as const;

const ToastParam = {
  Theme: 'colored',
  Position: 'top-right',
} as const;

const LoaderParam = {
  Color: '#000',
  Size: {
    Width: 100,
    Height: 100,
  },
} as const;

export {
  API_BASE_URL,
  API_PORT,
  REQUEST_TIMEOUT,
  FULL_DATE_FORMAT,
  DATE_FORMAT,
  TIME_FORMAT,
  RAW_TIME_FORMAT,
  CURRENT_MONTH_OF_YEAR,
  MINUTES_TO_HOUR,
  MILLISECONDS_TO_HOUR,
  MILLISECONDS_TO_SECONDS,
  FILTER_TIMEOUT,
  PAD_MAX_LENGTH,
  APIRoute,
  AppRoute,
  Namespace,
  ToastParam,
  LoaderParam,
};

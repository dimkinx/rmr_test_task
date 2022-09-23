import * as Moment from 'moment';
import {extendMoment} from 'moment-range';
import {
  DATE_FORMAT,
  FULL_DATE_FORMAT,
  MILLISECONDS_TO_HOUR,
  MILLISECONDS_TO_SECONDS,
  MINUTES_TO_HOUR, PAD_MAX_LENGTH,
  RAW_TIME_FORMAT,
  TIME_FORMAT,
} from '../common/constants';

const moment = extendMoment(Moment);

const getStartOfMonth = (date: string) => moment(date).startOf('month').format(FULL_DATE_FORMAT);
const getEndOfMonth = (date: string) => moment(date).endOf('month').format(FULL_DATE_FORMAT);

const createDaysList = (date: string): Array<string> => Array
  .from(moment.range([moment(getStartOfMonth(date)), moment(getEndOfMonth(date))]).by('days'))
  .map(day => day.format(FULL_DATE_FORMAT));

const getTimeDuration = (start: string, end: string): string => moment
  .utc(moment(end, RAW_TIME_FORMAT).diff(moment(start, RAW_TIME_FORMAT)))
  .format(TIME_FORMAT);

const getTotalDuration = (first: string, second: string): string => moment
  .utc(moment.duration(first).add(moment.duration(second)).as('milliseconds'))
  .valueOf().toString();

const getFormattedDuration = (ms: string): string => {
  const minutes = Math.floor(+ms / MILLISECONDS_TO_SECONDS % MINUTES_TO_HOUR);
  const hours = Math.floor(+ms / MILLISECONDS_TO_HOUR);

  return `${hours.toString().padStart(PAD_MAX_LENGTH, '0')}:${minutes.toString().padStart(PAD_MAX_LENGTH, '0')}`;
};

const getFormattedDate = (date: string): string => moment(date).format(DATE_FORMAT);

const compareDuration = (first: string, second: string): number => {
  if (moment(first, TIME_FORMAT) > moment(second, TIME_FORMAT)) {
    return 1;
  }

  if (moment(first, TIME_FORMAT) < moment(second, TIME_FORMAT)) {
    return -1;
  }

  return 0;
};

export {
  createDaysList,
  getTimeDuration,
  getTotalDuration,
  getFormattedDuration,
  getFormattedDate,
  compareDuration,
};

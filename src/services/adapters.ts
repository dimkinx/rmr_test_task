import {RawUser, User} from '../types/user';
import {TableData} from '../types/table';
import {createDaysList, getFormattedDuration, getTimeDuration, getTotalDuration} from '../helpers/date-time-utils';
import {CURRENT_MONTH_OF_YEAR} from '../common/constants';

const adaptRawUsersToClient = (rawUsers: Array<RawUser>): Array<User> => rawUsers
  .map(({id, Fullname, Days}) => {
    const daysList = createDaysList(CURRENT_MONTH_OF_YEAR);
    let totalDuration: string = '0';

    return {
      id: id.toString(),
      fullName: Fullname,
      days: daysList.map((date, index) => {
        if (Days[index] && Days[index].Date !== date) {
          Days.unshift(Days[index]);
        }

        const duration = Days[index] && Days[index].Date === date
          ? getTimeDuration(Days[index].Start, Days[index].End)
          : '0';

        totalDuration = getTotalDuration(totalDuration, duration);

        return {
          date: date,
          duration: duration,
        };
      }),
      totalDuration: getFormattedDuration(totalDuration),
    };
  });

const adaptUsersToTable = (users: Array<User>): Array<TableData> => users
  .map(({id, fullName, days, totalDuration}) => Object
    .assign({
      key: id,
      fullName: fullName,
      totalDuration: totalDuration,
    }, ...days.map(({date, duration}) => ({[date]: duration}))));

export {adaptRawUsersToClient, adaptUsersToTable};

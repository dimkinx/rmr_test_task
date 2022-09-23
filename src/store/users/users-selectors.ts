import {createSelector} from 'reselect';
import {State} from '../../types/state';
import {User} from '../../types/user';
import {TableData} from '../../types/table';
import {StatusType} from '../../common/enums';
import {adaptUsersToTable} from '../../services/adapters';

const getUsers = (state: State): Array<User> | null => state.users.users;
const getUsersStatus = (state: State): StatusType => state.users.status;

const getTableData = createSelector(
  getUsers,
  (users): Array<TableData> => !users?.length ? [] : adaptUsersToTable([...users]),
);

export {getUsers, getUsersStatus, getTableData};

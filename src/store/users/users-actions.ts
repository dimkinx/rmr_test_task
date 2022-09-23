import {createAction} from '@reduxjs/toolkit';
import {User} from '../../types/user';
import {ActionType, StatusType} from '../../common/enums';

const setUsers = createAction(
  ActionType.SET_USERS,
  (users: Array<User>) => ({
    payload: {
      users,
    },
  }),
);

const setUsersStatus = createAction(
  ActionType.SET_USERS_STATUS,
  (status: StatusType) => ({
    payload: {
      status,
    },
  }),
);

export {setUsers, setUsersStatus};

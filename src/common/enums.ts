const enum StatusType {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  FAILURE = 'failure',
}

const enum ActionType {
  SET_USERS = 'users/setUsers',
  SET_USERS_STATUS = 'users/setUsersStatus',
}

export {StatusType, ActionType};

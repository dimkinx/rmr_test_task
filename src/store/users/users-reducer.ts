import {createReducer} from '@reduxjs/toolkit';
import {UsersState} from '../../types/state';
import {StatusType} from '../../common/enums';
import {setUsers, setUsersStatus} from './users-actions';

const usersInitialState: UsersState = {
  users: null,
  status: StatusType.IDLE,
};

const usersReducer = createReducer(usersInitialState, builder => {
  builder
    .addCase(setUsers, (state, action) => {
      state.users = action.payload.users;
    })
    .addCase(setUsersStatus, (state, action) => {
      state.status = action.payload.status;
    });
});

export {usersInitialState, usersReducer};

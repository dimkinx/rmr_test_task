import {StatusType} from '../common/enums';
import {User} from './user';

type UsersState = {
  users: Array<User> | null;
  status: StatusType;
};

type State = {
  users: UsersState;
};

export type {UsersState, State};

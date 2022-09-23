import {APIRoute} from '../../common/constants';
import {StatusType} from '../../common/enums';
import {ThunkActionResult} from '../../types/thunk-action';
import {RawUser} from '../../types/user';
import {adaptRawUsersToClient} from '../../services/adapters';
import {setUsers, setUsersStatus} from './users-actions';

const fetchUsers = (): ThunkActionResult => async (dispatch, _getState, api): Promise<void> => {
  dispatch(setUsersStatus(StatusType.LOADING));
  await api.get<Array<RawUser>>(APIRoute.Users)
    .then(({data: rawUsers}) => {
      dispatch(setUsers(adaptRawUsersToClient(rawUsers)));
      dispatch(setUsersStatus(StatusType.SUCCESS));
    })
    .catch(() => {
      dispatch(setUsersStatus(StatusType.FAILURE));
    })
    .finally(() => {
      dispatch(setUsersStatus(StatusType.IDLE));
    });
};

export {fetchUsers};

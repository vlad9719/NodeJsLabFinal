import {
  SET_CURRENT_USER, SET_ALL_USERS,
} from '../../redux/actions/types';
import isEmpty from '../../utils/validation/is-empty';
import Cookies from 'js-cookie';

const initialState = {
  isAuthenticated: Cookies.get('accessToken') != null,
  userInfo: [],
  allUsers: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        userInfo: action.payload
      };
    case SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload
      };
    default:
      return state;
  }
}

import {
  SET_CURRENT_USER, SET_ALL_USERS, SET_VIEWED_USER, SET_FOLLOWERS, SET_FOLLOWING
} from '../../redux/actions/types';
import isEmpty from '../../utils/validation/is-empty';
import Cookies from 'js-cookie';

const initialState = {
  isAuthenticated: Cookies.get('accessToken') != null,
  userInfo: [],
  allUsers: [],
  viewedUser: {},
  followers: [],
  following: [],
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
    case SET_VIEWED_USER:
      return {
        ...state,
        viewedUser: action.payload,
      };
    case SET_FOLLOWERS:
      return {
        ...state,
        followers: action.payload,
      };
    case SET_FOLLOWING:
      return {
        ...state,
        following: action.payload,
      };
    default:
      return state;
  }
}

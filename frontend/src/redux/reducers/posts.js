import { SET_VIEWED_USER_POSTS } from '../actions/types';

const initialState = {
  viewedUserPosts: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_VIEWED_USER_POSTS:
      return {
        ...state,
        viewedUserPosts: action.payload
      };
    default:
      return state;
  }
}

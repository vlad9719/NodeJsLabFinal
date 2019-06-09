import { SET_USER_FEED } from '../actions/types';

const initialState = {
  feedPosts: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_FEED:
      return {
        ...state,
        feedPosts: action.payload
      };
    default:
      return state;
  }
}

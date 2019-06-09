import { SET_SEARCH_RESULTS } from '../actions/types';

const initialState = {
  items: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}

import { START_LOADING, END_LOADING, ERROR } from 'redux/actions/types';

const reducer = (state = { loadings: 0 }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loadings: state.loadings + 1 };
    case END_LOADING:
      return { ...state, loadings: state.loadings - 1 };
    case ERROR:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;

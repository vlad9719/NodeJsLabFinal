import request from 'utils/request';
import { ERROR, SET_SEARCH_RESULTS } from './types';

export const search = (history, query) => {
  return dispatch => {
    return request('GET', `api/search?query=${query}`)
      .then(response => {
        const results = response;
        dispatch(setSearchResults(results));
        history.push(`/search/${query}`);
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: err.response.error
        });
      });
  };
};

const setSearchResults = results => {
  return {
    type: SET_SEARCH_RESULTS,
    payload: results,
  };
};

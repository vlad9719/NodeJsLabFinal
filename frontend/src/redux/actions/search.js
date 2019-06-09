import request from 'utils/request';
import { ERROR } from './types';

export const search = (history, name) => {
  return dispatch => {
    return request('GET', `api/search?name=${name}`)
      .then(response => {
        /*const products = [...response.data.products];
        dispatch(setProducts(products));
        history.push(`/search/${name}`);*/
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: err.response.error
        });
      });
  };
};

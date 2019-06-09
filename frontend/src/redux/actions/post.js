import request from 'utils/request';
import { ERROR } from './types';

export const addPost = (postData, photoFormData, userId) => {
  return dispatch => {
    return request('POST', `api/posts/new/${userId}`, postData)
      .then(post => {
        if (photoFormData) {
          return request('POST', `api/photos/upload/post/${post.id}`, photoFormData);
        }
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: err.response
        });
      });
  }
};

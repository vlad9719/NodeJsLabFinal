import request from 'utils/request';
import { ERROR } from './types';

export const addComment = (commentData, photoFormData, userId, postId) => {
  return dispatch => {
    return request('POST', `api/comments/new/${userId}/${postId}`, commentData)
      .then(comment => {
        if (photoFormData) {
          return request('POST', `api/photos/upload/comment/${comment.id}`, photoFormData);
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

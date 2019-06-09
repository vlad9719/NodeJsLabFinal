import request from 'utils/request';
import { ERROR } from './types';

export const uploadPhotoToPost = (photo, postId) => {
  return dispatch => {
    return request('POST', `photos/upload/post/${postId}`, photo)
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: err.response
        });
      });
  }
};

import request from 'utils/request';
import { ERROR, SET_VIEWED_USER_POSTS } from './types';

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

export const getViewedUserPosts = userId => {
  return dispatch => {
    return request('GET', `api/posts/${userId}`)
      .then(response => {
        const posts = response.posts;
        dispatch(setViewedUserPosts(posts));
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: err.response
        });
      });
  }
};

const setViewedUserPosts = posts => {
  return {
    type: SET_VIEWED_USER_POSTS,
    payload: posts,
  };
};

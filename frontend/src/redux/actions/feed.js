import request from 'utils/request';
import { SET_USER_FEED, ERROR } from './types';

export const getUserFeed = userId => {
  return dispatch => {
    return request('GET', `api/posts/feed/${userId}`)
      .then(response => {
        const feedPosts = [...response.feedPosts];
        dispatch(setUserFeed(feedPosts));
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: err.response
        });
      });
  }
};

export const setUserFeed = feedPosts => {
  return {
    type: SET_USER_FEED,
    payload: feedPosts
  };
};

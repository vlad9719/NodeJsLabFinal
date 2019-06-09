import request from 'utils/request';
import { ERROR, SET_ALL_USERS, SET_CURRENT_USER, SET_VIEWED_USER } from './types';
import { setToken, unsetToken } from '../../utils/request';

export const login = (history, userData) => {
  return async dispatch => {
    return request('POST', 'api/auth/login', userData)
      .then(response => {
        const token = response.token;
        setToken(token);
        const user = response.user;
        dispatch(setCurrentUser(user));
        history.push('/');
      })
      .catch(err => {
        const error = err.response.data.error;
        dispatch({
          type: ERROR,
          payload: { login: error }
        });
      });
  };
};

export const register = (history, userData) => {
  return dispatch => {
    return request('POST', 'api/users/register', userData)
      .then((response) => {
        const user = response.user;
        const token = response.token;

        setToken(token);
        dispatch(setCurrentUser(user));
        history.push('/');
      })
      .catch(err => {
        const errorsMessage = err.response.data.message;
        const errorsObject = {};
        errorsMessage.forEach(error => {
          errorsObject[error.property] = error.constraints[Object.keys(error.constraints)[0]];
        });

        dispatch({
          type: ERROR,
          payload: {
            register: errorsObject
          }
        });
      });
  };
};

export const me = () => {
  return dispatch => {
    return request('POST', 'api/auth/me')
      .then(response => {
        const user = response;
        dispatch(setCurrentUser(user));
      })
      .catch(err => {
        dispatch(setCurrentUser({}));
        dispatch({
          type: ERROR,
          payload: err
        });
      });
  };
};

export const getAllUsers = () => {
  return dispatch => {
    return request('GET', 'api/users/all')
      .then(response => {
        const users = response.users;
        dispatch(setAllUsers(users));
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: err
        });
      });
  }
};

export const getViewedUser = id => {
  return dispatch => {
    return request('GET', `api/users/${id}`)
      .then(response => {
        const user = response.user;
        dispatch(setViewedUser(user));
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: err
        });
      });
  }
}

export const setCurrentUser = decodedUser => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedUser
  };
};

export const setAllUsers = users => {
  return {
    type: SET_ALL_USERS,
    payload: users,
  }
};

export const setViewedUser = user => {
  return {
    type: SET_VIEWED_USER,
    payload: user,
  }
};

export const logoutUser = history => dispatch => {
  unsetToken();
  dispatch(setCurrentUser({}));
  history.push('/');
};

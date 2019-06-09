import axios from 'axios';

import querystring from 'querystring';
import { httpMethodsMap } from '../constants/common';
import appConfig from '../config';
import Cookies from 'js-cookie';

let isInitialized = false;
let token;

export function init(options) {
  let {
    reduxStore,
    initRequestCallback,
    finishRequestCallback,
    throwError
  } = options;

  isInitialized = true;

  token = Cookies.get('accessToken');

  let setLoadingState = () => reduxStore.dispatch(initRequestCallback());
  let offLoadingState = () => {
    let state = reduxStore.getState();
    let minLoadingsNumberForDelayEndLoading = 1;
    let endLoadingDelayMS = 700;

    // this statement is needed to prevent loader's interruption on API requests
    if (state.common.loadings <= minLoadingsNumberForDelayEndLoading) {
      return setTimeout(
        () => reduxStore.dispatch(finishRequestCallback()),
        endLoadingDelayMS
      );
    }

    return reduxStore.dispatch(finishRequestCallback());
  };

  let unsetLoadingState = requestResult => {
    offLoadingState();

    return requestResult;
  };

  let handleRequestError = error => Promise.reject(error);

  // options = initOptions;
  // second arguments here are used in error cases
  axios.interceptors.request.use(config => {
    setLoadingState();

    return config;
  }, unsetLoadingState);

  axios.interceptors.response.use(unsetLoadingState, handleRequestError);

  axios.dispatchError = error => reduxStore.dispatch(throwError(error));
}

export function unsetToken() {
  token = null;

  Cookies.remove('accessToken');
}

export function setToken(newToken) {
  token = newToken;

  Cookies.set('accessToken', newToken);
}

export default async function request(method, endpoint, data = {}) {
  if (!isInitialized) {
    throw new Error("Please, initialize request before it's usage");
  }

  let requestParams = {
    method,
    url: `${appConfig.apiUrl}/${endpoint}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  };

  if (method === httpMethodsMap.GET) {
    let stringifiedQuery = querystring.stringify(data);
    let queryString = stringifiedQuery ? `?${stringifiedQuery}` : '';

    requestParams.url += queryString;
  } else {
    requestParams.data = data;
  }

  return axios(requestParams)
    .then(res => {
      console.log('Request result', res.data);

      return res.data;
    })
    .catch(handleFailedRequest);
}

function handleFailedRequest(error) {
  console.log('REQUEST ERROR-----------');
  console.log(error.response || error.request || error);
  console.log('------------------------');

  throw error;
}

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { init as initRequest } from 'utils/request';
import { apiStartLoading, apiEndLoading, throwError } from './actions/common';
import rootReducer from './reducers';

const inititalState = {};
let isNotProduction = process.env.NODE_ENV !== 'production';
let isDevToolsEnabled = isNotProduction && window.devToolsExtension;

const store = createStore(
  rootReducer,
  inititalState,
  compose(
    applyMiddleware(thunk),
    isDevToolsEnabled ? window.devToolsExtension() : f => f
  )
);

const requestInitOptions = {
  reduxStore: store,
  initRequestCallback: apiStartLoading,
  finishRequestCallback: apiEndLoading,
  throwError
};

initRequest(requestInitOptions);

export default store;

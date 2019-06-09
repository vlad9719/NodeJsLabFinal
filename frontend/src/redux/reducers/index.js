import { combineReducers } from 'redux';
import commonReducer from './common';
import userReducer from './user';
import errorReducer from './error';
import feedReducer from './feed';
import postsReducer from './posts';
import searchReducer from './search';

export default combineReducers({
  common: commonReducer,
  user: userReducer,
  feed: feedReducer,
  errors: errorReducer,
  posts: postsReducer,
  search: searchReducer,
});

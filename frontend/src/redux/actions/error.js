import { UNSET_ERROR } from './types';

export const unsetErrors = () => dispatch => {
  dispatch({ type: UNSET_ERROR });
};

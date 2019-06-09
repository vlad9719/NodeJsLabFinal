import { ERROR, START_LOADING, END_LOADING } from './types';

export const apiStartLoading = () => ({ type: START_LOADING });

export const apiEndLoading = () => ({ type: END_LOADING });

export const throwError = errors => ({
  type: ERROR,
  payload: { errors }
});

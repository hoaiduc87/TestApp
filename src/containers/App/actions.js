import {
  SET_NOTIFY_MODAL,
  GET_RANDOMID_REQUEST,
  GET_RANDOMID_SUCCESS,
  GET_RANDOMID_FAILURE,
} from './constants';

export const setNotifyModal = (data) => ({
  type: SET_NOTIFY_MODAL, data
});

// GET GIFS RANDOMID ACTIONS
export const getRandomIdRequest = (params) => ({
  type: GET_RANDOMID_REQUEST, params
});

export const getRandomIdSuccess = (data) => ({
  type: GET_RANDOMID_SUCCESS, data
});

export const getRandomIdFailure = (error) => ({
  type: GET_RANDOMID_FAILURE, error
});
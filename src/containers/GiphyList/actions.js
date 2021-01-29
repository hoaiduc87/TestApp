import {
  GET_GIFS_TRENDING_REQUEST,
  GET_GIFS_TRENDING_SUCCESS,
  GET_GIFS_TRENDING_FAILURE,

  SET_GIFS_TRENDING_ANALYTICS,
} from './constants';
// GET GIFS TRENDING ACTIONS
export const getGifsTrendingRequest = (params) => ({
  type: GET_GIFS_TRENDING_REQUEST, params
});

export const getGifsTrendingSuccess = (data, isUpdate) => ({
  type: GET_GIFS_TRENDING_SUCCESS, data, isUpdate
});

export const getGifsTrendingFailure = (error) => ({
  type: GET_GIFS_TRENDING_FAILURE, error
});

export const setGifsTrendingAnalytics = (data, isUpdate) => ({
  type: SET_GIFS_TRENDING_ANALYTICS, data, isUpdate
});

import produce from 'immer';

import {
  GET_GIFS_TRENDING_REQUEST,
  GET_GIFS_TRENDING_SUCCESS,
  GET_GIFS_TRENDING_FAILURE,

  SET_GIFS_TRENDING_ANALYTICS,
} from './constants';

export const initialState = {
  trendingGif: {
    analytics: {},
    data: {},
    initloading: false,
    updateLoading: false,
    error: null,
  }
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_GIFS_TRENDING_REQUEST:
        if (action.params.isUpdate) {
          draft.trendingGif.updateLoading = true;
          draft.trendingGif.error = null;
        } else {
          draft.trendingGif.data = {};
          draft.trendingGif.initloading = true;
          draft.trendingGif.error = null;
        }
        break;

      case GET_GIFS_TRENDING_SUCCESS:
        if (action.isUpdate) {
          draft.trendingGif.data.data = [
            ...(draft.trendingGif.data.data || []),
            ...(action.data.data || [])
          ];
          draft.trendingGif.data.pagination = action.data.pagination;
          draft.trendingGif.updateLoading = false;
        } else {
          draft.trendingGif.data = action.data;
          draft.trendingGif.initloading = false;
        }
        break;

      case GET_GIFS_TRENDING_FAILURE:
        draft.trendingGif.error = action.error;
        draft.trendingGif.initloading = false;
        draft.trendingGif.updateLoading = false;
        break;

      case SET_GIFS_TRENDING_ANALYTICS:
        if (action.isUpdate) {
          draft.trendingGif.analytics = {
            ...draft.trendingGif.analytics,
            ...action.data
          };
        } else {
          draft.trendingGif.analytics = action.data;
        }
        break;

      default:
        break;
    }
  });

export default reducer;

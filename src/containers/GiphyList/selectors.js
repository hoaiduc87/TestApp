import { createSelector } from 'reselect';
import { initialState } from './reducer';

const giphyListState = state => state.giphyList || initialState;

const selectGifsTrendingData = () =>
  createSelector(
    giphyListState,
    substate => ({
      ...substate.trendingGif.data,
      data: (substate.trendingGif.data.data || []).map(gif => ({
        ...gif,
        analytics: substate.trendingGif.analytics[gif.id] || {}
      }))
    })
  );

const selectGifsTrendingInitLoading = () =>
  createSelector(
    giphyListState,
    substate => substate.trendingGif.initloading
  );

const selectGifsTrendingUpdateLoading = () =>
  createSelector(
    giphyListState,
    substate => substate.trendingGif.updateLoading
  );

const selectGifsTrendingError = () =>
  createSelector(
    giphyListState,
    substate => substate.trendingGif.error
  );

export {
  selectGifsTrendingData,
  selectGifsTrendingInitLoading,
  selectGifsTrendingUpdateLoading,
  selectGifsTrendingError,
};

import { takeLatest, put, call, all } from 'redux-saga/effects';
import { apiGet } from 'services';
import { GIPHY_KEY } from 'settings';
import { requestMiddleware } from 'services/middlewares';

import {
  GET_GIFS_TRENDING_PATH,
  GET_GIFS_TRENDING_REQUEST,
} from './constants';

import {
  getGifsTrendingSuccess,
  getGifsTrendingFailure,
  setGifsTrendingAnalytics,
} from './actions';

function* getGifsTrending({ params }) {
  const { isUpdate, ...remainParams } = params;
  try {
    const { data } = yield requestMiddleware(call(apiGet, {
      path: GET_GIFS_TRENDING_PATH,
      body: {
        api_key: GIPHY_KEY,
        ...remainParams,
      }
    }));

    const currentTimestamp = Date.now();
    const loadAnalyticsRequest = {};
    const clickAnalyticsRequest = {};
    const sentAnalyticsRequest = {};
    const analyticsResults = {};

    if (data && data.data) {
      data.data.forEach(gif => {
        const analytics = gif.analytics || {};
        if ((analytics.onload || {}).url) {
          loadAnalyticsRequest[gif.id] = requestMiddleware(call(apiGet, {
            url: analytics.onload.url,
            body: {
              api_key: GIPHY_KEY,
              random_id: params.random_id,
              ts: currentTimestamp,
            }
          }));
        }
        if ((analytics.onclick || {}).url) {
          clickAnalyticsRequest[gif.id] = requestMiddleware(call(apiGet, {
            url: analytics.onclick.url,
            body: {
              api_key: GIPHY_KEY,
              random_id: params.random_id,
              ts: currentTimestamp,
            }
          }));
        }
        if ((analytics.onsent || {}).url) {
          sentAnalyticsRequest[gif.id] = requestMiddleware(call(apiGet, {
            url: analytics.onsent.url,
            body: {
              api_key: GIPHY_KEY,
              random_id: params.random_id,
              ts: currentTimestamp,
            }
          }));
        }
      });

      const analyticsReponses = yield all([
        all(loadAnalyticsRequest),
        all(clickAnalyticsRequest),
        all(sentAnalyticsRequest),
      ]);

      data.data.forEach(gif => {
        analyticsResults[gif.id] = {
          load: analyticsReponses[0][gif.id].data || 0,
          click: analyticsReponses[1][gif.id].data || 0,
          sent: analyticsReponses[2][gif.id].data || 0,
        };
      });
    }

    yield put(setGifsTrendingAnalytics(analyticsResults, isUpdate));
    yield put(getGifsTrendingSuccess(data || {}, isUpdate));
  } catch (ex) {
    yield put(setGifsTrendingAnalytics({}));
    yield put(getGifsTrendingFailure(ex));
  }
}

export default function* giphyListSaga() {
  yield takeLatest(GET_GIFS_TRENDING_REQUEST, getGifsTrending);
}

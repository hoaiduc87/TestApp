import { takeLatest, put, call } from 'redux-saga/effects';
import { apiGet } from 'services';
import { GIPHY_KEY } from 'settings';
import { requestMiddleware } from 'services/middlewares';

import {
  GET_RANDOMID_PATH,
  GET_RANDOMID_REQUEST,
} from './constants';

import {
  getRandomIdSuccess,
  getRandomIdFailure,
} from './actions';

function* getRandomId({ params }) {
  try {
    const { data } = yield requestMiddleware(call(apiGet, {
      path: GET_RANDOMID_PATH,
      body: {
        api_key: GIPHY_KEY,
        ...params
      }
    }));

    yield put(getRandomIdSuccess((data || {}).data));
    // yield put(getRandomIdSuccess({random_id: 'e826c9fc5c929e0d6c6d423841a282aa'}));
  } catch (ex) {
    yield put(getRandomIdFailure(ex));
  }
}

export default function* giphyListSaga() {
  yield takeLatest(GET_RANDOMID_REQUEST, getRandomId);
}

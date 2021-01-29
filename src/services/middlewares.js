import { put } from 'redux-saga/effects';

import { setNotifyModal } from 'containers/App/actions'

export function* requestMiddleware(request) {
  try {
    const response = yield request;
    return response;
  } catch (ex) {
    yield put(setNotifyModal({
      title: 'Error',
      type: 'error',
      message: ex.message || 'An error has occured',
    }));
    throw ex;
  }
}

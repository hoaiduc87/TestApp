import appSaga from 'containers/App/saga';
import giphyListSaga from 'containers/GiphyList/saga';

export default function* rootSaga() {
  yield* appSaga();
  yield* giphyListSaga();
}

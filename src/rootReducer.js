import { combineReducers } from 'redux';
import appReducer from 'containers/App/reducer';
import giphyListReducer from 'containers/GiphyList/reducer';

const getRootReducer = () =>
  combineReducers({
    app: appReducer,
    giphyList: giphyListReducer,
  });

export default getRootReducer;
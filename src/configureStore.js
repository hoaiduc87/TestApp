import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import getRootReducer from './rootReducer'
import rootSaga from './rootSaga';

export default function configureStore(initialState) {
  let composeEnhancers = compose;
  // if (process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  //   composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  // }

  const rootReducer = getRootReducer();
  const sagaMiddleware = createSagaMiddleware();
  const middlewareEnhancer = applyMiddleware(sagaMiddleware);
  const enhancers = [middlewareEnhancer];

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(...enhancers)
  );

  sagaMiddleware.run(rootSaga);

  // if (process.env.NODE_ENV !== 'production' && module.hot) {
    // module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer))
  // }

  return store;
}
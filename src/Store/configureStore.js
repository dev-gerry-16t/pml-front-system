import { applyMiddleware, compose, createStore } from "redux";
import storageSession from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "react-router-redux";
// TO DO: import immutableTransform from 'redux-persist-transform-immutable';
import rootReducer from "./reducers";
import rootSaga from "./RootSaga";

export const history = createBrowserHistory();
export const sagaMiddleware = createSagaMiddleware();

export default function configureStore(preloadedState) {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== "production" &&
    typeof window === "object" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;
  /* eslint-enable */

  const persistConfig = {
    // TO DO:
    // transforms: [immutableTransform()],
    key: "root",
    storage: storageSession,
    blacklist: [],
  };

  const rootReducerMiddleware = (state, action) =>
    rootReducer(state, action, persistConfig);

  const persistedReducer = persistReducer(persistConfig, rootReducerMiddleware);

  const store = createStore(
    persistedReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(sagaMiddleware, routerMiddleware(history), thunk)
    )
  );

  store.runSaga = sagaMiddleware.run(rootSaga);

  const persistor = persistStore(store, {});

  return { store, persistor };
}

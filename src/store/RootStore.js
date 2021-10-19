import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/RootReducer";

import createSagaMiddleware from "redux-saga";

import { composeWithDevTools } from "redux-devtools-extension";
import rootSaga from "saga/RootSaga";

const sagaMiddleware = createSagaMiddleware();

const middlewareEnhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));

const rootStore = createStore(rootReducer, middlewareEnhancer);

sagaMiddleware.run(rootSaga);

export { rootStore };

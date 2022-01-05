import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import AuthReducer from "./Auth/reducer";
import AppReducer from "./app/reducer";

const rootReducer = combineReducers({ auth: AuthReducer, app: AppReducer });

const networkRequestsMiddleware = (store) => (next) => (action) => {
  if (typeof action === "function") {
    const func = action;
    return func(store.dispatch, store.getState);
  } else {
    return next(action);
  }
};

let enhancers = compose;

if (process.env.NODE_ENV !== "production") {
  enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
}

const enhancer = enhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);


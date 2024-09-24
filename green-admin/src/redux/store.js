import reducer from "./reducer";
import { createStore, applyMiddleware, compose } from "redux";

// Redux Thunk is a middleware that lets you call action creators that return a function instead of an action object.
// That function receives the store's dispatch method, which is then used to dispatch regular synchronous actions inside the function's body once the asynchronous operations have completed.
import thunk from "redux-thunk";

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export default store;

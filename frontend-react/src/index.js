import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
// import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

function configureStore() {
  return createStore(rootReducer, applyMiddleware(thunk));
}
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();

import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import "semantic-ui-css/semantic.min.css";
import App from "./components/App";
import reducers from "./reducers";

const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

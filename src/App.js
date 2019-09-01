import React from "react";
import Home from "./components/Home";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import postReducer from "./store/reducers/post";

const rootReducer = combineReducers({
  postReducer: postReducer
});
const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ProductProvider from './providers/ProductProvider';
import reducer from './reducers';
import { App } from "./App";
import initialState from './initialState';

const store = createStore(reducer, initialState);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ProductProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ProductProvider>
);

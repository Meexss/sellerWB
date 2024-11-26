import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HashRouter } from "react-router-dom"; // Изменено на HashRouter
import { Provider } from "react-redux";
import store from "./pages/store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter> {/* Используется HashRouter */}
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
);

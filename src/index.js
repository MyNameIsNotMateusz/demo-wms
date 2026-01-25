import App from "./App";
import ReactDOM from "react-dom/client";
import React from "react";
import { Provider } from "react-redux";
import { AuthProvider } from "./auth/AuthProvider";
import store from "./store/index"
import { GlobalStyles } from "./styles/GlobalStyles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
);

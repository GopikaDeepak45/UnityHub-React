import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.ts";
// import AppRoutes from "./AppRoutes.tsx";
import App from "./App.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App />
        <Toaster />
        {/* <AppRoutes/> */}
      </Router>
    </React.StrictMode>

  </Provider>
);

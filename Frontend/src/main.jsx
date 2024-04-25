import React from "react";
import ReactDOM from "react-dom/client";
import "./sytle.css";
import { RouterProvider } from "react-router-dom";
import Router from "./Router.jsx";
import { AuthProvider } from "./Component/AuthContext.jsx";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={Router}>
        <App />
      </RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);

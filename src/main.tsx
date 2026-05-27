import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import { SceneProvider } from "./context/SceneContext";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <SceneProvider>
      <App />
    </SceneProvider>
  </React.StrictMode>
);
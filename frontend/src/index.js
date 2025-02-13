import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";

const root = ReactDOM.createRoot(document.getElementById("root"));

export const userContext = createContext(null);

root.render(
  <userContext.Provider value={{
    user: new UserStore(),
    device: new DeviceStore()
  }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </userContext.Provider>
);

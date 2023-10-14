import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "./styles/loader.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);

// const rootNode = document.getElementById("root");
// const root = ReactDOM.hydrateRoot(
//   rootNode,
//   <Provider store={store}>
//     <BrowserRouter>
//       <React.StrictMode>
//         <App />
//       </React.StrictMode>
//     </BrowserRouter>
//   </Provider>
// );

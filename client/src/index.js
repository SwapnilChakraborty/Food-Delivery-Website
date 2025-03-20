import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

// Lazy-load the App component
const App = lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading persisted state...</div>} persistor={persistor}>
        <Suspense fallback={<div>Loading App...</div>}>
          <App />
        </Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

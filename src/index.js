import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ContextProvider from "./context/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider";
import { Provider } from "react-redux";
import { store } from "./store";
import global_en from "./translations/en";
import global_hi from "./translations/hi";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      global: global_en,
    },
    hi: {
      global: global_hi,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <I18nextProvider i18n={i18next}>
    <React.StrictMode>
      <BrowserRouter>
        <ContextProvider>
          <ThemeProvider>
            <Provider store={store}>
              <App />
            </Provider>
          </ThemeProvider>
        </ContextProvider>
      </BrowserRouter>
    </React.StrictMode>
  </I18nextProvider>
);

reportWebVitals();

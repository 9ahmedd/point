import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import i18n from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import global_en from "./translation/locales/en.json";
import global_ar from "./translation/locales/ar.json";
import { Provider } from 'react-redux';
import store from './Api/slice/store.js';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        global: global_en,
        // Add more English translations
      },
    },
    ar: {
      translation: {
        global: global_ar,
        // Add more Arabic translations
      },
    },
  },
  lng: "ar", // Default language
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  </React.StrictMode>
);

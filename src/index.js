import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import ru from './locales/ru';
import en from './locales/en';
import './index.scss';
import 'macro-css';
import App from './App';

const init = async () => {
  const i18nextInstance = i18n.createInstance();
  await i18nextInstance.use(initReactI18next).init({
    resources: { ru, en },
    lng: 'ru',
    interpolation: { escapeValue: false},
  })
  return i18nextInstance;
}

const i18instance = init();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <I18nextProvider i18={i18instance}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </I18nextProvider>
);

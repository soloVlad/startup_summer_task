import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import { MantineProvider } from '@mantine/core';

import './index.scss';
import theme from './index.theme';
import { VacanciesProvider } from './contexts/vacancies.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <VacanciesProvider>
        <MantineProvider
          withNormalizeCSS
          withGlobalStyles
          theme={theme}
        >
          <App />
        </MantineProvider>
      </VacanciesProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

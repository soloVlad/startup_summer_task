import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';

import { MantineProvider } from '@mantine/core';

import './index.scss';
import theme from './index.theme';
import { VacanciesProvider } from './contexts/vacancies.context';
import { AuthProvider } from './contexts/auth.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <AuthProvider>
      <VacanciesProvider>
        <MantineProvider
          withNormalizeCSS
          withGlobalStyles
          theme={theme}
        >
          <App />
        </MantineProvider>
      </VacanciesProvider>
    </AuthProvider>
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

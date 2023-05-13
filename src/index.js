import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import { MantineProvider, rem } from '@mantine/core';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{
          defaultRadius: rem(8),
          fontFamily: 'Inter, sans-serif',
          fontSizes: {
            md: rem(14),
          },
          spacing: {
            md: rem(8),
            lg: rem(12),
          },
          white: '#FFF',
          black: '#232134',
          colors: {
            'bright-blue': ['#DEECFF', '#C9E0FF', '#B7D6FF', '#92C1FF', '#5E96FC', '#3B7CD3', '#3B7CD3', '#3B7CD3', '#3B7CD3', '#3B7CD3'],
          },
          primaryColor: 'bright-blue',
          headings: {
            fontWeight: 600,
            fontFamily: 'Inter, sans-serif',

            sizes: {
              h1: { fontSize: rem(24), lineHeight: rem(36) },
              h2: { fontSize: rem(20), lineHeight: rem(24) },
              h3: { fontSize: rem(16), lineHeight: rem(20) },
              h4: { fontWeight: 400, fontSize: rem(16), lineHeight: rem(19) },
            }
          },
          components: {
            Container: {
              defaultProps: {
                sizes: {
                  md: 1148,
                }
              }
            }
          },
          other: {
            cardRadius: rem(12),
            cardPadding: rem(24),
            cardMaxWidth: rem(773),
          }
        }}
      >
        <App />
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

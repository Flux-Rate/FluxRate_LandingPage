import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: React.createElement(App),
    },
  ],
  {
    basename: '/',
  },
);

export default router;

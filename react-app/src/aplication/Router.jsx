import React from 'react';
import { Navigate, createBrowserRouter} from 'react-router-dom';
import App from '../App.js'
import '../index.css'

export const Router = createBrowserRouter([
  {
    path:'/',
    element: <App />
  },
  {
    path:'*',
    element: <Navigate to="/" />
  }
])
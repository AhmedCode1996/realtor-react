import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ListingContext } from './context';
import HeaderLayout from './components/HeaderLayout';
import {
  Home,
  Profile,
  Signin,
  Signup,
  Offers,
  ForgotPassword,
  CreateListing,
} from './pages/index';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HeaderLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'sign-in',
        element: <Signin />,
      },
      {
        path: 'sign-up',
        element: <Signup />,
      },
      {
        path: 'offers',
        element: <Offers />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'create-listing',
        element: <CreateListing />,
      },
    ],
  },
]);
const rootNode = document.getElementById('root');
const root = createRoot(rootNode);
root.render(
  <ListingContext>
    <RouterProvider router={router} />
    <ToastContainer />
  </ListingContext>
);

import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
  Home,
  Profile,
  Signin,
  Signup,
  Offers,
  ForgotPassword,
} from "./pages/index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "sign-in",
    element: <Signin />,
  },
  {
    path: "sign-up",
    element: <Signup />,
  },
  {
    path: "offers",
    element: <Offers />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
]);
const rootNode = document.getElementById("root");
const root = createRoot(rootNode);
root.render(<RouterProvider router={router} />);

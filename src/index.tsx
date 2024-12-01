import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from "react-router";
import { HomePage } from "./Pages/Homepage";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";

export const route = createBrowserRouter([
  {
      path: "/",
      element: <Login/>,
  },
  {
      path: "/homepage",
      element: <HomePage/>,
  },
  {
      path: "/register",
      element: <Register/>,
  },

])
const user = {
  name:"Jesus",
  logined:true,
  rol:"client"
};
localStorage.user = JSON.stringify(user);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
   <RouterProvider router={route}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

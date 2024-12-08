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
import { Admiin } from './components/Admin';
import { Header } from './components/Header';

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
  {
    path: "/admin",
    element: <Admiin/>,
},

])
const user = localStorage.user ? JSON.parse(localStorage.user) : undefined;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <>
      {
          user?.logined == true && (
            <Header />
          )
      } 
   <RouterProvider router={route}/>
    </>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

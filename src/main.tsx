import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Demo from "./LoginPage.tsx";
import TreePage from "./TreePage.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterForm from "./RegisterForm.tsx";
import RegiterRole from "./RegiterRole.tsx";
import AvailableEmployees from "./AvailableEmployees.tsx";
import AddRole from "./AddRole.tsx";
import AllEmployees from "./AllEmployees.tsx";
import { Provider } from "react-redux";
import {Store} from './Store.ts'


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={Store}>
  {/* <React.StrictMode> */}

  <BrowserRouter>
    <Routes>
      <Route path="/tree" element={<TreePage />} />
      <Route path="/role">
        <Route path="/role/register" element={<RegiterRole />} />
        <Route path="/role/add" element={<AddRole />} />
      </Route>
      <Route path="/employee">
        <Route path="/employee/:id/:value" element={<AvailableEmployees />} />
        <Route path="/employee/All" element={<AllEmployees />} />
      </Route>
    </Routes>
  </BrowserRouter>
  {/* </React.StrictMode> */}
  </Provider>
);

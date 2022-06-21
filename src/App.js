import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loadable from "react-loadable";
import Login from "./containers/Login/login";
import DefaultLayout from "./containers/Layout/layout";
import ActivateAccount from "./containers/Register/activateAccount";
import Auth from "./containers/Auth/Auth";

const loading = () => (
  <div className="">
    <div className="" />
  </div>
);

const SignIn = Loadable({
  loader: () => import("./containers/Register/signIn"),
  loading,
});

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/activate-account" element={<ActivateAccount />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/websystem/*" element={<DefaultLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

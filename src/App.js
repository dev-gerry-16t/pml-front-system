import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loadable from "react-loadable";
import { callGlobalActionApi } from "./utils/actions/actions";
import { API_CONSTANTS } from "./utils/constants/apiConstants";
import "./App.css";
import "./global-styles.scss";
import LoaderApp from "./components/loaderApp";

const loading = () => <LoaderApp />;

const SignIn = Loadable({
  loader: () => import("./containers/Register/signIn"),
  loading,
});

const Login = Loadable({
  loader: () => import("./containers/Login/login"),
  loading,
});

const ActivateAccount = Loadable({
  loader: () => import("./containers/Register/activateAccount"),
  loading,
});

const Auth = Loadable({
  loader: () => import("./containers/Auth/Auth"),
  loading,
});

const DefaultLayout = Loadable({
  loader: () => import("./containers/Layout/layout"),
  loading,
});

const TestScreen = Loadable({
  loader: () => import("./containers/test/test"),
  loading,
});

const App = ({ callGlobalActionApi, dataProfile }) => {
  // const handlerGetAllLabels = async () => {
  //   try {
  //     const response = await callGlobalActionApi(
  //       {},
  //       null,
  //       API_CONSTANTS.SYSTEM_CONFIGURATION.GET_ALL_LABELS,
  //       "POST",
  //       false
  //     );
  //     console.log("response", response);
  //     const responseResult = response.response;
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  useEffect(() => {
    //handlerGetAllLabels();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/activate-account" element={<ActivateAccount />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/logout" element={<Auth />} />
        <Route path="/testScreen" element={<TestScreen />} />
        
        <Route path="/websystem/*" element={<DefaultLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant, method, token) =>
    dispatch(callGlobalActionApi(data, id, constant, method, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

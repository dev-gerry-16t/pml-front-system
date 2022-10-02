import React, { useEffect } from "react";
import { connect } from "react-redux";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import { callGlobalActionApi } from "../../utils/actions/actions";
import LoaderApp from "../../components/loaderApp";
import { useNavigate } from "react-router-dom";
import FrontFunctions from "../../utils/actions/frontFunctions";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import { setDataUserProfile } from "../../utils/dispatchs/userProfileDispatch";

const Auth = (props) => {
  const { dataProfile, callGlobalActionApi, purgeStore, setDataUserProfile } =
    props;
  const navigate = useNavigate();
  const frontFunctions = new FrontFunctions();

  const handlerSetLoginHistory = async (data, id) => {
    const { idSystemUser, tokenApp, infoNavigator } = data;
    try {
      await callGlobalActionApi(
        {
          idSystemUser,
          token: tokenApp,
          refreshToken: null,
          info: JSON.stringify(infoNavigator),
          language: "es-ES",
        },
        id,
        API_CONSTANTS.LOG_IN.SET_LOGIN_HISTORY,
        "PUT",
        false
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallGetAllUserProfile = async (data) => {
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser: data.idSystemUser,
          idLoginHistory: data.idLoginHistory,
        },
        null,
        API_CONSTANTS.LOG_IN.GET_USER_PROFILE,
        "POST",
        true
      );
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : {};
      await setDataUserProfile({
        ...dataProfile,
        idSystemUser: responseResult.idSystemUser,
        darkTheme: responseResult.darkTheme,
        givenName: responseResult.givenName,
        path: responseResult.path,
        language: responseResult.language,
      });
      if (isNil(responseResult.path) === false) {
        navigate(responseResult.path);
      } else {
        navigate("/websystem");
      }
    } catch (error) {
      navigate("/logout");
    }
  };

  const handlerAsyncCallApis = async () => {
    const infoNavigator = frontFunctions.handlerDetectDevice();

    if (isNil(dataProfile) === false) {
      await handlerSetLoginHistory(
        {
          idSystemUser: dataProfile.idSystemUser,
          tokenApp: dataProfile.token,
          infoNavigator,
        },
        dataProfile.idLoginHistory
      );
      await handlerCallGetAllUserProfile({
        idSystemUser: dataProfile.idSystemUser,
        idLoginHistory: dataProfile.idLoginHistory,
      });
    } else {
      navigate("/login");
    }
  };

  const handlerFinishSession = async () => {
    await purgeStore();
    await sessionStorage.clear();
    await localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    if (window.location.pathname === "/auth") {
      handlerAsyncCallApis();
    } else if (window.location.pathname === "/logout") {
      handlerFinishSession();
    }
  }, []);

  return <LoaderApp />;
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
  purgeStore: () => dispatch({ type: "PURGE" }),
  setDataUserProfile: (data) => dispatch(setDataUserProfile(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

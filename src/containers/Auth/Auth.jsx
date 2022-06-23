import React, { useEffect } from "react";
import { connect } from "react-redux";
import isNil from "lodash/lodash";
import { callGlobalActionApi } from "../../utils/actions/actions";
import LoaderApp from "../../components/loaderApp";
import { useNavigate } from "react-router-dom";
import FrontFunctions from "../../utils/actions/frontFunctions";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";

const Auth = (props) => {
  const { dataProfile, callGlobalActionApi, purgeStore } = props;
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
      throw error;
    }
  };

  const handlerCallGetAllUserProfile = async () => {
    try {
      //   const response = await callGetAllUserProfile({
      //     idSystemUser: dataProfile.dataProfile.idSystemUser,
      //     token: dataProfile.dataProfile.token,
      //   });
      //   const responseResult =
      //     isNil(response) === false &&
      //     isNil(response.response) === false &&
      //     isEmpty(response.response) === false
      //       ? response.response
      //       : {};
      //   const idSystemUser =
      //     isEmpty(responseResult) === false &&
      //     isNil(responseResult.idSystemUser) === false
      //       ? responseResult.idSystemUser
      //       : null;
      //   const idLoginHistory =
      //     isEmpty(responseResult) === false &&
      //     isNil(responseResult.idLoginHistory) === false
      //       ? responseResult.idLoginHistory
      //       : null;
      //   const responseMenu = await callGetAllMenuProfile({
      //     idSystemUser,
      //     idLoginHistory,
      //   });
      //   const responseResultMenu =
      //     isNil(responseMenu) === false &&
      //     isNil(responseMenu.response) === false &&
      //     isEmpty(responseMenu.response) === false
      //       ? responseMenu.response
      //       : [];
      //   await setDataUserMenu(responseResultMenu);
      //   await setDataUserProfile({
      //     ...dataProfile.dataProfile,
      //     ...responseResult,
      //   });
      //   history.push(
      //     isEmpty(responseResult) === false &&
      //       isNil(responseResult.path) === false
      //       ? responseResult.path
      //       : "/websystem"
      //   );
      navigate("/websystem/home");
    } catch (error) {}
  };

  const handlerAsyncCallApis = async () => {
    const infoNavigator = frontFunctions.handlerDetectDevice();
    console.log("dataProfile", dataProfile);
    if (isNil(dataProfile) === false) {
      await handlerSetLoginHistory(
        {
          idSystemUser: dataProfile.idSystemUser,
          tokenApp: dataProfile.token,
          infoNavigator,
        },
        dataProfile.idLoginHistory
      );
      await handlerCallGetAllUserProfile();
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

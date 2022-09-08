import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { useSearchParams, useNavigate } from "react-router-dom";
import { callGlobalActionApi } from "../../utils/actions/actions";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import "./css/styleRegister.scss";
import LoaderApp from "../../components/loaderApp";
import { setDataUserProfile } from "../../utils/dispatchs/userProfileDispatch";
import ComponentSuccess from "../../components/componentSuccess";
import FrontFunctions from "../../utils/actions/frontFunctions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";

const ActivateAccount = (props) => {
  const { callGlobalActionApi, setDataUserProfile } = props;
  const [searchParams] = useSearchParams();
  const { token } = Object.fromEntries([...searchParams]);
  const [loadedScreen, setLoadedScreen] = useState(true);
  const [validateLink, setValidateLink] = useState(false);
  const [dataVerify, setDataVerify] = useState({});
  const frontFunctions = new FrontFunctions();

  let component = <LoaderApp />;

  const navigate = useNavigate();

  const handlerVerifyEnroll = async () => {
    try {
      setLoadedScreen(true);
      const response = await callGlobalActionApi(
        { tokenEnroll: token, language: "es-ES",
        location: window.location.href,      
      },
        null,
        API_CONSTANTS.SIGN_IN.VERIFY_ENROLL,
        "POST",
        false
      );
      const responseResult =
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : {};
      setDataVerify(responseResult);
      setValidateLink(true);
      setLoadedScreen(false);
    } catch (error) {
      setValidateLink(false);
      setLoadedScreen(false);
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerOnClickStart = async () => {
    try {
      setLoadedScreen(true);
      if (
        isNil(dataVerify.idLoginHistory) === false &&
        dataVerify.canLogin === true
      ) {
        await setDataUserProfile({
          idLoginHistory: dataVerify.idLoginHistory,
          idSystemUser: dataVerify.idSystemUser,
          token: dataVerify.tokenApp,
        });
        setLoadedScreen(false);

        navigate("/auth");
      } else {
        setLoadedScreen(false);

        navigate("/login");
      }
    } catch (error) {
      setLoadedScreen(false);
    }
  };

  useEffect(() => {
    if (isNil(token) === false) {
      handlerVerifyEnroll();
    }
  }, []);

  if (loadedScreen === true) {
    component = <LoaderApp />;
  } else if (loadedScreen === false && validateLink === true) {
    component = (
      <ComponentSuccess
        greet="¡Felicidades!"
        subGreet=""
        status="Tu cuenta se ha activado correctamente"
        labelButton="Iniciar"
        onClick={handlerOnClickStart}
      />
    );
  } else if (loadedScreen === false && validateLink === false) {
    component = (
      <ComponentSuccess
        greet="¡Uups!"
        subGreet=""
        status="Ocurrió un error al validar tu cuenta"
        labelButton="Continuar"
        onClick={() => {
          navigate("/login");
        }}
      />
    );
  }

  return component;
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
  setDataUserProfile: (data) => dispatch(setDataUserProfile(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivateAccount);

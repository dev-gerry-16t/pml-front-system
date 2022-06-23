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

const ActivateAccount = (props) => {
  const { callGlobalActionApi, setDataUserProfile } = props;
  const [searchParams] = useSearchParams();
  const { token } = Object.fromEntries([...searchParams]);
  const [loadedScreen, setLoadedScreen] = useState(true);
  const [validateLink, setValidateLink] = useState(false);
  const [dataVerify, setDataVerify] = useState({});

  const navigate = useNavigate();

  const handlerVerifyEnroll = async () => {
    try {
      const response = await callGlobalActionApi(
        { tokenEnroll: token, language: "es-ES" },
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
    }
  };

  const handlerOnClickStart = async () => {
    try {
      if (
        isNil(dataVerify.idLoginHistory) === false &&
        dataVerify.canLogin === true
      ) {
        await setDataUserProfile({
          idLoginHistory: dataVerify.idLoginHistory,
          idSystemUser: dataVerify.idSystemUser,
          token: dataVerify.tokenApp,
        });
        navigate("/auth");
      } else {
        navigate("/login");
      }
    } catch (error) {}
  };

  useEffect(() => {
    handlerVerifyEnroll();
  }, []);

  return loadedScreen === false ? (
    <div className="activate-container">
      {validateLink === true ? (
        <div>
          <h1>Cuenta activada</h1>
          <button onClick={handlerOnClickStart}>Comenzar</button>
        </div>
      ) : (
        <div>
          <h1>Ocurrió un error al validar tu cuenta</h1>
        </div>
      )}
    </div>
  ) : (
    <LoaderApp />
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
  setDataUserProfile: (data) => dispatch(setDataUserProfile(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivateAccount);

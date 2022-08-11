import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { connect } from "react-redux";
import ComponentPresentation from "../../components/componentPresentation";
import CustomButton from "../../components/customButton";
import CustomForm from "../../components/customForm";
import CustomInput from "../../components/customInput";
import { useOnChangeInput } from "../../hooks";
import { callGlobalActionApi } from "../../utils/actions/actions";
import FrontFunctions from "../../utils/actions/frontFunctions";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import { setDataUserProfile } from "../../utils/dispatchs/userProfileDispatch";
import LoaderApp from "../../components/loaderApp";

const RecoveryPassword = (props) => {
  let component = <LoaderApp />;
  const { callGlobalActionApi, setDataUserProfile } = props;
  const initialState = {
    password: "",
    confirmPassword: "",
  };
  const navigate = useNavigate();
  const [dataForm, handlerOnChange, setDataForm] =
    useOnChangeInput(initialState);
  const [idPasswordRecovery, setIdPasswordRecovery] = useState(null);
  const [loadedScreen, setLoadedScreen] = useState(true);
  const [validateLink, setValidateLink] = useState(false);
  const [searchParams] = useSearchParams();
  const { token = null } = Object.fromEntries([...searchParams]);
  const frontFunctions = new FrontFunctions();

  const handlerLoginWithToken = async (key) => {
    try {
      const response = await callGlobalActionApi(
        { ...dataForm, language: "es-ES" },
        key,
        API_CONSTANTS.LOG_IN.VERIFY_LOGIN_WITH_TOKEN,
        "GET",
        false
      );
      const responseResult =
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : {};
      setIdPasswordRecovery(responseResult.idPasswordRecovery);
      setLoadedScreen(false);
      setValidateLink(true);
    } catch (error) {
      setLoadedScreen(false);
      setValidateLink(false);
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.WARNING
      );
    }
  };

  const handlerVerifyPasswordRecovery = async (key) => {
    const infoNavigator = frontFunctions.handlerDetectDevice();
    try {
      if (dataForm.password === dataForm.confirmPassword) {
        setLoadedScreen(true);
        const response = await callGlobalActionApi(
          {
            password: dataForm.password,
            info: JSON.stringify(infoNavigator),
            language: "es-ES",
          },
          idPasswordRecovery,
          API_CONSTANTS.SYSTEM_CONFIGURATION.VERIFY_PASSWORD_RECOVERY,
          "PUT",
          false
        );
        const responseResult =
          isNil(response.response) === false &&
          isEmpty(response.response) === false
            ? response.response
            : {};
        await setDataUserProfile({
          idSystemUser: responseResult.idSystemUser,
          idLoginHistory: responseResult.idLoginHistory,
          token: responseResult.tokenApp,
        });
        navigate("/auth");
        setLoadedScreen(false);
      } else {
        setDataForm(initialState);
        frontFunctions.showMessageStatusApi(
          "Las contraseñas no coinciden",
          GLOBAL_CONSTANTS.STATUS_API.WARNING
        );
      }
    } catch (error) {
      setLoadedScreen(false);
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.WARNING
      );
    }
  };

  useEffect(() => {
    if (isNil(token) === false) {
      handlerLoginWithToken(token);
    } else {
      setLoadedScreen(false);
      setValidateLink(false);
    }
  }, []);

  if (loadedScreen === true) {
    component = <LoaderApp />;
  } else if (loadedScreen === false && validateLink === true) {
    component = (
      <ComponentPresentation
        greet="¡Bienvenido!"
        subGreet="Cambio de contraseña"
      >
        <CustomForm
          onSubmit={(e) => {
            handlerVerifyPasswordRecovery();
          }}
        >
          <div className="vertical-form">
            <span className="indication">Ingresa tu contraseña nueva</span>
            <CustomInput
              value={dataForm.password}
              onChange={handlerOnChange}
              name="password"
              placeholder="Contraseña"
              type="password"
              isRequired
              pattern="^(?=.*[A-Za-z0-9]).{8,12}$"
            />
            <CustomInput
              value={dataForm.confirmPassword}
              onChange={handlerOnChange}
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              type="password"
              isRequired
            />
            <div className="format-required-pass">
              La contraseña debe contener:
              <p>
                <ul>
                  <li>Mínimo 8 caracteres</li>
                  <li>Números y letras</li>
                </ul>
              </p>
            </div>
          </div>
          <div className="display-right"></div>
          <div>
            <CustomButton
              type="submit"
              formatType="secondary"
              text="Recuperar"
              style={{
                padding: "0.6em 0px",
                width: "100%",
              }}
            />
          </div>
          {/* <div className="option-user">
              ¿Aún no tienes cuenta? <span>Regístrate</span>
            </div> */}
        </CustomForm>
      </ComponentPresentation>
    );
  } else if (loadedScreen === false && validateLink === false) {
    component = (
      <ComponentPresentation greet="¡Bienvenido!" subGreet="Link no valido" />
    );
  }

  return component;
};

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant, method, token) =>
    dispatch(callGlobalActionApi(data, id, constant, method, token)),
  setDataUserProfile: (data) => dispatch(setDataUserProfile(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecoveryPassword);

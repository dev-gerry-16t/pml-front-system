import React, { useState } from "react";
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
import LoaderProcess from "../../components/loaderProcess";
import LoaderApp from "../../components/loaderApp";
import ComponentSendEmail from "../../components/componentSendEmail";

const RecoveryAccount = (props) => {
  let component = <LoaderApp />;
  const { callGlobalActionApi } = props;

  const initialState = {
    username: "",
  };
  const [dataForm, handlerOnChange] = useOnChangeInput(initialState);
  const [loadedScreen, setLoadedScreen] = useState(false);
  const [sendActivateAccount, setSendActivateAccount] = useState(false);

  const frontFunctions = new FrontFunctions();

  const handlerRequestPassword = async () => {
    const infoNavigator = frontFunctions.handlerDetectDevice();

    try {
      setLoadedScreen(true);
      await callGlobalActionApi(
        { ...dataForm, info: JSON.stringify(infoNavigator), language: "es-ES" },
        null,
        API_CONSTANTS.SYSTEM_CONFIGURATION.REQUEST_PASSWORD_RECOVERY,
        "POST",
        false
      );
      setLoadedScreen(false);
      setSendActivateAccount(true);
    } catch (error) {
      setLoadedScreen(false);

      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.WARNING
      );
    }
  };

  if (sendActivateAccount === false) {
    return (
      <ComponentPresentation
        greet="¡Bienvenido!"
        subGreet="Recuperar contraseña"
      >
        <CustomForm
          onSubmit={(e) => {
            handlerRequestPassword();
          }}
        >
          {loadedScreen === true && <LoaderProcess />}
          <div className="vertical-form">
            <span className="indication">
              Ingresa el correo de tu cuenta para recuperar tu contraseña
            </span>
            <CustomInput
              value={dataForm.username}
              onChange={handlerOnChange}
              name="username"
              placeholder="Correo"
              type="email"
              isRequired
            />
          </div>
          <div className="display-right" style={{ margin: "3em 0px" }}></div>
          <div>
            <CustomButton
              type="submit"
              formatType="secondary"
              text="Continuar"
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
  } else if (sendActivateAccount === true) {
    component = (
      <ComponentSendEmail
        email={dataForm.username}
        onClick={() => {
          handlerRequestPassword();
        }}
        text="para recuperar tu contraseña"
      />
    );
  }

  return component;
};

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant, method, token) =>
    dispatch(callGlobalActionApi(data, id, constant, method, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecoveryAccount);

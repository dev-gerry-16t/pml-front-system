import React from "react";
import { useNavigate } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { connect } from "react-redux";
import { callGlobalActionApi } from "../../utils/actions/actions";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import { setDataUserProfile } from "../../utils/dispatchs/userProfileDispatch";
import "./css/styleLogin.scss";
import { useOnChangeInput } from "../../hooks";
import CustomForm from "../../components/customForm";
import CustomInput from "../../components/customInput";
import CustomButton from "../../components/customButton";
import ComponentPresentation from "../../components/componentPresentation";

const Login = (props) => {
  const { callGlobalActionApi, setDataUserProfile, dataProfile } = props;
  const initialState = {
    username: "",
    password: "",
  };
  const [dataForm, handlerOnChange] = useOnChangeInput(initialState);

  const navigate = useNavigate();

  const handlerVerifyLogin = async () => {
    try {
      const response = await callGlobalActionApi(
        { ...dataForm, language: "es-ES" },
        null,
        API_CONSTANTS.LOG_IN.VERIFY_LOGIN,
        "POST",
        false
      );
      const responseResult =
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : {};
      await setDataUserProfile({
        ...dataProfile,
        idSystemUser: responseResult.idSystemUser,
        idLoginHistory: responseResult.idLoginHistory,
        token: responseResult.tokenApp,
      });
      navigate("/auth");
    } catch (error) {}
  };

  return (
    <ComponentPresentation greet="¡Bienvenido!" subGreet="Iniciar Sesión">
      <CustomForm
        onSubmit={(e) => {
          handlerVerifyLogin();
        }}
      >
        <div className="vertical-form">
          <CustomInput
            value={dataForm.username}
            onChange={handlerOnChange}
            name="username"
            placeholder="Correo"
            type="email"
            isRequired
          />
          <CustomInput
            value={dataForm.password}
            onChange={handlerOnChange}
            name="password"
            placeholder="Contraseña"
            type="password"
            isRequired
          />
        </div>
        <div className="display-right">
          <span>Olvide mi contraseña</span>
        </div>
        <div>
          <CustomButton
            type="submit"
            formatType="secondary"
            text="Iniciar sesión"
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);

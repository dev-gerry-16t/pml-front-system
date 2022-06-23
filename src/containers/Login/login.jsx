import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { connect } from "react-redux";
import { callGlobalActionApi } from "../../utils/actions/actions";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import { setDataUserProfile } from "../../utils/dispatchs/userProfileDispatch";
import "./css/styleLogin.scss";

const Login = (props) => {
  const { callGlobalActionApi, setDataUserProfile, dataProfile } = props;
  const initialState = {
    username: "",
    password: "",
  };
  const [dataForm, setDataForm] = useState(initialState);

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
    <div className="login-container">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "5px",
        }}
      >
        <input
          value={dataForm.username}
          onChange={(e) => {
            setDataForm({
              ...dataForm,
              username: e.target.value,
            });
          }}
          placeholder="Correo"
          type="text"
        />
        <input
          value={dataForm.password}
          onChange={(e) => {
            setDataForm({
              ...dataForm,
              password: e.target.value,
            });
          }}
          placeholder="Contraseña"
          type="password"
        />
        <button onClick={handlerVerifyLogin}>Ingresar</button>
      </div>
    </div>
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

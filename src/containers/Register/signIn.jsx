import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { useSearchParams } from "react-router-dom";
import { callGlobalActionApi } from "../../utils/actions/actions";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import "./css/styleRegister.scss";
import LoaderApp from "../../components/loaderApp";

const SignIn = (props) => {
  const { callGlobalActionApi } = props;
  const [searchParams] = useSearchParams();
  const { key, userId } = Object.fromEntries([...searchParams]);
  const [dataForm, setDataForm] = useState({
    email: "",
    firstname: "",
    lastname: "",
    mobilephone: "",
    password: "",
    confirmPassword: "",
  });
  const [validateLink, setValidateLink] = useState(false);
  const [loadedScreen, setLoadedScreen] = useState(true);
  const [sendActivateAccount, setSendActivateAccount] = useState(false);

  const handlerValidateKeyNumber = (data) => {
    let numberToCompare = "";
    if (isNil(data.mobilephone) === false) {
      numberToCompare = data.mobilephone;
    } else if (isNil(data.phone) === false) {
      numberToCompare = data.phone;
    }
    if (isEmpty(numberToCompare) === false) {
      numberToCompare = numberToCompare.replace("+", "");
    }

    return key.includes(numberToCompare);
  };

  const handlerReplaceKeyData = (data) => {
    let replacePhone = "";
    if (isEmpty(data) === false) {
      replacePhone = data.replace("+", "");
    }
    return replacePhone;
  };

  const handlerGetContactInformationById = async () => {
    try {
      const response = await callGlobalActionApi(
        {
          userId,
        },
        null,
        API_CONSTANTS.SIGN_IN.GET_CONTACT_INFORMATION_BY_ID,
        "POST",
        false
      );
      const responseResult = response.response;
      const validate = handlerValidateKeyNumber(responseResult);

      setValidateLink(validate);
      setDataForm({
        ...dataForm,
        email:
          isNil(responseResult.email) === false ? responseResult.email : "",
        firstname:
          isNil(responseResult.firstname) === false
            ? responseResult.firstname
            : "",
        lastname:
          isNil(responseResult.lastname) === false
            ? responseResult.lastname
            : "",
        mobilephone:
          isNil(responseResult.mobilephone) === false ||
          isNil(responseResult.phone) === false
            ? handlerReplaceKeyData(
                responseResult.mobilephone || responseResult.phone
              )
            : "",
      });
      setLoadedScreen(false);
    } catch (error) {
      setLoadedScreen(false);
      setValidateLink(false);
    }
  };

  const handlerSignInUser = async (password) => {
    try {
      const response = await callGlobalActionApi(
        { userId, password, parameter: "BE-HSConfig", language: "es-ES" },
        null,
        API_CONSTANTS.SIGN_IN.SIGN_IN_USER,
        "POST",
        false
      );
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    handlerGetContactInformationById();
  }, []);

  return loadedScreen === false ? (
    <div className="register-container">
      {sendActivateAccount === false ? (
        <>
          {validateLink === false ? (
            <h1>Link invalido</h1>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "5px",
                width: "500px",
              }}
            >
              <input
                value={dataForm.firstname}
                placeholder="Nombre"
                name="name"
                type="text"
                onChange={(e) => {
                  setDataForm({ ...dataForm, firstname: e.target.value });
                }}
              />
              <input
                value={dataForm.lastname}
                placeholder="Apellido"
                name="lastname"
                type="text"
                onChange={(e) => {
                  setDataForm({ ...dataForm, lastname: e.target.value });
                }}
              />
              <input
                value={dataForm.email}
                placeholder="Correo"
                name="email"
                type="email"
                onChange={(e) => {
                  setDataForm({ ...dataForm, email: e.target.value });
                }}
              />
              <input
                value={dataForm.mobilephone}
                placeholder="Teléfono"
                name="phoneNumber"
                type="tel"
                onChange={(e) => {
                  setDataForm({ ...dataForm, mobilephone: e.target.value });
                }}
              />
              <input
                value={dataForm.password}
                placeholder="Contraseña"
                name="password"
                type="password"
                onChange={(e) => {
                  setDataForm({ ...dataForm, password: e.target.value });
                }}
              />
              <input
                value={dataForm.confirmPassword}
                placeholder="Confirmar contraseña"
                type="password"
                onChange={(e) => {
                  setDataForm({ ...dataForm, confirmPassword: e.target.value });
                }}
              />
              <button
                onClick={async () => {
                  try {
                    await handlerSignInUser(dataForm.password);
                    setSendActivateAccount(true);
                  } catch (error) {}
                }}
              >
                Registrarme
              </button>
            </div>
          )}
        </>
      ) : (
        <div>Send mail open your inbox mail</div>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

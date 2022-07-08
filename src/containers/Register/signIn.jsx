import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { useSearchParams } from "react-router-dom";
import { callGlobalActionApi } from "../../utils/actions/actions";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import "./css/styleRegister.scss";
import LoaderApp from "../../components/loaderApp";
import ComponentPresentation from "../../components/componentPresentation";
import CustomForm from "../../components/customForm";
import CustomInput from "../../components/customInput";
import CustomButton from "../../components/customButton";
import { useOnChangeInput } from "../../hooks";
import ComponentSendEmail from "../../components/componentSendEmail";

const SignIn = (props) => {
  const { callGlobalActionApi } = props;
  let component = <LoaderApp />;

  const initialState = {
    email: "",
    firstname: "",
    lastname: "",
    mobilephone: "",
    password: "",
    confirmPassword: "",
  };
  const [searchParams] = useSearchParams();
  const { key, userId } = Object.fromEntries([...searchParams]);
  const [dataForm, handlerOnChange, setDataForm] =
    useOnChangeInput(initialState);
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
        {
          mobilephone: dataForm.mobilephone,
          userId,
          password,
          parameter: "BE-HSConfig",
          language: "es-ES",
        },
        null,
        API_CONSTANTS.SIGN_IN.SIGN_IN_USER,
        "POST",
        false
      );
    } catch (error) {
      throw error;
    }
  };

  const handlerOnSubmit = async () => {
    try {
      setLoadedScreen(true);
      await handlerSignInUser(dataForm.password);
      setLoadedScreen(false);
      setSendActivateAccount(true);
    } catch (error) {
      setLoadedScreen(false);
    }
  };

  useEffect(() => {
    handlerGetContactInformationById();
  }, []);

  if (loadedScreen === true) {
    component = <LoaderApp />;
  } else if (
    loadedScreen === false &&
    validateLink === true &&
    sendActivateAccount === false
  ) {
    component = (
      <ComponentPresentation
        greet="¡Bienvenido!"
        subGreet={`${dataForm.firstname} ${dataForm.lastname}`}
      >
        <CustomForm onSubmit={handlerOnSubmit}>
          <div className="vertical-form">
            <span className="indication">
              Ingresa tus datos para dar de alta tu perfil
            </span>
            <CustomInput
              value={dataForm.mobilephone}
              onChange={handlerOnChange}
              name="mobilephone"
              placeholder="WhatsApp"
              type="phone"
              subType="whatsapp"
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
            <CustomInput
              value={dataForm.confirmPassword}
              onChange={handlerOnChange}
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              type="password"
              isRequired
            />
            <CustomButton
              type="submit"
              formatType="secondary"
              text="Registrarme"
              style={{
                padding: "0.6em 0px",
                width: "100%",
              }}
            />
          </div>

          {/* <div className="option-user">
                ¿Ya tienes cuenta? <span>Inicia sesión</span>
              </div> */}
        </CustomForm>
      </ComponentPresentation>
    );
  } else if (
    loadedScreen === false &&
    validateLink === false &&
    sendActivateAccount === false
  ) {
    component = (
      <ComponentPresentation greet="¡Bienvenido!" subGreet="Link no valido" />
    );
  } else if (
    loadedScreen === false &&
    validateLink === true &&
    sendActivateAccount === true
  ) {
    component = (
      <ComponentSendEmail email={dataForm.email} onClick={handlerOnSubmit} />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { useSearchParams } from "react-router-dom";
import { callGlobalActionApi } from "../../utils/actions/actions";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import "./css/styleRegister.scss";

const ActivateAccount = (props) => {
  const { callGlobalActionApi } = props;
  const [searchParams] = useSearchParams();
  const { token } = Object.fromEntries([...searchParams]);
  console.log("token", token);

  const handlerVerifyEnroll = async () => {
    try {
      const response = await callGlobalActionApi(
        { tokenEnroll: token, language: "es-ES" },
        null,
        API_CONSTANTS.SIGN_IN.VERIFY_ENROLL,
        "POST",
        false
      );
      console.log("response", response);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    handlerVerifyEnroll();
  }, []);

  return (
    <div className="activate-container">
      <div>
        <h1>Cuenta activada</h1>
        <button onClick={() => {}}>Comenzar</button>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivateAccount);

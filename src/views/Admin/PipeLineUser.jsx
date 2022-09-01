import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { callGlobalActionApi } from "../../utils/actions/actions";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import FrontFunctions from "../../utils/actions/frontFunctions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import ComponentGeneralSection from "../../components/componentGeneralSection";
import CustomStepLine from "../../components/customStepLine";
import ValidateDocument from "./subScreens/ValidateDocument";

const PipeLineUser = (props) => {
  const { dataProfile, callGlobalActionApi } = props;
  const { idSystemUser, idLoginHistory } = dataProfile;
  const [pipeLine, setPipeLine] = useState([]);
  const frontFunctions = new FrontFunctions();

  const { idPawn } = useParams();

  const handlerGetPipelineAdmin = async () => {
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          idPawn,
        },
        null,
        API_CONSTANTS.ADMIN.GET_PIPELINE_ADMIN,
        "POST",
        true
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : {};
      setPipeLine(responseResult.pipeline);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.WARNING
      );
    }
  };

  useEffect(() => {
    handlerGetPipelineAdmin();
  }, []);

  return (
    <div className="general-container">
      <ComponentGeneralSection title="Proceso de empeño">
        <div
          style={{
            marginTop: "1em",
            fontSize: "1.2em",
            color: "var(--color-font-black)",
          }}
        ></div>
        <CustomStepLine data={pipeLine} goToActive={false}>
          <Routes>
            <Route
              path="validate-document"
              element={<ValidateDocument idPawn={idPawn} />}
            />
          </Routes>
        </CustomStepLine>
      </ComponentGeneralSection>
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

export default connect(mapStateToProps, mapDispatchToProps)(PipeLineUser);

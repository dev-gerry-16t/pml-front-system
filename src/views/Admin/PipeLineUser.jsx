import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import ContextAdmin from "../../context/contextAdmin";
import { callGlobalActionApi } from "../../utils/actions/actions";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import FrontFunctions from "../../utils/actions/frontFunctions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import ComponentGeneralSection from "../../components/componentGeneralSection";
import CustomStepLine from "../../components/customStepLine";
import ValidateDocument from "./subScreens/ValidateDocument";
import Waiting from "./subScreens/Waiting";
import Offer from "./subScreens/Offer";
import ScheduleDate from "./subScreens/Date";
import PhotoCar from "./subScreens/PhotoCar";

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
      setPipeLine(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.WARNING
      );
    }
  };

  const handlerSetPipelineAdminStep = async (data) => {
    try {
      await callGlobalActionApi(
        {
          ...data,
          idSystemUser,
          idLoginHistory,
        },
        idPawn,
        API_CONSTANTS.ADMIN.SET_PIPELINE_ADMIN_STEP,
        "PUT",
        true
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.WARNING
      );
      throw error;
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
        <ContextAdmin.Provider
          value={{
            amount: pipeLine.amount,
            getPipeLineAdmin: () => {
              handlerGetPipelineAdmin();
            },
            setPipeLineAdminStep: async (data) => {
              try {
                await handlerSetPipelineAdminStep(data);
                handlerGetPipelineAdmin();
              } catch (error) {
                throw error;

              }
            }
          }}
        >
          <CustomStepLine
            data={
              isEmpty(pipeLine) === false &&
                isNil(pipeLine.pipeline) === false &&
                isEmpty(pipeLine.pipeline) === false
                ? pipeLine.pipeline
                : []
            }
            goToActive={false}
          >
            <Routes>
              <Route
                path="validate-document"
                element={
                  <ValidateDocument
                    idPawn={idPawn}
                    onGetPipeLine={() => {
                      handlerGetPipelineAdmin();
                    }}
                  />
                }
              />
              <Route path="waiting" element={<Waiting />} />
              <Route path="pre-offer" element={<Offer />} />
              <Route path="offer" element={<Offer />} />
              <Route path="schedule-date" element={<ScheduleDate />} />
              <Route path="photo-car" element={<PhotoCar />} />
            </Routes>
          </CustomStepLine>
        </ContextAdmin.Provider>
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

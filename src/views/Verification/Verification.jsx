import React, { useContext, useEffect } from "react";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import ContextLayout from "../../context/contextLayout";
import ComponentGeneralSection from "../../components/componentGeneralSection";
import CustomStepLine from "../../components/customStepLine";
import LoaderApp from "../../components/loaderApp";
import InstructionsVerification from "./subScreens/InstructionsVerification";
import DocumentId from "./subScreens/DocumentId";
import DocumentAddress from "./subScreens/DocumentAddress";
import DocumentSelfie from "./subScreens/Selfie";
import { callGlobalActionApi } from "../../utils/actions/actions";
import { setDataUserProfile } from "../../utils/dispatchs/userProfileDispatch";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import FrontFunctions from "../../utils/actions/frontFunctions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";

const Verification = (props) => {
  const { dataProfile, callGlobalActionApi, setDataUserProfile } = props;
  const { idSystemUser, idLoginHistory } = dataProfile;
  const dataContextLayout = useContext(ContextLayout);
  const {
    dataConfigStep: { config, idStep, step },
    getPipeLine,
    setPipeLine,
    idPawn,
    idItem,
  } = dataContextLayout;

  const frontFunctions = new FrontFunctions();

  let component = <LoaderApp />;
  const handlerGetConfigurationMetaMap = async () => {
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          idCustomer: null,
          flowId: config.flowId,
          metadata: config.metadata,
          identity: config.identity,
        },
        null,
        API_CONSTANTS.META_MAP.CREATE_VERIFICATION,
        "POST",
        true
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : {};
      setDataUserProfile({
        ...dataProfile,
        tokenMetaMap: responseResult.token,
        idVerification: responseResult.verificationId,
        identity: responseResult.identity,
      });
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.WARNING
      );
    }
  };

  useEffect(() => {
    if (
      window.mobileCheck() === true &&
      isNil(dataProfile.idVerification) === true &&
      isNil(config) === false
    ) {
      handlerGetConfigurationMetaMap();
    }
  }, [config]);

  if (isNil(config) === false && window.mobileCheck() === false) {
    component = (
      <div className="general-container">
        <ComponentGeneralSection title={step}>
          <div
            style={{
              marginTop: "1em",
              fontSize: "1.2em",
              color: "var(--color-font-black)",
            }}
          >
            <span>
              Para iniciar con tu proceso iniciaremos con una verificación de
              identidad, esto nos ayuda a la eliminación de fraudes por
              suplantación de identidad
            </span>
          </div>
          <CustomStepLine data={config.stepLine}>
            <Routes>
              <Route
                path="instructions"
                element={<InstructionsVerification />}
              />
              <Route path="documentId" element={<DocumentId />} />
              <Route path="documentAddress" element={<DocumentAddress />} />
              <Route path="selfie" element={<DocumentSelfie />} />
            </Routes>
          </CustomStepLine>
        </ComponentGeneralSection>
      </div>
    );
  }
  if (isNil(config) === false && window.mobileCheck() === true) {
    component = (
      <div className="general-container">
        <CustomStepLine data={config.stepLine}>
          <Routes>
            <Route path="instructions" element={<InstructionsVerification />} />
            <Route path="documentId" element={<DocumentId />} />
            <Route path="documentAddress" element={<DocumentAddress />} />
            <Route path="selfie" element={<DocumentSelfie />} />
          </Routes>
        </CustomStepLine>
      </div>
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
  setDataUserProfile: (data) => dispatch(setDataUserProfile(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Verification);

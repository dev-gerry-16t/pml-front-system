import React, { useEffect, useState } from "react";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import styled from "styled-components";
import { Route, Routes, NavLink, Link } from "react-router-dom";
import { callGlobalActionApi } from "../../utils/actions/actions";
import AcceptNotify from "../../views/Notification/AcceptNotify";
import CarInformation from "../../views/CarInfo/CarInformation";
import { useNavigate } from "react-router-dom";
import FrontFunctions from "../../utils/actions/frontFunctions";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import ContextLayout from "../../context/contextLayout";
import Verification from "../../views/Verification/Verification";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  font-size: 16px;
  font-family: "Lato";
  background: var(--color-backGround-light);
  box-sizing: border-box;
`;

const Header = styled.header`
  width: 100%;
  height: 4.6em;
  padding: 1em;
  box-sizing: border-box;
  background: var(--color-backGround-section);
  box-shadow: 0px 6px 15px rgba(192, 192, 192, 0.69);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .logo-pml {
    width: 11em;
    height: 2.5em;
  }
`;

const DefaultLayout = (props) => {
  const {
    dataProfile: { idSystemUser, idLoginHistory },
    callGlobalActionApi,
  } = props;
  const [idItem, setIdItem] = useState(null);
  const [idPawn, setIdPawn] = useState(null);
  const [dataConfigStep, setDataConfigStep] = useState([]);

  const navigate = useNavigate();
  const frontFunctions = new FrontFunctions();

  const handlerGetPipeLine = async () => {
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          idCustomer: null,
        },
        null,
        API_CONSTANTS.SYSTEM_USER.GET_PIPELINE,
        "POST",
        true
      );
      const responseResult =
        isEmpty(response.response) === false &&
        isNil(response.response.pipeline) === false &&
        isEmpty(response.response.pipeline) === false
          ? response.response.pipeline
          : {};
      const responsePipeLine =
        isEmpty(responseResult) === false &&
        isNil(responseResult.pipeline) === false &&
        isEmpty(responseResult.pipeline) === false
          ? responseResult.pipeline
          : [];
      const responseIdItem =
        isEmpty(responseResult) === false &&
        isNil(responseResult.idItem) === false &&
        isEmpty(responseResult.idItem) === false
          ? responseResult.idItem
          : null;
      const responseIdPawn =
        isEmpty(responseResult) === false &&
        isNil(responseResult.idPawn) === false &&
        isEmpty(responseResult.idPawn) === false
          ? responseResult.idPawn
          : null;
      setIdItem(responseIdItem);
      setIdPawn(responseIdPawn);
      const findCurrentScreen = responsePipeLine.find((rowFind) => {
        return rowFind.isCompleted === false && rowFind.isCurrent === true;
      });
      if (isNil(findCurrentScreen) === false) {
        setDataConfigStep(findCurrentScreen);
        navigate(findCurrentScreen.path);
      }
    } catch (error) {
      throw error;
    }
  };

  const handlerSetPipeLineStep = async (data, id) => {
    try {
      await callGlobalActionApi(
        {
          ...data,
          idSystemUser,
          idLoginHistory,
          idCustomer: null,
        },
        id,
        API_CONSTANTS.SYSTEM_USER.SET_PIPELINE_STEP,
        "PUT",
        true
      );
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    handlerGetPipeLine();
  }, []);

  return (
    <Container>
      <ContextLayout.Provider
        value={{
          idItem,
          idPawn,
          dataConfigStep,
          getPipeLine: async () => {
            try {
              await handlerGetPipeLine();
            } catch (error) {
              throw error;
            }
          },
          setPipeLine: async (data, id) => {
            try {
              await handlerSetPipeLineStep(data, id);
            } catch (error) {}
          },
        }}
      >
        <Header>
          <img
            className="logo-pml"
            src="https://prendamovil-assets.s3.us-east-2.amazonaws.com/logo-prenda-light.png"
            alt="Imagen-ciudad"
          />
        </Header>
        <Routes>
          <Route path="accept-notify" element={<AcceptNotify />} />
          <Route path="car-information" element={<CarInformation />} />
          <Route path="user-verification/*" element={<Verification />} />
        </Routes>
      </ContextLayout.Provider>
    </Container>
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
  purgeStore: () => dispatch({ type: "PURGE" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);

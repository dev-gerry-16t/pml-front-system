import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import { motion } from "framer-motion";
import styled from "styled-components";
import ContextLayout from "../../context/contextLayout";
import LoaderApp from "../../components/loaderApp";
import CustomPrincipalTitle from "../../components/customTitleLogin";
import CustomButton from "../../components/customButton";
import { callGlobalActionApi } from "../../utils/actions/actions";
import FrontFunctions from "../../utils/actions/frontFunctions";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      duration: 0.5,
    },
  },
};

const FullScreen = styled(motion.div)`
  background: var(--color-backGround-section);
  position: fixed;
  top: 0px;
  height: 100vh;
  width: 100%;
  padding: 1em;
  .notify-whats {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    img {
      width: 367px;
      height: 370px;
    }
  }
`;

const TextOne = styled.div`
  text-align: center;
  width: 430px;
  font-size: 1.1em;
  color: var(--color-font-dark);
`;

let timeInterval = null;

const AcceptNotify = (props) => {
  const {
    dataProfile: { idSystemUser, idLoginHistory },
    callGlobalActionApi,
  } = props;

  const dataContextLayout = useContext(ContextLayout);
  const frontFunctions = new FrontFunctions();
  const {
    dataConfigStep: { config, idStep, step },
    getPipeLine,
    setPipeLine,
    idPawn,
  } = dataContextLayout;
  let component = <LoaderApp />;

  const handlerIsServiceReady = async () => {
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          idCustomer: null,
          type: 0,
        },
        null,
        API_CONSTANTS.SYSTEM_USER.IS_SERVICE_READY,
        "POST",
        true
      );

      const responseResult =
        isEmpty(response.response) === false &&
        isNil(response.response.isReady) === false
          ? response.response.isReady
          : null;

      if (isNil(responseResult) === false && responseResult === true) {
        getPipeLine();
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const timeInitTest = setTimeout(() => {
      timeInterval = setInterval(() => {
        handlerIsServiceReady();
      }, 10000);
    }, 15000);

    return () => {
      clearInterval(timeInterval);
      clearTimeout(timeInitTest);
    };
  }, []);

  if (isNil(idStep) === false) {
    component = (
      <FullScreen
        variants={container}
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
        }}
      >
        <div className="notify-whats">
          <CustomPrincipalTitle greet={step} subGreet="" />
          <img
            src={config.qr_image_url}
            alt="QR WhatsApp"
            style={{
              marginTop: "5px",
            }}
          />
          <TextOne>
            <span>
              Escanea el QR y permite que{" "}
              <strong>
                Prendamovil te envíe mensajes a través de WhatsApp
              </strong>{" "}
              y así notificarte sobre cambios y promociones importantes en tu
              cuenta.
            </span>
          </TextOne>
          <div
            style={{
              marginTop: "3.125em",
            }}
          >
            <CustomButton
              formatType="secondary"
              text="No deseo mantenerme informado"
              onClick={async () => {
                try {
                  await setPipeLine(
                    {
                      idStep,
                    },
                    idPawn
                  );
                  await getPipeLine();
                } catch (error) {}
              }}
              style={{
                padding: "0.2em 1em",
              }}
            />
          </div>
        </div>
      </FullScreen>
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

export default connect(mapStateToProps, mapDispatchToProps)(AcceptNotify);

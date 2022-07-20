import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { AnimatePresence } from "framer-motion";
import ComponentProcessDocument from "../../../components/componentProcessDocument";
import ComponentQrScan from "../../../components/componentQrScan";
import CustomIndicationList from "../../../components/customIndicationList";
import LoaderApp from "../../../components/loaderApp";
import ContextLayout from "../../../context/contextLayout";
import ContextStepLine from "../../../context/contextStepLine";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import LoaderProcess from "../../../components/loaderFullProcess";
import ComponentShotCamera from "../../../components/componentShotCamera";
import ComponentViewImage from "../../../components/componentViewImage";

const DocumentSelfie = (props) => {
  const { dataProfile } = props;
  const dataContextLayout = useContext(ContextLayout);
  const dataContent = useContext(ContextStepLine);
  const { content } = dataContent;
  const {
    dataConfigStep: { idStep },
    getPipeLine,
    setPipeLine,
    idPawn,
  } = dataContextLayout;
  const [isVisibleCamera, setIsVisibleCamera] = useState(false);
  const [isVisibleImage, setIsVisibleImage] = useState(false);
  const [dataSrcShot, setDataSrcShot] = useState("");
  const [loadProcess, setLoadProcess] = useState(false);
  const frontFunctions = new FrontFunctions();

  let component = <LoaderApp />;

  const handlerContinueProcess = async (file) => {
    const dataMetaMap = [];
    const dataFileMetaMap = [];
    try {
      const dataToMetaMap = {
        inputType: content.inputType,
        group: content.group,
        data: {
          type: content.inputType,
          filename: `${content.inputType}-1.jpeg`,
        },
      };
      dataMetaMap.push(dataToMetaMap);
      dataFileMetaMap.push(file);
      setLoadProcess(true);
      const response = await frontFunctions.handlerUploadToMetaMap(
        dataFileMetaMap,
        dataMetaMap,
        dataProfile.identity,
        dataProfile.tokenMetaMap,
        content.matiDocumentType,
        content.inputType
      );
      await setPipeLine(
        {
          idStep,
          idStepLine: content.idStepLine,
        },
        idPawn
      );
      await getPipeLine();
      setLoadProcess(false);
    } catch (error) {
      setLoadProcess(false);
    }
  };

  if (window.mobileCheck() === false && loadProcess === false) {
    component = (
      <div className="section-center">
        <CustomIndicationList
          stepNumber="Paso 3 de 4"
          subTitle="Escanea el QR  y realiza el proceso desde tu dispositivo móvil"
          labelReady=""
          isVisibleButton={false}
          onClick={() => {}}
        >
          <ComponentQrScan
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${window.location.origin}?token=${dataProfile.token}&amp;size=200x200`}
          />
        </CustomIndicationList>
      </div>
    );
  }

  if (window.mobileCheck() === true && loadProcess === false) {
    component = (
      <>
        <AnimatePresence>
          {isVisibleCamera === true && (
            <ComponentShotCamera
              labelImage="Mira a la cámara"
              type={content.matiDocumentType}
              onClickShot={(src) => {
                setDataSrcShot(src);
                setIsVisibleImage(true);
                setIsVisibleCamera(false);
              }}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isVisibleImage === true && (
            <ComponentViewImage
              src={dataSrcShot}
              indication="Verifica que se vea bien tu rostro y si no te convence puedes tomarte otra"
              onClickContinue={handlerContinueProcess}
              onClickOther={() => {
                setIsVisibleImage(false);
                setIsVisibleCamera(true);
              }}
            />
          )}
        </AnimatePresence>
        <ComponentProcessDocument
          onClickOpenCamera={() => {
            setIsVisibleCamera(true);
          }}
          stepNumber="Paso 4 de 4"
          subTitle="Sube tu mejor selfie mirando de frente donde podamos ver tu rostro completo"
        />
      </>
    );
  }

  if (loadProcess === true) {
    component = <LoaderProcess />;
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

export default connect(mapStateToProps, mapDispatchToProps)(DocumentSelfie);

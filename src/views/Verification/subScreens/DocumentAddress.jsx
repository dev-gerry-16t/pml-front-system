import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { AnimatePresence } from "framer-motion";
import ComponentProcessDocument from "../../../components/componentProcessDocumentVerification";
import ComponentQrScan from "../../../components/componentQrScan";
import CustomIndicationList from "../../../components/customIndicationList";
import LoaderApp from "../../../components/loaderApp";
import ContextLayout from "../../../context/contextLayout";
import ContextStepLine from "../../../context/contextStepLine";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import { useOnChangeInput } from "../../../hooks";
import LoaderProcess from "../../../components/loaderFullProcess";
import ComponentShotCamera from "../../../components/componentShotCamera";
import ComponentViewImage from "../../../components/componentViewImage";
import ComponentInstruction from "../../../components/componentInstruction";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";

const arrayIndication = [
  { name: "Recibo de luz", desciption: "" },
  { name: "Recibo de agua", desciption: "" },
  { name: "Recibo de gas", desciption: "" },
  { name: "Teléfono o Internet", desciption: "" },
];

const DocumentAddress = (props) => {
  const initialState = {
    documentAddress: "proof-of-residency",
  };
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

  const [dataForm] = useOnChangeInput(initialState);
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
          type: dataForm.documentAddress,
          country: dataProfile.alpha2,
          page: "front",
          filename: `${dataForm.documentAddress}-1.jpeg`,
        },
      };
      dataMetaMap.push(dataToMetaMap);
      dataFileMetaMap.push(file);
      setLoadProcess(true);
      await frontFunctions.handlerUploadToMetaMap(
        dataFileMetaMap,
        dataMetaMap,
        dataProfile.identity,
        dataProfile.tokenMetaMap,
        content.matiDocumentType,
        dataForm.documentAddress
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
      setTimeout(() => {
        setIsVisibleImage(false);
        setIsVisibleCamera(false);
        setLoadProcess(false);
        setDataSrcShot("");
      }, 7000);
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.WARNING
      );
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
        {isVisibleCamera === true && (
          <ComponentShotCamera
            labelImage="Los datos deben ser visibles"
            type={dataForm.documentAddress}
            onClickShot={(src) => {
              setDataSrcShot(src);
              setIsVisibleImage(true);
              setIsVisibleCamera(false);
            }}
          />
        )}
        {isVisibleImage === true && (
          <ComponentViewImage
            src={dataSrcShot}
            indication="Verifica que tu foto sea visible"
            onClickContinue={handlerContinueProcess}
            onClickOther={() => {
              setIsVisibleImage(false);
              setIsVisibleCamera(true);
            }}
          />
        )}
        <ComponentProcessDocument
          onClickOpenCamera={() => {
            setIsVisibleCamera(true);
          }}
          stepNumber="Paso 3 de 4"
          subTitle="Toma una foto de tu comprobante de domicilio no mayor a 3 meses, puedes subir cualquiera de los siguientes"
        >
          <div
            className="flex-row"
            style={{
              rowGap: "1em",
            }}
          >
            {arrayIndication.map((row, ix) => {
              return <ComponentInstruction key={`list-${ix}`} row={row} />;
            })}
          </div>
        </ComponentProcessDocument>
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

export default connect(mapStateToProps, mapDispatchToProps)(DocumentAddress);

import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import ComponentProcessDocument from "../../../components/componentProcessDocuments";
import ComponentShotCamera from "../../../components/componentShotCamera";
import ComponentViewImage from "../../../components/componentViewImage";
import ComponentViewDocument from "../../../components/componentViewDocument";
import LoaderApp from "../../../components/loaderApp";
import ContextLayout from "../../../context/contextLayout";
import ContextStepLine from "../../../context/contextStepLine";
import {
  callGlobalActionApi,
  callSetCustomerInDocument,
} from "../../../utils/actions/actions";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";

const DocumentTypeCheckList = (props) => {
  const { callGlobalActionApi, callSetCustomerInDocument, dataProfile } = props;
  const { idSystemUser, idLoginHistory } = dataProfile;
  const { documentTypeName } = useParams();
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
  const [isVisibleFile, setIsVisibleFile] = useState(false);
  const [dataSrcShot, setDataSrcShot] = useState("");
  const [loadProcess, setLoadProcess] = useState(false);
  const [metaDataFile, setMetaDataFile] = useState({});
  const [dataPawnDocument, setDataPawnDocument] = useState({});

  const frontFunctions = new FrontFunctions();

  const handlerGetPawnDocuments = async () => {
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          idPawn,
          idDocumentType: content.idDocumentType,
          idCustomer: null,
        },
        null,
        API_CONSTANTS.SYSTEM_USER.GET_PAWN_DOCUMENTS,
        "POST",
        true
      );
      const responseResult =
        isEmpty(response.response) === false &&
        isNil(response.response) === false
          ? response.response
          : {};
      const responseDocuments =
        isEmpty(responseResult) === false &&
        isNil(responseResult.documents) === false &&
        isEmpty(responseResult.documents) === false &&
        isNil(responseResult.documents[0]) === false
          ? responseResult.documents[0]
          : {};
      setDataPawnDocument(responseDocuments);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerContinueProcess = async () => {
    try {
      setLoadProcess(true);
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

  const handlerSetCustomerInDocument = async (file, data) => {
    try {
      setLoadProcess(true);
      await callSetCustomerInDocument(
        file,
        {
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        () => {},
        "PUT"
      );
      setIsVisibleImage(false);
      setIsVisibleFile(false);
      setLoadProcess(false);
      setTimeout(() => {
        handlerGetPawnDocuments();
      }, 1000);
    } catch (error) {
      setLoadProcess(false);
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.WARNING
      );
    }
  };

  const handlerDeleteCustomerInDocuments = async (data) => {
    try {
      await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          idCustomer: null,
          ...data,
        },
        null,
        API_CONSTANTS.SYSTEM_USER.SET_CUSTOMER_IN_DELETE_DOCUMENT,
        "POST",
        true
      );
      handlerGetPawnDocuments();
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  let component = <LoaderApp />;

  useEffect(() => {
    if (isEmpty(content) === false) {
      handlerGetPawnDocuments();
    }
  }, [content, documentTypeName]);

  if (loadProcess === false) {
    component = (
      <>
        {isVisibleCamera === true && (
          <ComponentShotCamera
            labelImage="Los datos deben ser visibles"
            type="default-rectangle"
            onClickShot={(src, data) => {
              setDataSrcShot(src);
              setIsVisibleImage(true);
              setIsVisibleCamera(false);
              setMetaDataFile(data);
            }}
          />
        )}
        {isVisibleImage === true && (
          <ComponentViewImage
            src={dataSrcShot}
            indication="Verifica que tu foto sea visible"
            onClickContinue={(file) => {
              const data = {
                idCustomer: null,
                idDocument: null,
                name: metaDataFile.name,
                extension: metaDataFile.extension,
                metadata: JSON.stringify(dataPawnDocument.metadata),
                mimeType: metaDataFile.type,
                isActive: true,
                bucketSource: dataPawnDocument.bucketSource,
              };
              handlerSetCustomerInDocument(file, data);
            }}
            onClickOther={() => {
              setIsVisibleImage(false);
              if (
                isNil(content.canTakePhoto) === true ||
                content.canTakePhoto === true
              ) {
                setIsVisibleCamera(true);
              }
            }}
          />
        )}
        {isVisibleFile === true && (
          <ComponentViewDocument
            src={dataSrcShot}
            indication="Verifica que tu foto sea visible"
            onClickContinue={(file) => {
              const data = {
                idCustomer: null,
                idDocument: null,
                name: metaDataFile.name,
                extension: metaDataFile.extension,
                metadata: JSON.stringify(dataPawnDocument.metadata),
                mimeType: metaDataFile.type,
                isActive: true,
                bucketSource: dataPawnDocument.bucketSource,
              };
              handlerSetCustomerInDocument(file, data);
            }}
            metaDataFile={metaDataFile}
            onClickOther={() => {
              setIsVisibleFile(false);
              setDataSrcShot(null);
            }}
          />
        )}
        <ComponentProcessDocument
          onClickOpenCamera={() => {
            setIsVisibleCamera(true);
          }}
          onDeleteFile={(data) => {
            handlerDeleteCustomerInDocuments(data);
          }}
          onClickNextStep={handlerContinueProcess}
          canGoNextStep={true}
          canTakePhoto={content.canTakePhoto}
          canUploadFile={true}
          documents={dataPawnDocument.document}
          bucketDocument={dataPawnDocument.bucketSource}
          stepNumber="Paso 3 de 4"
          subTitle={content.directions}
          title={content.documentType}
          accept={content.extensions}
          onClickUploadFile={(src, data) => {
            setDataSrcShot(src);
            setIsVisibleFile(true);
            setMetaDataFile(data);
          }}
        ></ComponentProcessDocument>
      </>
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
  callSetCustomerInDocument: (file, data, callback, method) =>
    dispatch(callSetCustomerInDocument(file, data, callback, method)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentTypeCheckList);

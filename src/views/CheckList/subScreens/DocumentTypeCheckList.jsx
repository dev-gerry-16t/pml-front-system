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

  const handlerSetCustomerInDocument = async (file) => {
    try {
      setLoadProcess(true);
      await callSetCustomerInDocument(
        file,
        {
          idSystemUser,
          idLoginHistory,
          idCustomer: null,
          idDocument: null,
          name: metaDataFile.name,
          extension: metaDataFile.extension,
          metadata: JSON.stringify(dataPawnDocument.metadata),
          mimeType: metaDataFile.type,
          isActive: true,
          bucketSource: dataPawnDocument.bucketSource,
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
    }
  };

  let component = <LoaderApp />;

  useEffect(() => {
    if (isEmpty(content) === false) {
      handlerGetPawnDocuments();
    }
  }, [content]);

  if (loadProcess === false) {
    component = (
      <>
        <AnimatePresence>
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
        </AnimatePresence>
        <AnimatePresence>
          {isVisibleImage === true && (
            <ComponentViewImage
              src={dataSrcShot}
              indication="Verifica que tu foto sea visible"
              onClickContinue={handlerSetCustomerInDocument}
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
        </AnimatePresence>
        <AnimatePresence>
          {isVisibleFile === true && (
            <ComponentViewDocument
              src={dataSrcShot}
              indication="Verifica que tu foto sea visible"
              onClickContinue={handlerSetCustomerInDocument}
              metaDataFile={metaDataFile}
              onClickOther={() => {
                setIsVisibleFile(false);
                setDataSrcShot(null);
              }}
            />
          )}
        </AnimatePresence>
        <ComponentProcessDocument
          onClickOpenCamera={() => {
            setIsVisibleCamera(true);
          }}
          onClickNextStep={handlerContinueProcess}
          canGoNextStep={true}
          canTakePhoto={content.canTakePhoto}
          canUploadFile={true}
          documents={dataPawnDocument.document}
          bucketDocument={dataPawnDocument.bucketSource}
          stepNumber="Paso 3 de 4"
          subTitle={content.directions}
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

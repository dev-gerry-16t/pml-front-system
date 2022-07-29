import React, { useContext, useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
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
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import { setDataUserProfile } from "../../../utils/dispatchs/userProfileDispatch";
import CustomSelect from "../../../components/customSelect";
import { useOnChangeInput } from "../../../hooks";
import LoaderProcess from "../../../components/loaderFullProcess";
import ComponentShotCamera from "../../../components/componentShotCamera";
import ComponentViewImage from "../../../components/componentViewImage";

const DocumentId = (props) => {
  const initialState = {
    nationality: "",
    documentId: "",
  };
  const { dataProfile, callGlobalActionApi, setDataUserProfile } = props;
  const { idSystemUser, idLoginHistory } = dataProfile;
  const dataContextLayout = useContext(ContextLayout);
  const dataContent = useContext(ContextStepLine);
  const { content } = dataContent;
  const {
    dataConfigStep: { config, idStep, step },
    getPipeLine,
    setPipeLine,
    idPawn,
    idItem,
  } = dataContextLayout;
  const [dataCatalog, setDataCatalog] = useState([]);
  const [isVisibleCamera, setIsVisibleCamera] = useState(false);
  const [isVisibleImage, setIsVisibleImage] = useState(false);
  const [dataSrcShot, setDataSrcShot] = useState("");
  const [dataOptionCountry, setDataOptionCountry] = useState({});
  const [loadProcess, setLoadProcess] = useState(false);
  const [arrayFiles, setArrayFiles] = useState([]);
  const [arrayDataFiles, setArrayDataFiles] = useState([]);
  const [stepPage, setStepPage] = useState(1);
  const [textFieType, setTextFileType] = useState("");

  const [dataForm, handlerOnChange, setDataForm] =
    useOnChangeInput(initialState);
  const frontFunctions = new FrontFunctions();

  let component = <LoaderApp />;

  const handlerGetAllCountries = async () => {
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          type: 0,
        },
        null,
        API_CONSTANTS.CATALOGS.GET_ALL_COUNTRIES,
        "POST",
        true
      );
      const responseResult =
        isEmpty(response.response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : [];
      const isDefault = responseResult.find((row) => {
        return row.isDefault === true;
      });
      if (isNil(isDefault) === false) {
        setDataForm({
          ...dataForm,
          nationality: isDefault.id,
        });
        setDataOptionCountry(isDefault);
      }
      setDataCatalog(responseResult);
    } catch (error) {
      throw error;
    }
  };

  const handlerGetConfigurationMetaMap = async () => {
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          idCustomer: null,
          flowId: config.flowId,
          metadata: config.metadata,
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
    } catch (error) {}
  };

  const handlerContinueProcess = async (file) => {
    const dataMetaMap = arrayDataFiles;
    const dataFileMetaMap = arrayFiles;
    try {
      if (dataForm.documentId === "passport" && stepPage === 1) {
        const dataToMetaMap = {
          inputType: content.inputType,
          group: content.group,
          data: {
            type: dataForm.documentId,
            country: dataOptionCountry["Alpha-2"],
            page: "front",
            filename: `${dataForm.documentId}-${stepPage}.jpeg`,
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
          dataForm.documentId
        );
        setDataUserProfile({
          ...dataProfile,
          country: dataOptionCountry["Alpha-2"],
        });
        await setPipeLine(
          {
            idStep,
            idStepLine: content.idStepLine,
          },
          idPawn
        );
        await getPipeLine();
        setLoadProcess(false);
      }

      if (dataForm.documentId === "national-id" && stepPage === 1) {
        const dataToMetaMap = {
          inputType: content.inputType,
          group: content.group,
          data: {
            type: dataForm.documentId,
            country: dataOptionCountry["Alpha-2"],
            page: "front",
            filename: `${dataForm.documentId}-${stepPage}.jpeg`,
          },
        };
        dataMetaMap.push(dataToMetaMap);
        dataFileMetaMap.push(file);
        setIsVisibleImage(false);
        setIsVisibleCamera(true);
        setStepPage(stepPage + 1);
        setArrayDataFiles(dataMetaMap);
        setArrayFiles(dataFileMetaMap);
        setTextFileType("Toma una foto de la parte trasera");
      }

      if (dataForm.documentId === "national-id" && stepPage === 2) {
        const dataToMetaMap = {
          inputType: content.inputType,
          group: content.group,
          data: {
            type: dataForm.documentId,
            country: dataOptionCountry["Alpha-2"],
            page: "back",
            filename: `${dataForm.documentId}-${stepPage}.jpeg`,
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
          dataForm.documentId
        );
        setDataUserProfile({
          ...dataProfile,
          country: dataOptionCountry["Alpha-2"],
        });
        await setPipeLine(
          {
            idStep,
            idStepLine: content.idStepLine,
          },
          idPawn
        );
        await getPipeLine();
        setLoadProcess(false);
      }
    } catch (error) {
      setLoadProcess(false);
    }
  };

  useEffect(() => {
    if (
      window.mobileCheck() === true &&
      isNil(dataProfile.idVerification) === true
    ) {
      handlerGetAllCountries();
      handlerGetConfigurationMetaMap();
    }
  }, []);

  if (window.mobileCheck() === false && loadProcess === false) {
    component = (
      <div className="section-center">
        <CustomIndicationList
          stepNumber="Paso 2 de 4"
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
              labelImage={textFieType}
              type={dataForm.documentId}
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
              indication="Verifica que tu foto sea visible"
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
          stepNumber="Paso 2 de 4"
          subTitle="Sube un documento de identidad vigente"
        >
          <div
            className="flex-row"
            style={{
              rowGap: "1em",
            }}
          >
            <CustomSelect
              key="select-country"
              value={dataForm.nationality}
              placeholder="Selecciona tu nacionalidad"
              border="secondary"
              data={dataCatalog}
              onChange={(e, option) => {
                handlerOnChange(e);
                setDataOptionCountry(option);
              }}
              name="nationality"
            />
            <CustomSelect
              key="select-document"
              value={dataForm.documentId}
              placeholder="Documento de identidad"
              data={[
                { id: "passport", text: "Pasaporte" },
                { id: "national-id", text: "INE/IFE" },
              ]}
              border="secondary"
              onChange={(e, option) => {
                handlerOnChange(e);
                setTextFileType("Toma una foto de la parte frontal");
              }}
              name="documentId"
            />
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
  setDataUserProfile: (data) => dispatch(setDataUserProfile(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentId);

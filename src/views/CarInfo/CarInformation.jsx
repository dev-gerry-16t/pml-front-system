import React, { useContext, useState, useEffect } from "react";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import ContextLayout from "../../context/contextLayout";
import styled from "styled-components";
import ComponentGeneralSection from "../../components/componentGeneralSection";
import ComponentBorderTopSection from "../../components/componentBorderTopSection";
import CarDefaultColor from "../../components/carDefaultColor";
import LoaderApp from "../../components/loaderApp";
import CustomButton from "../../components/customButton";
import CustomForm from "../../components/customForm";
import CustomInput from "../../components/customInput";
import { useOnChangeInput } from "../../hooks";
import { callGlobalActionApi } from "../../utils/actions/actions";
import FrontFunctions from "../../utils/actions/frontFunctions";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import LoaderProcess from "../../components/loaderProcess";
import CustomSelect from "../../components/customSelect";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";

const EditButton = styled.div`
  position: absolute;
  bottom: -2em;
  right: 0px;
`;

const CreditAsigned = styled.div`
  margin-top: 2em;
  text-align: center;
  color: var(--color-brand-secondary);
  display: flex;
  flex-direction: column;
  .type-credit {
    color: var(--color-font-dark);
    font-weight: 900;
    font-family: "Kometa", "Lato";
    padding-top: 10px;
  }
  .format-amount {
    display: flex;
    align-items: baseline;
    column-gap: 0.5em;
    h1 {
      font-family: "Kometa", "Lato";
      font-style: normal;
      font-weight: 900;
      font-size: 2em;
      margin: 0px;
    }
    span {
      margin: 0px;
      font-weight: 900;
    }
  }
`;

const ComponentEditInformation = ({
  data,
  isVisible,
  onClick,
  onChangeColor,
  onSaveInformation,
}) => {
  const [dataForm, handlerOnChange, setDataForm] = useOnChangeInput({});

  useEffect(() => {
    if (isEmpty(data) === false) {
      setDataForm({
        brand: data.brand,
        model: data.model,
        year: data.year,
        version: data.version,
        color: isNil(data.color) === false ? data.color : "#989FD6",
        km: data.km,
        carriagePlateState: data.carriagePlateState,
        isUniqueOwner: data.isUniqueOwner === false ? "0" : "1",
        idCarrigePlateState: data.idCarrigePlateState,
      });
    }
  }, [data]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          style={{
            width: "80%",
            position: "relative",
          }}
        >
          <CustomButton
            style={{
              position: "absolute",
              right: "0px",
              top: "1em",
            }}
            formatType="close"
            onClick={onClick}
          >
            X
          </CustomButton>
          <CustomForm
            onSubmit={(e) => {
              onSaveInformation({
                ...dataForm,
                isUniqueOwner: dataForm.isUniqueOwner === "1" ? 1 : 0,
              });
            }}
          >
            <div className="vertical-form">
              <CustomInput
                value={dataForm.brand}
                onChange={handlerOnChange}
                name="brand"
                placeholder="Marca"
                type="text"
                isRequired
              />
              <CustomInput
                value={dataForm.model}
                onChange={handlerOnChange}
                name="model"
                placeholder="Modelo"
                type="text"
                isRequired
              />
              <CustomInput
                value={dataForm.year}
                onChange={handlerOnChange}
                name="year"
                placeholder="Año"
                type="number"
                isRequired
              />
              <CustomInput
                value={dataForm.version}
                onChange={handlerOnChange}
                name="version"
                placeholder="Versión"
                type="text"
                isRequired
              />
              <CustomInput
                value={dataForm.color}
                onChange={(e) => {
                  handlerOnChange(e);
                  onChangeColor(e.target.value);
                }}
                name="color"
                placeholder="Color"
                type="color"
                isRequired
              />
              <CustomInput
                value={dataForm.km}
                onChange={handlerOnChange}
                name="km"
                placeholder="Kilometraje"
                type="number"
                isRequired
              />
              <CustomSelect
                value={dataForm.isUniqueOwner}
                onChange={(e) => {
                  handlerOnChange(e);
                }}
                name="isUniqueOwner"
                placeholder="Dueño"
                isRequired
                data={[
                  { id: "1", text: "Único dueño" },
                  { id: "0", text: "Mas de un dueño" },
                ]}
              />
              <CustomButton
                type="submit"
                formatType="secondary"
                text="Guardar cambios"
                style={{
                  padding: "0.2em 0px",
                  width: "100%",
                }}
                isRequired
              />
            </div>
          </CustomForm>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ComponentCarInformation = ({ data, onClick, isVisible }) => {
  const {
    brand,
    carriagePlateState,
    color,
    isUniqueOwner,
    km,
    version,
    model,
    year,
  } = data;

  return (
    <AnimatePresence>
      {isVisible === false && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="grid-column-2"
          style={{
            columnGap: "1em",
            position: "relative",
          }}
        >
          <div
            style={{
              rowGap: "0.5em",
            }}
            className="flex-row flex-row-end"
          >
            <span>Marca</span>
            <span>Modelo</span>
            <span>Año</span>
            <span>Versión</span>
            <span>Color</span>
            <span>Kilometraje</span>
            <span>Único dueño</span>
          </div>
          <div
            style={{
              rowGap: "0.5em",
            }}
            className="flex-row"
          >
            <strong>{isNil(brand) === false ? brand : "s/a"}</strong>
            <strong>{isNil(model) === false ? model : "s/a"}</strong>
            <strong>{isNil(year) === false ? year : "s/a"}</strong>
            <strong>{isNil(version) === false ? version : "s/a"}</strong>

            {isNil(color) === false ? (
              <strong
                style={{
                  background: color,
                  width: "100%",
                  height: "1em",
                }}
              ></strong>
            ) : (
              <strong>"s/a"</strong>
            )}

            <strong>{isNil(km) === false ? km : "s/a"}</strong>
            <strong>
              {isNil(isUniqueOwner) === false
                ? isUniqueOwner === false
                  ? "No"
                  : "Si"
                : "s/a"}
            </strong>
          </div>
          <EditButton>
            <CustomButton formatType="underline-secondary" onClick={onClick}>
              Editar
            </CustomButton>
          </EditButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CarInformation = (props) => {
  const {
    dataProfile: { idSystemUser, idLoginHistory },
    callGlobalActionApi,
  } = props;
  const dataContextLayout = useContext(ContextLayout);
  const {
    dataConfigStep: { config, idStep, step },
    getPipeLine,
    setPipeLine,
    idPawn,
    idItem,
  } = dataContextLayout;
  const [isVisible, setIsVisible] = useState(false);
  const [colorCar, setColorCar] = useState(
    isNil(config) === false ? config.color : "#989FD6"
  );
  const [loadedScreen, setLoadedScreen] = useState(false);
  const [isVisibleLoad, setIsVisibleLoad] = useState(false);

  const frontFunctions = new FrontFunctions();

  const handlerSetPipeLineStep = async (data) => {
    try {
      await callGlobalActionApi(
        {
          ...data,
          idSystemUser,
          idLoginHistory,
          idCustomer: null,
        },
        idItem,
        API_CONSTANTS.SYSTEM_USER.SET_VEHICLE,
        "PUT",
        true
      );
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
      setIsVisibleLoad(true);
      await setPipeLine(
        {
          idStep,
        },
        idPawn
      );
      await getPipeLine();
      setIsVisibleLoad(false);
    } catch (error) {
      setIsVisibleLoad(false);
    }
  };

  useEffect(() => {
    if (isNil(config) === false) {
      setColorCar(isNil(config.color) === false ? config.color : "#989FD6");
    }
  }, [config]);

  let component = <LoaderApp />;

  if (isNil(config) === false && isVisibleLoad === false) {
    component = (
      <div className="general-container">
        <ComponentGeneralSection title={step}>
          <ComponentBorderTopSection>
            <div className="flex-row">
              <div
                className="grid-column-2"
                style={{
                  paddingBottom: "3em",
                  borderBottom: "1px solid var(--color-border-black)",
                }}
              >
                <div className="section-center">
                  <CarDefaultColor width={"21em"} color={colorCar} />
                </div>
                <div
                  style={{
                    position: "relative",
                  }}
                  className="section-center"
                >
                  {loadedScreen === true && <LoaderProcess />}
                  <ComponentEditInformation
                    data={config}
                    isVisible={isVisible}
                    onClick={() => {
                      setIsVisible(!isVisible);
                    }}
                    onChangeColor={(value) => {
                      setColorCar(value);
                    }}
                    onSaveInformation={async (data) => {
                      try {
                        setLoadedScreen(true);
                        await handlerSetPipeLineStep(data);
                        await getPipeLine();
                        setLoadedScreen(false);
                        setIsVisible(!isVisible);
                      } catch (error) {
                        setLoadedScreen(false);
                      }
                    }}
                  />
                  <ComponentCarInformation
                    data={config}
                    onClick={() => {
                      setIsVisible(!isVisible);
                    }}
                    isVisible={isVisible}
                  />
                </div>
              </div>
              <div className="section-center">
                <CreditAsigned>
                  <div
                    dangerouslySetInnerHTML={{ __html: config.firstAmount }}
                  />
                  <span className="type-credit">Prestamo PRE-aprobado</span>
                </CreditAsigned>
              </div>
            </div>
          </ComponentBorderTopSection>
          <div
            className="align-button"
            style={{
              marginTop: "4em",
            }}
          >
            <CustomButton
              style={{
                width: "40%",
                padding: "5px 0px",
              }}
              formatType="secondary"
              onClick={handlerContinueProcess}
            >
              Iniciar Proceso
            </CustomButton>
          </div>
        </ComponentGeneralSection>
      </div>
    );
  }

  if (isVisibleLoad === true) {
    component = <LoaderApp />;
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

export default connect(mapStateToProps, mapDispatchToProps)(CarInformation);

import React, { useState, useContext, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import CustomButton from "../../../components/customButton";
import CustomIndicationList from "../../../components/customIndicationList";
import ContextStepLine from "../../../context/contextStepLine";
import ContextAdmin from "../../../context/contextAdmin";
import CustomInput from "../../../components/customInput";
import CustomMapContainer from "../../../components/customGoogleMaps";

const DateAsigned = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  padding-bottom: 2em;
  border-bottom: 0.5px solid #090c41;
`;

const LocationDate = styled.div`
  margin-top: 1em;
  padding: 0px 10px;
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  min-height: 40em;
  /* .location {
    width: 100%;
    height: 15em;
    box-sizing: border-box;
  } */
`;

const ButtonsActions = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1em;
`;

const ContainerInput = styled.div`
  display: flex;
  justify-content: center;
  .container-input {
    display: grid;
    border-radius: 1em;
    grid-template-columns: 1fr 2px 1fr;
    padding: 1em;
    border: 1px solid var(--color-font-primary);
    input {
      border: none;
      background: transparent;
      color: var(--color-font-light);
      font-family: "Lato";
      outline: none;
      font-size: 1em;
    }
    select {
      border: none;
      background: transparent;
      color: var(--color-font-light);
      font-family: "Lato";
      outline: none;
      font-size: 1em;
    }
    .line-y {
      width: 2px;
      border-right: 1px solid var(--color-font-light);
    }
  }
`;

const selectDate = [
  { id: "09:00", text: "9:00 am" },
  { id: "09:30", text: "9:30 am" },
  { id: "10:00", text: "10:00 am" },
  { id: "10:30", text: "10:30 am" },
  { id: "11:00", text: "11:00 am" },
  { id: "11:30", text: "11:30 am" },
  { id: "12:00", text: "12:00 pm" },
  { id: "12:30", text: "12:30 pm" },
  { id: "13:00", text: "01:00 pm" },
  { id: "13:30", text: "01:30 pm" },
  { id: "14:00", text: "02:00 pm" },
  { id: "14:30", text: "02:30 pm" },
  { id: "15:00", text: "03:00 pm" },
  { id: "15:30", text: "03:30 pm" },
  { id: "16:00", text: "04:00 pm" },
  { id: "16:30", text: "04:30 pm" },
  { id: "17:00", text: "05:00 pm" },
  { id: "17:30", text: "05:30 pm" },
  { id: "18:00", text: "06:00 pm" },
];

const ScheduleDate = () => {
  const dataContent = useContext(ContextStepLine);
  const dataAdmin = useContext(ContextAdmin);
  const [valueDate, setValueDate] = useState("");
  const [valueHour, setValueHour] = useState("");
  const [positionCoordenates, setPositionCoordenates] = useState({});
  const [valueAddress, setValueAddress] = useState(null);

  const handlerGetCoordinates = async (address) => {
    try {
      const replaceSearch = address.replaceAll(" ", "+");
      const responseMaps = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?&address=${replaceSearch}&key=AIzaSyBwWOmV2W9QVm7lN3EBK4wCysj2sLzPhiQ`,
        {
          method: "GET",
        }
      );
      const responseResultMaps = await responseMaps.json();
      const geolocation =
        isEmpty(responseResultMaps) === false &&
        isNil(responseResultMaps.results) === false &&
        isNil(responseResultMaps.results[0]) === false
          ? responseResultMaps.results[0].geometry.location
          : {};
      setPositionCoordenates(isNil(geolocation) === false ? geolocation : null);
    } catch (error) {}
  };

  const handlerGetAddress = async (position) => {
    try {
      const responseMaps = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&key=AIzaSyBwWOmV2W9QVm7lN3EBK4wCysj2sLzPhiQ`,
        {
          method: "GET",
        }
      );
      const responseResultMaps = await responseMaps.json();
      const valueAddress =
        isEmpty(responseResultMaps) === false &&
        isNil(responseResultMaps.results) === false &&
        isEmpty(responseResultMaps.results) === false &&
        isNil(responseResultMaps.results[0]) === false &&
        isEmpty(responseResultMaps.results[0]) === false &&
        isNil(responseResultMaps.results[0].formatted_address) === false &&
        isEmpty(responseResultMaps.results[0].formatted_address) === false
          ? responseResultMaps.results[0].formatted_address
          : null;
      setValueAddress(valueAddress);
    } catch (error) {}
  };

  useEffect(() => {
    if (isEmpty(dataContent.content) === false) {
      setPositionCoordenates({
        lat:
          isNil(dataContent.content.config.location.latitude) === false
            ? dataContent.content.config.location.latitude
            : "19.3805745",
        lng:
          isNil(dataContent.content.config.location.longitude) === false
            ? dataContent.content.config.location.longitude
            : "-99.1756967",
      });
      setValueAddress(dataContent.content.config.addressLine);
      if (
        isNil(dataContent.content.config.scheduleAt) === false &&
        isEmpty(dataContent.content.config.scheduleAt) === false
      ) {
        const splitData = dataContent.content.config.scheduleAt.split(" ");
        const dateData =
          isNil(splitData) === false && isNil(splitData[0]) === false
            ? splitData[0]
            : "";
        const hourData =
          isNil(splitData) === false && isNil(splitData[1]) === false
            ? splitData[1]
            : "";
        const hourSlice =
          isEmpty(hourData) === false ? hourData.slice(0, 5) : "";
        setValueDate(dateData);
        setValueHour(hourSlice);
      }
    }
  }, [dataContent]);

  return (
    <div className="section-shadow padding-2-1">
      <CustomIndicationList subTitle={dataContent.content.step}>
        <DateAsigned>
          <h3>Ingresa la información para programar una cita con el cliente</h3>
          <ContainerInput>
            <div className="container-input">
              <input
                placeholder="Fecha"
                value={valueDate}
                type="date"
                onChange={(e) => {
                  const value = e.target.value;
                  setValueDate(value);
                }}
              />
              <div className="line-y" />
              <select
                value={valueHour}
                onChange={(e) => {
                  const value = e.target.value;
                  setValueHour(value);
                }}
              >
                <option disabled value="">
                  Selecciona la hora
                </option>
                {selectDate.map((row, ix) => {
                  return (
                    <option key={`option-${ix}`} value={row.id}>
                      {row.text}
                    </option>
                  );
                })}
              </select>
            </div>
          </ContainerInput>
          <LocationDate>
            <div>
              <span>
                Calle Número, Colonia, Delegación/Municipio, Código postal,
                Estado
              </span>
              <CustomInput
                value={valueAddress}
                placeholder="Ingresa la dirección"
                onChange={(e, value) => {
                  setValueAddress(value);
                  handlerGetCoordinates(value);
                }}
                type="text"
              />
            </div>
            <div className="location">
              <CustomMapContainer
                location={positionCoordenates}
                onDragPosition={(position) => {
                  setPositionCoordenates(position);
                  handlerGetAddress(position);
                }}
                exact={true}
              />
            </div>
          </LocationDate>
        </DateAsigned>
        <ButtonsActions>
          {/* <CustomButton
            style={{
              padding: "0.5em 2em",
            }}
            formatType="tertiary"
          >
            Cancelar
          </CustomButton> */}
          <CustomButton
            style={{
              padding: "0.5em 2em",
            }}
            onClick={async () => {
              try {
                if (
                  isEmpty(valueDate) ||
                  isEmpty(valueHour) ||
                  isEmpty(valueAddress)
                ) {
                  window.alert(
                    "Asegurate de asignar la fecha, hora y dirección"
                  );
                } else {
                  if (window.confirm("¿Estas seguro de la cita asignada?")) {
                    await dataAdmin.setPipeLineAdminStep({
                      idStep: dataContent.content.idStep,
                      idStepLine: null,
                      metadata: JSON.stringify({
                        location: {
                          latitude: positionCoordenates.lat,
                          longitude: positionCoordenates.long,
                        },
                        scheduleAt: `${valueDate} ${valueHour}`,
                        addressLine: valueAddress,
                      }),
                    });
                  }
                }
              } catch (error) {}
            }}
          >
            Guardar
          </CustomButton>
        </ButtonsActions>
      </CustomIndicationList>
    </div>
  );
};

export default ScheduleDate;

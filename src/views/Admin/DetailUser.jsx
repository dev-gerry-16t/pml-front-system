import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import styled from "styled-components";
import ComponentBorderTopSection from "../../components/componentBorderTopSection";
import ComponentChipInfo from "../../components/componentChipInfo";
import { callGlobalActionApi } from "../../utils/actions/actions";
import FrontFunctions from "../../utils/actions/frontFunctions";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import ComponentSectionDocument from "../../components/componentSectionDocument";

const Container = styled.div`
  padding: 2em 1em;
  .section-container {
    padding: 1em;
  }
`;

const SectionCollapse = styled.div`
  margin-top: 3em;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const Description = styled.div`
  padding: 1em;
  background: #eeeff8;
  border-radius: 1em;
  margin-bottom: 1em;
`;

const ContainerChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1em;
`;

const CreditAsigned = styled.div`
  text-align: center;
  color: var(--color-brand-secondary);
  display: flex;
  flex-direction: column;
  padding-bottom: 2em;
  .type-credit {
    color: var(--color-font-dark);
    font-weight: 900;
    font-family: "Kometa", "Lato";
    padding-top: 10px;
  }
  .button-action {
    margin-top: 2em;
  }
  .format-amount {
    display: flex;
    justify-content: center;
    align-items: baseline;
    column-gap: 0.5em;
    margin-top: 2em;
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

const DetailUser = (props) => {
  const { dataProfile, callGlobalActionApi } = props;
  const { idSystemUser, idLoginHistory } = dataProfile;
  const [dataPawn, setDataPawn] = useState({});

  const frontFunctions = new FrontFunctions();

  const { idPawn } = useParams();
  const navigate = useNavigate();

  const handlerGetPawnById = async () => {
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          idPawn,
        },
        null,
        API_CONSTANTS.ADMIN.GET_PAWN_BY_ID,
        "POST",
        true
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false &&
        isNil(response.response.pawn) === false &&
        isEmpty(response.response.pawn) === false
          ? response.response.pawn
          : {};
      setDataPawn(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.WARNING
      );
    }
  };

  useEffect(() => {
    handlerGetPawnById();
  }, []);

  return (
    <Container>
      <div className="section-shadow section-container">
        <Description>
          <div>
            <strong>Proceso actual:</strong> {dataPawn.process}
          </div>
          <div>
            <strong>Descripción del proceso:</strong>{" "}
            {dataPawn.processDescription}
          </div>
        </Description>
        <ComponentBorderTopSection type="secondary" className="grid-column-2">
          <CreditAsigned>
            <h2 className="type-credit">Prestamo aprobado</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: dataPawn.amount,
              }}
            />
          </CreditAsigned>
          <ContainerChips>
            <ComponentChipInfo title="Nombre:" info={dataPawn.customer} />
            <ComponentChipInfo
              title="Correo:"
              info={dataPawn.customerEmailAddress}
            />
            <ComponentChipInfo
              title="Teléfono:"
              info={dataPawn.customerPhoneNumber}
            />
            <ComponentChipInfo
              title="Único dueño:"
              info={dataPawn.isUniqueOwner === true ? "Si" : "No"}
            />
            <ComponentChipInfo
              title="Tipo de empeño:"
              info={dataPawn.pawnType}
            />
            <ComponentChipInfo title="Vehículo:" info={dataPawn.vehicle} />
          </ContainerChips>
        </ComponentBorderTopSection>
        <SectionCollapse>
          {isEmpty(dataPawn.documentation) === false &&
            dataPawn.documentation.map((row, ix) => {
              return (
                <ComponentSectionDocument
                  key={`section-container-${ix}`}
                  data={row}
                />
              );
            })}
        </SectionCollapse>
      </div>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailUser);

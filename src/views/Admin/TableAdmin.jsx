import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import styled from "styled-components";
import { callGlobalActionApi } from "../../utils/actions/actions";
import FrontFunctions from "../../utils/actions/frontFunctions";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import CustomButton from "../../components/customButton";
import ComponentPagination from "../../components/componentPagination";

const Container = styled.div`
  padding: 1em;
  .section-container {
    padding: 1em;
  }
`;
let tableDad = null;

const TableAdminPawn = (props) => {
  const { dataProfile, callGlobalActionApi, setDataUserProfile } = props;
  const { idSystemUser, idLoginHistory } = dataProfile;
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const navigate = useNavigate();

  const frontFunctions = new FrontFunctions();

  const buttonDetail = (cell, formatterParams, onRendered) => {
    onRendered(() => {
      const data = cell.getData();
      if (isNil(data.path) === false) {
        ReactDOM.render(
          <CustomButton
            type="primary"
            onClick={(event) => {
              navigate(data.path);
            }}
          >
            Ver detalle
          </CustomButton>,
          cell.getElement()
        );
      } else {
        ReactDOM.render(<div></div>, cell.getElement());
      }
    });
  };

  const handlerSetUserInObject = async () => {
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          type: 0,
        },
        null,
        API_CONSTANTS.ADMIN.SET_USER_IN_OBJECT,
        "POST",
        true
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : {};
      if (isEmpty(responseResult) === false) {
        const columns = responseResult.columns.map((row) => {
          let objectColumns = {};
          if (row.idComponentType === 1) {
            objectColumns = {
              title: row.title,
              field: row.field,
              headerSort: row.headerSort,
              sorter: row.sorter,
            };
          } else if (row.idComponentType === 2) {
            objectColumns = {
              title: row.title,
              field: row.field,
              headerSort: row.headerSort,
              sorter: row.sorter,
              formatter: buttonDetail,
            };
          }
          return objectColumns;
        });
        tableDad.setColumns(columns);
      }
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.WARNING
      );
    }
  };

  const handlerGetPawnCoincidences = async () => {
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.ADMIN.GET_PAWN_COINCIDENCES,
        "POST",
        true
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : {};
      if (isEmpty(responseResult) === false) {
        setTotal(responseResult.total);
        tableDad.setData(responseResult.coincidences);
      }
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.WARNING
      );
    }
  };

  useEffect(() => {
    tableDad = new Tabulator("#tabulator-admin-pawn", {
      movableColumns: true,
      columns: [],
      data: [],
    });
    handlerSetUserInObject();
    handlerGetPawnCoincidences();
  }, []);

  return (
    <Container>
      <div className="section-shadow section-container">
        <div>
          <div>
            <h2>Usuarios</h2>
          </div>
          <div></div>
        </div>
        <div id="tabulator-admin-pawn"></div>
        <ComponentPagination
          current={current}
          total={total}
          pageSize={pageSize}
          pageSizeOptions={[10, 20, 50, 100]}
          onChange={(page, sizePage) => {
            setCurrent(page);
            setPageSize(sizePage);
          }}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(TableAdminPawn);

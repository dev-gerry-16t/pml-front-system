import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
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
import CustomInput from "../../components/customInput";
import useDebounce from "../../hooks/useDebounce";

const Container = styled.div`
  padding: 1em;
  .section-container {
    padding: 1em;
  }
`;
let tableDad = null;

const TableAdminPawn = (props) => {
  const { dataProfile, callGlobalActionApi } = props;
  const { idSystemUser, idLoginHistory } = dataProfile;
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [valueSearch, setValueSearch] = useState("");
  const [jsonConditionsState, setJsonConditionsState] = useState(
    JSON.stringify([
      {
        id: 0,
        value: valueSearch,
      },
    ])
  );
  const [paginationState, setPaginationState] = useState(
    JSON.stringify({
      currentPage: current,
      userConfig: pageSize,
    })
  );

  const navigate = useNavigate();
  const valueDebounceSearch = useDebounce(valueSearch, 700);

  const frontFunctions = new FrontFunctions();

  const buttonDetail = (cell, formatterParams, onRendered) => {
    onRendered(() => {
      const data = cell.getData();
      const root = createRoot(cell.getElement());
      if (isNil(data.path) === false) {
        root.render(
          <CustomButton
            type="primary"
            onClick={(event) => {
              navigate(data.path);
            }}
          >
            Ver detalle
          </CustomButton>
        );
      } else {
        root.render(<div></div>);
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
              width: 100,
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

  const handlerGetPawnCoincidences = async (
    jsonConditions = null,
    pagination = "{}"
  ) => {
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          pagination,
          jsonConditions,
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
  }, []);

  useEffect(() => {
    const objectJsonConditions = JSON.stringify([
      {
        id: 0,
        value: valueDebounceSearch,
      },
    ]);
    handlerGetPawnCoincidences(objectJsonConditions, paginationState);
    setJsonConditionsState(objectJsonConditions);
  }, [valueDebounceSearch]);

  return (
    <Container>
      <div className="section-shadow section-container">
        <div>
          <div>
            <h2>Usuarios</h2>
          </div>
          <div></div>
        </div>
        <div
          style={{
            width: "300px",
            marginBottom: "2em",
          }}
        >
          <CustomInput
            value={valueSearch}
            onChange={(e, value) => {
              setValueSearch(value);
            }}
            name="search"
            placeholder="Busca por nombre o proceso"
          />
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
            const objectConditions = JSON.stringify({
              currentPage: page,
              userConfig: sizePage,
            });
            setPaginationState(objectConditions);
            handlerGetPawnCoincidences(jsonConditionsState, objectConditions);
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

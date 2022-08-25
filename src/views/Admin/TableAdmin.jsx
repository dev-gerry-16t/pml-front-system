import React, { useEffect } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { reactFormatter } from "react-tabulator";
import styled from "styled-components";

const Container = styled.div`
  padding: 1em;
  .section-container {
    padding: 1em;
  }
`;
let tableDad = null;

const TableAdminPawn = () => {
  useEffect(() => {
    tableDad = new Tabulator("#tabulator-admin-pawn", {
      columns: [
        {
          title: "Name",
          field: "name",
          headerSort: true,
          sorter: "string",
        },
        {
          title: "Inicio de empeño",
          field: "startPawn",
          headerSort: true,
          sorter: "string",
        },
        {
          title: "Estatus",
          field: "status",
          headerSort: true,
          sorter: "string",
        },
        {
          title: "Detalle",
          field: "detail",
          headerSort: false,
          sorter: false,
          cellClick: function (e, cell) {
            const data = cell.getData();
            console.log("subData", data);
          },
          formatter: reactFormatter(
            <button
              onClick={(event) => {
                //rowDetail(event);
              }}
            >
              Ver
            </button>
          ),
        },
      ],
      data: [
        {
          name: "Gerardo Gonzalez Jimenez",
          startPawn: "14 Junio 2022",
          status: "En proceso",
          detail: "1",
        },
        {
          name: "Noe Hinojosa Torres",
          startPawn: "15 Junio 2022",
          status: "Terminado",
          detail: "1",
        },
        {
          name: "Juan Guzman Ortiz",
          startPawn: "16 Junio 2022",
          status: "Reachazado",
          detail: "1",
        },
      ],
    });
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
      </div>
    </Container>
  );
};

export default TableAdminPawn;

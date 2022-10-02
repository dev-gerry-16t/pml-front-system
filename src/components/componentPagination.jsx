import React, { useEffect, useState } from "react";
import styled from "styled-components";

const SelectOptions = styled.select`
  display: flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  border: 1px solid #dee2e6;
  outline: none;
  color: #0d6efd;
`;

const ComponentPagination = (props) => {
  const { current, total, pageSize, pageSizeOptions, onChange } = props;
  const [paginations, setPaginations] = useState([]);

  useEffect(() => {
    const totalPag = Math.ceil(total / pageSize);
    let initNumber = 0;
    let arrayPagination = [];
    while (initNumber !== totalPag) {
      initNumber++;
      arrayPagination.push(initNumber);
    }
    setPaginations(arrayPagination);
  }, [total, pageSize]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ul className="pagination">
        <li
          className="page-item"
          onClick={() => {
            if (current !== 1) {
              onChange(current - 1, pageSize);
            }
          }}
        >
          &laquo;
        </li>
        {paginations.map((row, ix) => {
          return (
            <li
              key={`pagination-${ix}`}
              onClick={() => {
                onChange(row, pageSize);
              }}
              className={`page-item ${row === current ? "page-select" : ""}`}
            >
              {row}
            </li>
          );
        })}
        <li
          className="page-item"
          onClick={() => {
            if (current !== paginations.length) {
              onChange(current + 1, pageSize);
            }
          }}
        >
          &raquo;
        </li>
      </ul>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <SelectOptions
          value={pageSize}
          onChange={(e) => {
            const numberSelect = Number(e.target.value);
            onChange(1, numberSelect);
          }}
        >
          {pageSizeOptions.map((row, ix) => {
            return (
              <option key={`option-${ix}`} value={row}>
                {row}
              </option>
            );
          })}
        </SelectOptions>
      </div>
    </div>
  );
};

export default ComponentPagination;

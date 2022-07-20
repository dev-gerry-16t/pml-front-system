import React from "react";
import PropTypes from "prop-types";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";
import Icons from "../assets/icons/icons";

const Border = styled.div`
  border: ${(props) =>
    props.border === "primary"
      ? "2px solid var(--color-brand-primary)"
      : "none"};
  border-bottom: ${(props) =>
    props.border === "secondary" ? "1px solid var( --color-font-dark)" : ""};
  border-radius: ${(props) => (props.border === "primary" ? "10px" : "0px")};
  padding: 0.4em;
  display: grid;
  grid-template-columns: 10% 90%;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 1.5em;
  }
`;

const Select = styled.div`
  select {
    border: none;
    font-family: "Lato";
    font-weight: 500;
    font-size: 1.2em;
    width: 100%;
    height: 100%;
    background: transparent;
  }
  ::placeholder {
    color: var(--color-font-light);
  }

  select:focus-visible {
    border: none;
    outline: none;
  }
`;

const CustomSelect = ({
  value = "",
  onChange = () => {},
  name = "",
  placeholder = "",
  subType = null,
  isRequired = false,
  data = [],
  type = "",
  border = "primary",
}) => {
  return (
    <Border border={border}>
      <Icon>{Icons[subType || type]}</Icon>
      <Select>
        <select
          value={value}
          onChange={(e, a) => {
            const dataOption = data.find((row) => {
              return row.id == e.target.value;
            });
            onChange(e, dataOption);
          }}
          name={name}
          placeholder={placeholder}
          required={isRequired}
        >
          <option disabled value="">
            {placeholder}
          </option>
          {isNil(data) === false &&
            isEmpty(data) === false &&
            data.map((row, ix) => {
              return (
                <option key={`${row.id}-${ix}`} value={row.id}>
                  {row.text}
                </option>
              );
            })}
        </select>
      </Select>
    </Border>
  );
};

CustomSelect.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  data: PropTypes.array,
  type: PropTypes.string,
  border: PropTypes.string,
};

export default CustomSelect;

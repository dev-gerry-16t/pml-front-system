import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Icons from "../assets/icons/icons";

const Border = styled.div`
  position: relative;
  border: 2px solid var(--color-brand-primary);
  border-radius: 10px;
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

const IconRight = styled.div`
  position: absolute;
  right: 0px;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0px 1em;
  cursor: pointer;
`;

const Input = styled.div`
  box-sizing: border-box;
  input {
    border: none;
    font-family: "Lato";
    font-weight: 500;
    font-size: 1.2em;
    width: 100%;
    height: 100%;
    background: ${(props) => props.background};
  }
  ::placeholder {
    color: var(--color-font-light);
  }

  input:focus-visible {
    border: none;
    outline: none;
  }
`;

const CustomInput = ({
  value = "",
  onChange = () => {},
  name = "",
  placeholder = "",
  type = "text",
  subType = null,
  isRequired = false,
  pattern = null,
  background = "transparent",
}) => {
  const [isVisibleDefault, setIsVisibleDefault] = useState(true);
  return (
    <Border>
      <Icon>{Icons[subType || type]}</Icon>
      <Input background={background}>
        <input
          value={value}
          onChange={onChange}
          name={name}
          placeholder={placeholder}
          type={isVisibleDefault === true ? type : "text"}
          required={isRequired}
          pattern={pattern}
        />
      </Input>
      {type === "password" && name !== "confirmPassword" && (
        <IconRight
          onClick={() => {
            setIsVisibleDefault(!isVisibleDefault);
          }}
        >
          {isVisibleDefault === true ? Icons["show"] : Icons["hide"]}
        </IconRight>
      )}
    </Border>
  );
};

CustomInput.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  subType: PropTypes.string,
  isRequired: PropTypes.bool,
  pattern: PropTypes.string,
};

export default CustomInput;

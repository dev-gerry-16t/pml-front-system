import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Icons from "../assets/icons/icons";

const Border = styled.div`
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

const Input = styled.div`
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
  return (
    <Border>
      <Icon>{Icons[subType || type]}</Icon>
      <Input background={background}>
        <input
          value={value}
          onChange={onChange}
          name={name}
          placeholder={placeholder}
          type={type}
          required={isRequired}
          pattern={pattern}
        />
      </Input>
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

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { motion } from "framer-motion";

const Button = styled(motion.button)`
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  cursor: pointer;
  border: ${(props) => props.border};
  border-radius: 0.6em;
  font-family: "Lato";
  font-weight: 500;
  font-size: 1.2em;
  text-decoration: ${(props) => props.decoration};
`;

const CustomButton = ({
  formatType = "secondary",
  style = {},
  type = "",
  text = "",
  children,
  onClick = () => {},
}) => {
  const color = {
    secondary: "var(--color-font-secondary)",
    tertiary: "var(--color-brand-secondary)",
    "underline-secondary": "var(--color-brand-secondary)",
    close: "var(--color-brand-secondary)",
  };
  const background = {
    secondary: "var(--color-brand-secondary)",
    tertiary: "var(--color-backGround-section)",
    "underline-secondary": "transparent",
    close: "transparent",
  };
  const border = {
    secondary: "none",
    tertiary: "1px solid var(--color-brand-secondary)",
    "underline-secondary": "none",
    close: "none",
  };

  const decoration = {
    secondary: "none",
    tertiary: "none",
    "underline-secondary": "underline",
    close: "none",
  };
  return (
    <Button
      style={style}
      color={color[formatType]}
      background={background[formatType]}
      border={border[formatType]}
      decoration={decoration[formatType]}
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.95 }}
    >
      {children || text}
    </Button>
  );
};

CustomButton.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  style: PropTypes.object,
  formatType: PropTypes.string,
  children: PropTypes.any,
  onClick: PropTypes.func,
};

export default CustomButton;

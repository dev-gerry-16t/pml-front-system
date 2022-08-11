import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import CustomButton from "./customButton";
import CustomPrincipalTitle from "./customTitleLogin";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      duration: 1,
    },
  },
};

const ComponentSuccess = ({
  greet = "",
  subGreet = "",
  status = "",
  labelButton = "",
  onClick = () => {},
}) => {
  return (
    <div className="success-container">
      <div className="background-city">
        <img
          className="background-img-2"
          src="https://prendamovil-assets.s3.us-east-2.amazonaws.com/pml-city-middle.png"
          alt="Imagen-ciudad"
        />
      </div>
      <div className="info-form-center">
        <img
          width={200}
          className="logo-pml"
          src="https://prendamovil-assets.s3.us-east-2.amazonaws.com/logo-prenda-light.png"
          alt="Imagen-ciudad"
        />
        <CustomPrincipalTitle greet={greet} subGreet={subGreet} />
        <span
          style={{
            marginTop: "1em",
          }}
          className="indication"
        >
          {status}
        </span>
        <div
          style={{
            marginTop: "5em",
          }}
          className="align-button"
        >
          <CustomButton
            type="submit"
            formatType="secondary"
            text={labelButton}
            style={{
              padding: "0.3em 0px",
              width: "40%",
            }}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};

ComponentSuccess.propTypes = {
  greet: PropTypes.string,
  subGreet: PropTypes.string,
  status: PropTypes.string,
  labelButton: PropTypes.string,
  onClick: PropTypes.func,
};

export default ComponentSuccess;

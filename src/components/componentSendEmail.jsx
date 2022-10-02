import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CustomPrincipalTitle from "./customTitleLogin";
import CustomButton from "./customButton";

const TitleOne = styled.div`
  margin-top: 1.5em;
  span {
    font-family: "Lato";
    font-size: 1.2em;
    font-weight: 400;
    color: var(--color-font-normal);
  }
`;

const TitleTwo = styled.div`
  text-align: center;
  margin-top: 2em;
  span {
    font-family: "Lato";
    font-size: 1em;
    font-weight: 400;
    color: var(--color-font-normal);
  }
`;

const LinkCircle = styled.div`
  margin: 4em 0px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  .link-to-email {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    .circle {
      width: 6.25em;
      height: 6.25em;
      border-radius: 50%;
      background: #eeeff8;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    span {
      margin-top: 0.8em;
      font-family: "Lato";
      font-size: 1.2em;
      font-weight: 700;
      color: #00d0b0;
    }
  }
`;

const ComponentSendEmail = ({
  email = "",
  onClick = () => {},
  text = "para activar tu cuenta",
}) => {
  return (
    <div className="container-send-email">
      <div className="section-info-email">
        <div>
          <img
            src="https://prendamovil-assets.s3.us-east-2.amazonaws.com/pml-car-icon.png"
            alt="prendamovil-icon-car"
          />
        </div>
        <div>
          <CustomPrincipalTitle
            greet="Consulta tu"
            subGreet="Correo electrónico"
            align="center"
          />
        </div>
        <TitleOne>
          <span>
            Te hemos enviado un mensaje a <strong>{email}</strong> con un enlace{" "}
            {text}
          </span>
        </TitleOne>
        <LinkCircle>
          <div
            className="link-to-email"
            onClick={() => {
              window.open(
                "https://www.google.com/intl/es-419/gmail/about/",
                "_blank"
              );
            }}
          >
            <div className="circle">
              <img
                src="https://prendamovil-assets.s3.us-east-2.amazonaws.com/logos-google-gmail.png"
                alt="Correo Gmail"
              />
            </div>
            <span>Abrir Gmail</span>
          </div>
          <div
            className="link-to-email"
            onClick={() => {
              window.open("https://login.live.com/", "_blank");
            }}
          >
            <div className="circle">
              <img
                src="https://prendamovil-assets.s3.us-east-2.amazonaws.com/logos-microsoft-outlook.png"
                alt="Correo Outlook"
              />
            </div>
            <span>Abrir Outlook</span>
          </div>
        </LinkCircle>
        <div className="align-button">
          <CustomButton
            style={{
              padding: "0.4em 0px",
              width: "70%",
            }}
            formatType="tertiary"
            onClick={onClick}
          >
            Reenviar Correo
          </CustomButton>
        </div>
        <TitleTwo>
          <span>
            Te hemos enviado un correo, es necesario seguir las instrucciones
            para continuar con tu proceso de empeño. Revisa tu bandeja de correo
            no deseado.
          </span>
        </TitleTwo>
      </div>
    </div>
  );
};

ComponentSendEmail.propTypes = {
  email: PropTypes.string,
  onClick: PropTypes.func,
};

export default ComponentSendEmail;

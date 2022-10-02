import React from "react";
import CustomPrincipalTitle from "../../components/customTitleLogin";

const CompletedSuccess = () => {
  return (
    <div>
      <div className="success-container-2">
        <div className="background-city">
          <img
            className="background-img-2"
            src="https://prendamovil-assets.s3.us-east-2.amazonaws.com/pml-car-success.png"
            alt="Imagen-ciudad"
          />
        </div>
        <div className="info-form-center">
          <img
            style={{
              marginBottom: "2em",
            }}
            width={150}
            className=""
            src="https://prendamovil-assets.s3.us-east-2.amazonaws.com/logo-prenda-light.png"
            alt="Imagen-ciudad"
          />
          <CustomPrincipalTitle greet="¡Felicidades!" subGreet="" />
          <span
            style={{
              marginTop: "1em",
              textAlign:"center",
              width: "20em"
            }}
            className="indication"
          >
            Concluiste tu proceso, en breve recibirás respuesta por parte del
            equipo Prendamovil
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompletedSuccess;

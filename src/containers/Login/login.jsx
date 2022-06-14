import React from "react";
import "./css/styleLogin.scss";

const Login = () => {
  return (
    <div className="login-container">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "5px",
        }}
      >
        <input placeholder="Correo" type="text" />
        <input placeholder="Contraseña" type="password" />
        <button>Ingresar</button>
      </div>
    </div>
  );
};

export default Login;

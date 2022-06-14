import React from "react";
import { useNavigate,useLinkClickHandler } from "react-router-dom";

const Verification = (props) => {
  const navigate = useNavigate();

  const handlerOnClick = () => {
    navigate("/websystem/home");
  };

  return (
    <div>
      Hola Verification
      <button onClick={handlerOnClick}>REGRESAR</button>
    </div>
  );
};

export default Verification;

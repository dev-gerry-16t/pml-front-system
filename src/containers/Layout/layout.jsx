import React from "react";
import { Route, Routes, NavLink, Link } from "react-router-dom";
import Home from "../../views/Home";
import Verification from "../../views/Verification";

const DefaultLayout = (props) => {
  console.log("ok");
  return (
    <div>
      <div
        style={{
          display: "flex",
          columnGap: "5px",
        }}
      >
        <Link to="home">Home</Link>
        <Link to="verificacion">Verificación</Link>
      </div>
      <div>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="verificacion" element={<Verification />} />
        </Routes>
      </div>
    </div>
  );
};

export default DefaultLayout;

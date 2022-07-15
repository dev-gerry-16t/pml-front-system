import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import CustomButton from "./customButton";
import CustomIndicationList from "./customIndicationList";
import ComponentShotCamera from "./componentShotCamera";
import ComponentViewImage from "./componentViewImage";

const ComponentProcessDocument = () => {
  const [isVisibleCamera, setIsVisibleCamera] = useState(false);
  const [isVisibleImage, setIsVisibleImage] = useState(false);
  const [dataSrcShot, setDataSrcShot] = useState("");

  return (
    <div className="section-shadow padding-2-1">
      <AnimatePresence>
        {isVisibleCamera === true && (
          <ComponentShotCamera
            labelImage="Label 1"
            type="selfie"
            onClickShot={(src) => {
              setDataSrcShot(src);
              setIsVisibleImage(true);
              setIsVisibleCamera(false);
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isVisibleImage === true && (
          <ComponentViewImage
            src={dataSrcShot}
            indication="Verifica que tu foto sea visible"
            onClickContinue={() => {}}
            onClickOther={() => {
              setIsVisibleImage(false);
              setIsVisibleCamera(true);
            }}
          />
        )}
      </AnimatePresence>

      <CustomIndicationList
        stepNumber="Paso 2 de 4"
        subTitle="Sube un documento de identidad vigente"
        isVisibleButton={false}
        onClick={async () => {}}
      >
        <div className="align-button">
          <CustomButton
            style={{
              padding: "0.5em 2em",
            }}
            onClick={() => {
              setIsVisibleCamera(true);
            }}
          >
            Tomar foto
          </CustomButton>
        </div>
      </CustomIndicationList>
    </div>
  );
};

export default ComponentProcessDocument;

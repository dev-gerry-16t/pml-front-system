import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FileViewer from "react-file-viewer";
import styled from "styled-components";
import CustomButton from "./customButton";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      duration: 0.5,
    },
  },
};

const ModalImage = styled.div`
  background: transparent;
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100%;
  z-index: 100;
  padding: 1em;
  box-sizing: border-box;
`;

const ResultImage = styled.div`
  padding: 2em 1em;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  //align-content: space-between;
  justify-content: space-between;
  .title-result {
    text-align: center;
    font-weight: 900;
    span {
      font-size: 1.2em;
    }
  }
  .image-outline {
    border: 1px solid var(--color-brand-secondary);
    border-radius: 2em;
    padding: 1em;
    min-height: 300px;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 50vh;
      object-fit: cover;
      border-radius: 1em;
    }
  }
`;

const ComponentViewDocument = (props) => {
  const { src, indication, onClickOther, onClickContinue, metaDataFile } =
    props;
  const [isVisibleDocument, setIsVisibleDocument] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsVisibleDocument(true);
    }, 1000);

    return () => {
      setIsVisibleDocument(false);
    };
  }, []);

  return (
    <ModalImage>
      <div className="section-modal">
        <ResultImage>
          <div className="title-result">
            <span>{indication}</span>
          </div>
          <div className="image-outline">
            {isVisibleDocument === true && (
              <FileViewer
                fileType={metaDataFile.extension}
                filePath={src}
                onError={() => {}}
              />
            )}
          </div>
          <div className="align-button-row">
            <CustomButton
              style={{
                padding: "0.5em 0px",
              }}
              onClick={async () => {
                const urlObject = await fetch(src);
                const blobFile = await urlObject.blob();
                onClickContinue(blobFile);
              }}
            >
              Continuar
            </CustomButton>
            <CustomButton
              style={{
                padding: "0.5em 0px",
              }}
              formatType="tertiary"
              onClick={onClickOther}
            >
              Cancelar
            </CustomButton>
          </div>
        </ResultImage>
      </div>
    </ModalImage>
  );
};

export default ComponentViewDocument;

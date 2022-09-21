import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

const ModalView = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  z-index: 101;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  .mask-section {
    width: 100%;
    box-sizing: border-box;
    background: var(--color-backGround-section);
    height: 100%;
    .contain-doc-view {
      width: 100%;
      box-sizing: border-box;
    }
  }
`;

const ButtonHeader = styled.div`
  min-height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .button-modal {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    background: rgba(35, 50, 153, 0.3);
  }
`;

const SectionHeader = styled.div`
  padding: 0px 2em;
  display: flex;
  justify-content: space-between;
  .cursor-collapse {
    cursor: pointer;
    padding: 3px;
  }
  h3 {
    margin: 0px;
  }
`;

const SectionMain = styled.div`
  max-height: ${(props) => (props.show === true ? "1000px" : "0px")};
  transition: max-height 0.5s ease-in-out;
  overflow: ${(props) => (props.show === true ? "scroll" : "hidden")};
`;

const ContainerDocuments = styled.div`
  border-top: 1px solid #090c41;
  padding: 1em;
`;

const ContainerDocument = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin-top: 2em;
  /* border-bottom: 1px solid #090c41; */
  .info-text-action {
    display: grid;
    grid-template-rows: 2fr 1fr auto;
    .data-info {
      padding: 0px 1em;
      h3 {
        margin: 0px 0px 1em 0px;
      }
    }
    .buttons-action {
      display: flex;
      align-items: center;
      column-gap: 1em;
      padding: 0px 1em;
    }
  }
  .documents-preview {
    background: var(--color-backGround-light);
    padding: 1em;
    .border-upload {
      border: 3px solid var(--color-brand-primary);
      padding: 2em;
      border-radius: 1em;
      cursor: pointer;
      .contain-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .title-file-type {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          font-size: 2.5em;
          color: var(--color-brand-primary);
          text-align: center;
          font-weight: 800;
          text-transform: uppercase;
        }
      }
    }
  }
`;

const ComponentSectionDocument = (props) => {
  const { data } = props;
  const [isShowSection, setIsShowSection] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isVisibleDocument, setIsVisibleDocument] = useState(false);
  const [selectDataFile, setSelectDataFile] = useState({});

  const handlerCloseModalFile = () => {
    setSelectedId(null);
    setIsVisibleDocument(false);
  };

  return (
    <div className="section-shadow section-container">
      {selectedId && (
        <ModalView layoutId={selectedId} onClick={handlerCloseModalFile}>
          <div className="mask-section" onClick={(e) => e.stopPropagation()}>
            <ButtonHeader>
              <button className="button-modal" onClick={handlerCloseModalFile}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path
                    d="M15 5L5 15M5 5l5.03 5.03L15 15"
                    fill="black"
                    strokeWidth="2"
                    stroke=" var(--color-brand-primary)"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </button>
            </ButtonHeader>
            {isVisibleDocument === true && (
              <div className="contain-doc-view">
                <DocViewer
                  pluginRenderers={DocViewerRenderers}
                  documents={[
                    {
                      uri: selectDataFile.path,
                      fileType: selectDataFile.extension,
                    },
                  ]}
                  config={{
                    header: {
                      disableHeader: true,
                      disableFileName: true,
                      retainURLParams: false,
                    },
                  }}
                  style={{ height: "900px" }}
                />
              </div>
            )}
          </div>
        </ModalView>
      )}
      <SectionHeader>
        <h3>{data.documentGroup}</h3>
        <div
          className="cursor-collapse"
          onClick={() => {
            setIsShowSection(!isShowSection);
          }}
        >
          {isShowSection === false ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.5L12 15.5L5 8.5"
                stroke="#200E32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 15.5L12 8.5L19 15.5"
                stroke="#200E32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </SectionHeader>
      <SectionMain show={isShowSection}>
        <ContainerDocuments>
          {isEmpty(data.document) === false &&
            data.document.map((row, ix) => {
              return (
                <ContainerDocument
                  key={`document-${ix}`}
                  style={{
                    padding: "1em",
                  }}
                  className="section-shadow"
                >
                  <div className="documents-preview">
                    <div
                      className="border-upload"
                      onClick={() => {
                        setSelectedId(row.idDocument);
                        setSelectDataFile(row);
                        setIsVisibleDocument(true);
                      }}
                    >
                      {isEmpty(row.mimeType) === false &&
                      row.mimeType.indexOf("image") !== -1 ? (
                        <img
                          className="contain-image"
                          src={row.path}
                          alt={row.idDocument}
                        />
                      ) : (
                        <div className="title-file-type">
                          <span>{row.extension}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="info-text-action">
                    <div className="data-info">
                      <h3>{row.documentType}</h3>
                      <div>
                        <strong>Nombre del archivo:</strong> {row.name}
                      </div>
                      <div>
                        <strong>Subido por:</strong> {row.uploadedBy}
                      </div>
                      <div>
                        <strong>Fecha de subida:</strong>{" "}
                        {row.createdAtFormatted}
                      </div>
                    </div>
                  </div>
                </ContainerDocument>
              );
            })}
        </ContainerDocuments>
      </SectionMain>
    </div>
  );
};

export default ComponentSectionDocument;

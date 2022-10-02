import React from "react";
import styled from "styled-components";

const ModalView = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  z-index: 101;
  display: ${(props) => (props.isVisible === true ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .mask-section {
    width: 60vw;
    min-height: 50vh;
    box-shadow: 0px 0px 0px 100vh rgba(35, 50, 153, 0.6);
    padding: 1em;
    background: var(--color-backGround-light);
    border-radius: 1em;
    border: none;
    .contain-doc-view {
      width: 100%;
      height: 70vh;
      overflow: scroll;
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

const CustomModal = (props) => {
  const { onClose = () => {}, children, isVisible } = props;
  return (
    <ModalView onClick={onClose} isVisible={isVisible}>
      <div className="mask-section" onClick={(e) => e.stopPropagation()}>
        <ButtonHeader>
          <button className="button-modal" onClick={onClose}>
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
        {children}
      </div>
    </ModalView>
  );
};

export default CustomModal;

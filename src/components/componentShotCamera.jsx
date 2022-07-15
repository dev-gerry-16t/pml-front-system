import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { IconCamera } from "../assets/icons";
import { useEffect } from "react";

let stream;

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

const ModalCamera = styled(motion.div)`
  background: var(--color-backGround-section);
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100%;
  z-index: 100;
  #video-shot {
    width: 100vw;
    height: 100vh;
  }
`;

const ButtonCam = styled.div`
  position: absolute;
  bottom: 8vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em 0px;
  .screen-shot {
    outline: none;
    border: none;
    width: 6em;
    height: 6em;
    border-radius: 50%;
    background: var(--color-brand-secondary);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const LabelShot = styled.div`
  position: absolute;
  top: 0px;
  width: 100%;
  text-align: center;
  padding: 2em 0px;
  z-index: 1;
  h2 {
    margin: 0px;
    color: var(--color-backGround-section);
  }
`;

const ComponentShotCamera = (props) => {
  const { labelImage, onClickShot, type } = props;

  const handlerOpenCamera = async () => {
    const constraints = {
      video: {
        facingMode: type === "selfie" ? "user" : { exact: "environment" },
        // width: { max: window.innerWidth },
        // height: { min: window.innerHeight },
      },
    };

    const video = document.querySelector("video");
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = stream;
      video.autoplay = true;
    } catch (error) {
      window.alert(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handlerOpenCamera();
    }, 500);
    return () => {
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
    };
  }, []);

  return (
    <ModalCamera
      variants={container}
      initial={{
        scale: 0,
      }}
      animate={{
        scale: 1,
      }}
      exit={{
        scale: 0,
      }}
    >
      <div className="content-video">
        <LabelShot>
          <h2>{labelImage}</h2>
        </LabelShot>
        <div className="mask-video">
          <div id="screen-shot" className="face"></div>
        </div>
        <video id="video-shot" autoPlay={true}></video>
        <ButtonCam>
          <motion.button
            className="screen-shot"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => {
              const video = document.querySelector("video");
              const canvas = document.createElement("canvas");
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              canvas.getContext("2d").drawImage(video, 0, 0);
              const srcImage = canvas.toDataURL("image/jpeg");
              onClickShot(srcImage);
            }}
          >
            <IconCamera size="3em" />
          </motion.button>
        </ButtonCam>
      </div>
    </ModalCamera>
  );
};

export default ComponentShotCamera;

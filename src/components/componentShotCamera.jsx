import React from "react";
import isNil from "lodash/isNil";
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
    color: var(--color-brand-secondary);
  }
`;

const ComponentShotCamera = (props) => {
  const { labelImage, onClickShot, type } = props;

  const handlerOpenCamera = async () => {
    try {
      if (
        "mediaDevices" in navigator &&
        "getUserMedia" in navigator.mediaDevices
      ) {
        const constraints = {
          audio: false,
          video: {
            facingMode: type === "selfie" ? "user" : "environment",
            width: { min: 600 },
            height: { min: 600 },
          },
        };
        const video = document.querySelector("video");
        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
          video.srcObject = stream;
          video.onloadedmetadata = () => {
            video.play();
          };
        });
      } else {
        window.alert("Dispositivo no compatible");
      }
    } catch (error) {
      window.alert(
        "No se encontró un dispositivo compatible con la configuración proporcionada"
      );
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handlerOpenCamera();
    }, 500);
    return () => {
      console.log("stream", stream);
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
          <div id="screen-shot" className={type}></div>
        </div>
        <video id="video-shot" muted autoplay playsinline></video>
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
              const metadata = {
                name: window.crypto.randomUUID(),
                type: "image/jpeg",
                extension: "jpeg",
              };
              video.pause();
              video.currentTime = 0;
              onClickShot(srcImage, metadata);
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

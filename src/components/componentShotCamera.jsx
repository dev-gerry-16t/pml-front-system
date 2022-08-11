import React, { useEffect, useState } from "react";
import isNil from "lodash/isNil";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { IconCamera } from "../assets/icons";

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

const ModalCamera = styled.div`
  background: var(--color-backGround-section);
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100%;
  z-index: 100;
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
  .change-camera-type {
    position: absolute;
    outline: none;
    border: none;
    width: 4em;
    height: 4em;
    border-radius: 50%;
    background: var(--color-brand-secondary);
    right: 3em;
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
  const [isUserFacing, setIsUserFacing] = useState(true);
  const constraints = (window.constraints = {
    audio: false,
    video: true,
  });

  const handleSuccess = (stream) => {
    const video = document.querySelector("video");
    stream.getTracks().forEach((t) => {
      t.onmute = (e) => {};
      t.onunmute = (e) => {};
      t.onended = (e) => {};
    });
    video.srcObject = stream;
    video.play();
  };

  const handleError = (error) => {
    window.alert("No otorgaste los permisos para continuar");
  };

  const handlerOpenCamera = async () => {
    try {
      window.stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess(window.stream);
    } catch (error) {
      handleError(error);
    }
    // try {
    //   if (
    //     "mediaDevices" in navigator &&
    //     "getUserMedia" in navigator.mediaDevices
    //   ) {
    //     const constraints = {
    //       audio: false,
    //       video: {
    //         facingMode: type === "selfie" ? "user" : "environment",
    //         width: { min: 600 },
    //         height: { min: 600 },
    //       },
    //     };
    //     const video = document.querySelector("video");
    //     navigator.mediaDevices
    //       .getUserMedia(constraints)
    //       .then((stream) => {
    //         video.srcObject = stream;
    //         video.onloadedmetadata = () => {
    //           video.play();
    //         };
    //       })
    //       .catch((error) => {
    //         window.alert(`Dispositivo no compatible ${error}`);
    //       });
    //   } else {
    //     window.alert("Dispositivo no compatible");
    //   }
    // } catch (error) {
    //   window.alert(
    //     "No se encontró un dispositivo compatible con la configuración proporcionada"
    //   );
    // }
  };

  useEffect(() => {
    setTimeout(() => {
      handlerOpenCamera();
    }, 1000);
    return () => {};
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
        <video
          style={{
            width: "100%",
          }}
          autoPlay
          playsInline
        ></video>
        <ButtonCam>
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.8 }}
            className="change-camera-type"
            onClick={async () => {
              const facingMode = isUserFacing ? "environment" : "user";
              const newStream = await navigator.mediaDevices.getUserMedia({
                video: {
                  facingMode,
                },
              });
              const [newVideoTrack] = newStream.getVideoTracks();
              const [oldVideoTrack] = window.stream.getVideoTracks();
              handleSuccess(newStream);
              window.stream.removeTrack(oldVideoTrack);
              window.stream.addTrack(newVideoTrack);
              oldVideoTrack.stop();
              setIsUserFacing(false);
            }}
          >
            Cambiar
          </motion.button>
          <motion.button
            className="screen-shot"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => {
              const video = document.querySelector("video");
              const canvas = document.createElement("canvas");
              const WIDTH = video.videoWidth + video.videoWidth * 0.25;
              const HEIGHT = video.videoHeight + video.videoHeight * 0.25;
              canvas.width = WIDTH;
              canvas.height = HEIGHT;
              canvas.getContext("2d").drawImage(video, 0, 0, WIDTH, HEIGHT);
              const srcImage = canvas.toDataURL("image/jpeg");
              const metadata = {
                name: window.crypto.randomUUID(),
                type: "image/jpeg",
                extension: "jpeg",
              };
              window.stream.getTracks().forEach(function (track) {
                window.stream.removeTrack(track);
                track.stop();
                video.pause();
              });
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

import React, { useEffect, useState } from "react";
import isNil from "lodash/isNil";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { IconCamera, IconBackCamera, IconFrontCamera } from "../assets/icons";
import FrontFunctions from "../utils/actions/frontFunctions";

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

let imageCapture;
let widthImage;
let heightImage;

const ComponentShotCamera = (props) => {
  const { labelImage, onClickShot, type } = props;
  const [isUserFacing, setIsUserFacing] = useState(true);
  const constraints = (window.constraints = {
    audio: false,
    video: true,
  });

  const frontFunctions = new FrontFunctions();

  const valueOptimeSize = (sizes) => {
    const widthObject = sizes.imageWidth;
    const heightObject = sizes.imageHeight;
    const ratio = widthObject.min / heightObject.min;

    if (widthObject.min === widthObject.max) {
      widthImage = widthObject.min;
    } else {
      let optimeWidth = widthObject.min * 2;
      if (optimeWidth <= widthObject.max && optimeWidth >= 600) {
        widthImage = optimeWidth;
      }
    }

    if (heightObject.min === heightObject.max) {
      heightImage = heightObject.min;
    } else {
      let optimeHeight = heightObject.min * 2;
      if (optimeHeight <= heightObject.max && optimeHeight >= 600) {
        heightImage = optimeHeight;
      }
    }

    let resultRatio = widthImage / heightImage;

    if (
      ratio !== resultRatio &&
      widthObject.min !== widthObject.max &&
      heightObject.min !== heightObject.max
    ) {
      widthImage = (widthObject.min + widthObject.max) / 2;
      heightImage = (heightObject.min + heightObject.max) / 2;
    }
  };

  const handleSuccessV2 = async (stream) => {
    const video = document.querySelector("video");
    const track = stream.getVideoTracks()[0];
    imageCapture = new ImageCapture(track);
    const capabilitiesImage = await imageCapture.getPhotoCapabilities();
    valueOptimeSize(capabilitiesImage);
    video.srcObject = stream;
    video.play();
  };

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

  const handlerOpenCameraV2 = async () => {
    try {
      window.stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccessV2(window.stream);
    } catch (error) {
      handleError(error);
    }
  };

  const handlerOpenCamera = async () => {
    try {
      window.stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess(window.stream);
    } catch (error) {
      handleError(error);
    }
  };

  const handlerTakePhoto = () => {
    const video = document.querySelector("video");
    const canvas = document.createElement("canvas");
    const WIDTH = video.videoWidth + video.videoWidth * 0.05;
    const HEIGHT = video.videoHeight + video.videoHeight * 0.05;
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
  };

  const handlerTakePhotoV2 = () => {
    imageCapture
      .takePhoto({ imageHeight: heightImage, imageWidth: widthImage })
      .then((blob) => {
        const typeFile = blob.type;
        const extensionFile = frontFunctions.getExtensionFile(typeFile);
        const metadata = {
          name: window.crypto.randomUUID(),
          type: typeFile,
          extension: extensionFile,
        };
        onClickShot(blob, metadata);
      })
      .catch((error) => {});
  };

  const handlerChangeCamera = async () => {
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
  };

  const handlerChangeCameraV2 = async () => {
    const facingMode = isUserFacing ? "environment" : "user";
    const newStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode,
      },
    });
    const [newVideoTrack] = newStream.getVideoTracks();
    const [oldVideoTrack] = window.stream.getVideoTracks();
    handleSuccessV2(newStream);
    window.stream.removeTrack(oldVideoTrack);
    window.stream.addTrack(newVideoTrack);
    oldVideoTrack.stop();
    setIsUserFacing(!isUserFacing);
  };

  useEffect(() => {
    setTimeout(() => {
      handlerOpenCameraV2();
      //handlerOpenCamera();
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
            onClick={handlerChangeCameraV2}
          >
            {isUserFacing === true ? (
              <IconBackCamera size="2em" />
            ) : (
              <IconFrontCamera size="2em" />
            )}
          </motion.button>
          <motion.button
            className="screen-shot"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.8 }}
            onClick={handlerTakePhotoV2}
          >
            <IconCamera size="3em" />
          </motion.button>
        </ButtonCam>
      </div>
    </ModalCamera>
  );
};

export default ComponentShotCamera;

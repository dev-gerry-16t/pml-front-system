import React, { useEffect, useState } from "react";

const TestScreen = () => {
  const [isUserFacing, setIsUserFacing] = useState(true);
  const [srcImage, setSrcImage] = useState("");
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
    window.alert(error.name);
  };

  const handlerOpenCamera = async () => {
    try {
      window.stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess(window.stream);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handlerOpenCamera();
    }, 500);
    return () => {
      //   window.stream.getTracks().forEach(function (track) {
      //     track.stop();
      //   });
    };
  }, []);
  return (
    <div>
      <video
        style={{
          width: "100%",
        }}
        id="video-shot"
        autoPlay
        playsInline
      ></video>
      <img src={srcImage} alt="sdasd" />
      <button
        onClick={() => {
          const video = document.querySelector("video");
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext("2d").drawImage(video, 0, 0);
          const srcImageUrl = canvas.toDataURL("image/jpeg");
          setSrcImage(srcImageUrl);
          window.stream.getTracks().forEach(function (track) {
            track.stop();
          });
          //   const [oldVideoTrack] = window.stream.getVideoTracks();
          //   console.log("oldVideoTrack", oldVideoTrack);
          //   oldVideoTrack.stop();
        }}
      >
        Tomar Foto
      </button>
      <button
        onClick={async () => {
          const facingMode = isUserFacing ? "environment" : "user";
          const newStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode },
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
        Cambiar cámara
      </button>
    </div>
  );
};

export default TestScreen;

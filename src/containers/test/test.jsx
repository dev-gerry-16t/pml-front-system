import React, { useEffect, useState } from "react";
import FrontFunctions from "../../utils/actions/frontFunctions";
let imageCapture;
let widthImage;
let heightImage;

const TestScreen = () => {
  const [isUserFacing, setIsUserFacing] = useState(true);
  const [srcImage, setSrcImage] = useState("");
  const [capabilities, setCapabilities] = useState("");
  const [enumerateDevices, setEnumerateDevices] = useState("");
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

  const handleSuccess2 = async (stream) => {
    const video = document.querySelector("video");
    const track = stream.getVideoTracks()[0];
    imageCapture = new ImageCapture(track);
    const capabilitiesImage = await imageCapture.getPhotoCapabilities();
    valueOptimeSize(capabilitiesImage);
    video.srcObject = stream;
    video.play();
    setEnumerateDevices(JSON.stringify(capabilitiesImage, null, 2));
  };

  const handleSuccess = async (stream) => {
    const video = document.querySelector("video");
    stream.getVideoTracks().forEach((t) => {
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

  const handlerOpenCamera2 = async () => {
    try {
      window.stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess2(window.stream);
      // setEnumerateDevices(
      //   JSON.stringify(await navigator.mediaDevices.enumerateDevices(), null, 2)
      // );
    } catch (error) {
      handleError(error);
    }
  };

  const onTakePhotoButtonClick = () => {
    console.log("window.imageCapture", imageCapture);
    console.log("heightImage", heightImage);
    console.log("widthImage", widthImage);
    setCapabilities(`Imagen de tamaño ${widthImage}x${heightImage}`);
    imageCapture
      .takePhoto({ imageHeight: heightImage, imageWidth: widthImage })
      .then((blob) => {
        console.log("blob", blob);
        const typeFile = blob.type;
        const extensionFile = frontFunctions.getExtensionFile(typeFile);
        console.log("typeFile", typeFile);
        console.log("extensionFile", extensionFile);
        const metadata = {
          name: window.crypto.randomUUID(),
          type: typeFile,
          extension: extensionFile,
        };
        setSrcImage(URL.createObjectURL(blob));
      })
      // .then((imageBitmap) => {
      //   console.log('imageBitmap',imageBitmap);
      //   setEnumerateDevices(imageBitmap);
      // })
      .catch((error) => {});
  };

  useEffect(() => {
    setTimeout(() => {
      handlerOpenCamera2();
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
          onTakePhotoButtonClick();
          // const video = document.querySelector("video");
          // const canvas = document.createElement("canvas");
          // canvas.width = video.videoWidth;
          // canvas.height = video.videoHeight;
          // canvas.getContext("2d").drawImage(video, 0, 0);
          // const srcImageUrl = canvas.toDataURL("image/jpeg");
          // setSrcImage(srcImageUrl);
          // window.stream.getTracks().forEach(function (track) {
          //   track.stop();
          // });
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
          handleSuccess2(newStream);
          window.stream.removeTrack(oldVideoTrack);
          window.stream.addTrack(newVideoTrack);
          oldVideoTrack.stop();
          setIsUserFacing(false);
        }}
      >
        Cambiar cámara
      </button>
      <div>
        <textarea
          value={capabilities}
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <div>
        <textarea
          value={enumerateDevices}
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
      </div>
    </div>
  );
};

export default TestScreen;

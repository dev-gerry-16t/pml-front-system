import React, { useEffect, useCallback } from "react";

const MatiButton = ({
  clientid,
  loaded,
  country,
  product,
  metadata,
  exited,
  finished,
  flowId,
  color,
  textcolor,
}) => {
  const button = React.createRef(null);
  const colorsTheme = {
    "theme-light": "#ff0282",
    "theme-dark": "#0c101d",
    "theme-purple": "#9a78b0",
    "theme-dark-blue": "#072146",
  };

  const handleLoaded = useCallback(() => {
    loaded();
  }, []);

  const handleFinished = useCallback(({ detail }) => {
    finished(detail);
  }, []);

  const handleExited = useCallback(() => {
    exited();
  }, []);

  useEffect(() => {
    const ref = button.current;
    if (ref) {
      // subscribe to callbacks
      ref.addEventListener("mati:loaded", handleLoaded);
      ref.addEventListener("mati:userFinishedSdk", handleFinished);
      ref.addEventListener("mati:exitedSdk", handleExited);
    }
    return () => {
      if (ref) {
        // unsubscribe from callbacks
        ref.removeEventListener("mati:loaded", handleLoaded);
        ref.removeEventListener("mati:userFinishedSdk", handleFinished);
        ref.removeEventListener("mati:exitedSdk", handleExited);
      }
    };
  }, [button, handleLoaded, handleFinished, handleExited]);

  return (
    <mati-button
      color={color}
      ref={button}
      clientid={clientid}
      country={country}
      metadata={JSON.stringify(metadata)}
      flowId={flowId}
      textcolor={textcolor}
    />
  );
};

const CustomReactMati = ({
  clientId,
  country = "mx",
  loaded,
  metadata,
  exited,
  finished,
  flowId,
  color,
  textColor = "#FFFFFF",
}) => {
  return (
    <MatiButton
      clientid={clientId}
      country={country}
      loaded={loaded}
      metadata={metadata}
      exited={exited}
      finished={finished}
      flowId={flowId}
      color={color}
      textcolor={textColor}
    />
  );
};

export default CustomReactMati;

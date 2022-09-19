import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker, Circle } from "google-maps-react";

const CustomMapContainer = (props) => {
  const {
    google,
    location,
    onDragPosition,
    draggable = true,
    exact,
    zoom = 15,
  } = props;
  const mapStyles = {
    width: "100%",
    height:"35em"
  };
  const [initialPosition] = useState(location);
  
  return (
    <Map
      google={google}
      zoom={zoom}
      style={mapStyles}
      initialCenter={initialPosition}
      onClick={(e) => {}}
      center={location}
    >
      {exact === true ? (
        <Marker
          draggable={draggable}
          position={location}
          onDragend={(a, e, coord) => {
            const { latLng } = coord;
            const lat = latLng.lat();
            const lng = latLng.lng();
            onDragPosition({ lat, lng });
          }}
          icon={{
            url: "https://prendamovil-assets.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296Q.png",
          }}
        />
      ) : (
        <Circle
          radius={600}
          center={location}
          onMouseover={() => {}}
          onClick={() => {}}
          onMouseout={() => {}}
          strokeColor="transparent"
          strokeOpacity={0}
          strokeWeight={5}
          fillColor="#FF0083"
          fillOpacity={0.2}
        />
      )}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBwWOmV2W9QVm7lN3EBK4wCysj2sLzPhiQ",
})(CustomMapContainer);
import React from 'react'
import { CesiumContext } from "resium";

const HomeButton = () => {
  const cesium = React.useContext(CesiumContext);
  return (
    <button
      onClick={() => {
        if (!cesium || !cesium.viewer) return;
        cesium.viewer.camera.flyHome();
      }}>
      Home
    </button>
  );
};

export default HomeButton;
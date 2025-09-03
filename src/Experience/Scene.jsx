import { React, Suspense, useState } from "react";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

import Codrops from "./models/Codrops";
import Fourth from "./models/Fourth";

import { cameraCurve, DebugCurve, CameraHelper } from "./utils/curve";

const Scene = ({
  cameraGroup,
  camera,
  scrollProgress,
  setscrollProgress,
  targetScrollProgress,
  lerpFactor,
  mouseOffset,
}) => {
  const [pulseIntensity, setPulseIntensity] = useState(0);

  useFrame((state) => {
    if (camera) {
      console.log(camera.current.position);
      const newPulseIntensity = (Math.sin(state.clock.elapsedTime * 3) + 1) / 2;
      setPulseIntensity(newPulseIntensity);

      let newProgress = THREE.MathUtils.lerp(
        scrollProgress,
        targetScrollProgress.current,
        lerpFactor
      );

      if (newProgress > 1) {
        newProgress = 0;
        targetScrollProgress.current = 0;
      } else if (newProgress < 0) {
        newProgress = 1;
        targetScrollProgress.current = 1;
      }

      setscrollProgress(newProgress);

      const basePoint = cameraCurve.getPoint(newProgress);

      camera.current.position.x = THREE.MathUtils.lerp(
        camera.current.position.x,
        basePoint.x,
        0.1
      );
      camera.current.position.y = THREE.MathUtils.lerp(
        camera.current.position.y,
        basePoint.y,
        0.1
      );
      camera.current.position.z = THREE.MathUtils.lerp(
        camera.current.position.z,
        basePoint.z,
        0.1
      );

      // cameraGroup.current.position.x = THREE.MathUtils.lerp(
      //   cameraGroup.current.position.x,
      //   basePoint.x,
      //   0.1
      // );
      // cameraGroup.current.position.y = THREE.MathUtils.lerp(
      //   cameraGroup.current.position.y,
      //   basePoint.y,
      //   0.1
      // );
      // cameraGroup.current.position.z = THREE.MathUtils.lerp(
      //   cameraGroup.current.position.z,
      //   basePoint.z,
      //   0.1
      // );

      // camera.current.position.x = THREE.MathUtils.lerp(
      //   camera.current.position.x,
      //   mouseOffset.current.x,
      //   0.1
      // );
      // camera.current.position.y = THREE.MathUtils.lerp(
      //   camera.current.position.y,
      //   -mouseOffset.current.y,
      //   0.1
      // );
      // camera.current.position.z = 0;

      // const targetRotation = getLerpedRotation(newProgress);
      // cameraGroup.current.rotation.copy(targetRotation);

      // const lookAtPoint = cameraCurve.getPoint(newProgress + 0.01);
      // camera.current.lookAt(lookAtPoint);
    }
  });

  return (
    <>
      <Environment
        background={true}
        backgroundRotation={[0, Math.PI / 2, 0]}
        files={[
          "/cubemap/px.webp",
          "/cubemap/nx.webp",
          "/cubemap/py.webp",
          "/cubemap/ny.webp",
          "/cubemap/pz.webp",
          "/cubemap/nz.webp",
        ]}
      />
      {/* <fogExp2 attach="fog" color="#403e3e" density={0.01} /> */}
      <DebugCurve curve={cameraCurve} />

      <ambientLight />

      <Suspense fallback={null}>
        <Codrops />
        <Fourth />
      </Suspense>
    </>
  );
};

export default Scene;

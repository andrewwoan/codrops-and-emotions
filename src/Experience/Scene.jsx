import { React, Suspense, useState } from "react";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

import First from "./models/First";
import Second from "./models/Second";
import Third from "./models/Third";
import Fourth from "./models/Fourth";

import {
  cameraCurve,
  DebugCurve,
  rotationTargets,
  CameraHelper,
} from "./utils/curve";

const Scene = ({
  cameraGroup,
  camera,
  scrollProgress,
  setscrollProgress,
  targetScrollProgress,
  lerpFactor,
  mousePositionOffset,
  mouseRotationOffset,
}) => {
  const [pulseIntensity, setPulseIntensity] = useState(0);
  const [rotationBufferQuat] = useState(
    new THREE.Quaternion().setFromEuler(rotationTargets[0].rotation)
  );

  const getLerpedRotation = (progress) => {
    for (let i = 0; i < rotationTargets.length - 1; i++) {
      const start = rotationTargets[i];
      const end = rotationTargets[i + 1];
      if (progress >= start.progress && progress <= end.progress) {
        const lerpFactor =
          (progress - start.progress) / (end.progress - start.progress);

        const startQuaternion = new THREE.Quaternion().setFromEuler(
          start.rotation
        );
        const endQuaternion = new THREE.Quaternion().setFromEuler(end.rotation);

        const lerpingQuaternion = new THREE.Quaternion();
        lerpingQuaternion.slerpQuaternions(
          startQuaternion,
          endQuaternion,
          lerpFactor
        );

        return lerpingQuaternion;
      }
    }

    return new THREE.Quaternion().setFromEuler(
      rotationTargets[rotationTargets.length - 1].rotation
    );
  };

  useFrame((state) => {
    if (camera) {
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

      console.log(newProgress);
      // console.log(camera.current.rotation);

      const basePoint = cameraCurve.getPoint(newProgress);

      // camera.current.position.x = THREE.MathUtils.lerp(
      //   camera.current.position.x,
      //   basePoint.x,
      //   0.1
      // );
      // camera.current.position.y = THREE.MathUtils.lerp(
      //   camera.current.position.y,
      //   basePoint.y,
      //   0.1
      // );
      // camera.current.position.z = THREE.MathUtils.lerp(
      //   camera.current.position.z,
      //   basePoint.z,
      //   0.1
      // );

      cameraGroup.current.position.x = THREE.MathUtils.lerp(
        cameraGroup.current.position.x,
        basePoint.x,
        0.1
      );
      cameraGroup.current.position.y = THREE.MathUtils.lerp(
        cameraGroup.current.position.y,
        basePoint.y,
        0.1
      );
      cameraGroup.current.position.z = THREE.MathUtils.lerp(
        cameraGroup.current.position.z,
        basePoint.z,
        0.1
      );

      camera.current.position.x = THREE.MathUtils.lerp(
        camera.current.position.x,
        mousePositionOffset.current.x,
        0.1
      );
      camera.current.position.y = THREE.MathUtils.lerp(
        camera.current.position.y,
        -mousePositionOffset.current.y,
        0.1
      );
      camera.current.position.z = 0;

      const targetRotation = getLerpedRotation(newProgress);

      rotationBufferQuat.slerp(targetRotation, 0.05);

      cameraGroup.current.quaternion.copy(rotationBufferQuat);

      camera.current.rotation.x = THREE.MathUtils.lerp(
        camera.current.rotation.x,
        -mouseRotationOffset.current.x,
        0.1
      );
      camera.current.rotation.y = THREE.MathUtils.lerp(
        camera.current.rotation.y,
        -mouseRotationOffset.current.y,
        0.1
      );
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
        <First progress={scrollProgress} />
        <Second progress={scrollProgress} />
        <Third progress={scrollProgress} />
        <Fourth progress={scrollProgress} />
      </Suspense>
    </>
  );
};

export default Scene;

import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

import { useGLTFWithKTX2 } from "../utils/useGLTFWithKTX2";
import { convertMaterialsToBasic } from "../utils/convertToBasic";
import { ConditionalMesh } from "../utils/conditionalMesh";

export default function Model({ progress, loopCounter, ...props }) {
  const { nodes, materials } = useGLTFWithKTX2("/models/First_New-v1.glb");
  const newmaterials = convertMaterialsToBasic(materials);

  // Cache WebP textures (loaded only once)
  const webpTextures = useMemo(() => {
    const textureLoader = new THREE.TextureLoader();
    const textures = {
      "third_texutre_set_Baked.001": textureLoader.load(
        "/textures/first/third_night.webp"
      ),
      "second_texutre_set_Baked.001": textureLoader.load(
        "/textures/first/second_night.webp"
      ),
      first_texture_set_baked: textureLoader.load(
        "/textures/first/first_night.webp"
      ),
    };
    // Set flipY = false for all WebP textures
    Object.values(textures).forEach((texture) => {
      texture.flipY = false;
    });
    return textures;
  }, []); // Empty dependency array to load textures only once

  // Create materials based on loopCounter
  const webpMaterials = useMemo(() => {
    if (loopCounter % 2 === 0) {
      // Use WebP textures for even loops
      return {
        "third_texutre_set_Baked.001": new THREE.MeshBasicMaterial({
          map: webpTextures["third_texutre_set_Baked.001"],
        }),
        "second_texutre_set_Baked.001": new THREE.MeshBasicMaterial({
          map: webpTextures["second_texutre_set_Baked.001"],
        }),
        first_texture_set_baked: new THREE.MeshBasicMaterial({
          map: webpTextures.first_texture_set_baked,
        }),
        // Copy other materials to avoid undefined references
        "fourth_texture_set_Baked.001": (() => {
          const material = newmaterials["fourth_texture_set_Baked.001"].clone();
          if (material.map) material.map.flipY = false;
          return material;
        })(),
      };
    }
    // Clone newmaterials and set flipY = false for their textures
    const clonedMaterials = {};
    Object.keys(newmaterials).forEach((key) => {
      clonedMaterials[key] = newmaterials[key].clone();
      if (clonedMaterials[key].map) {
        clonedMaterials[key].map.flipY = false;
      }
    });
    return clonedMaterials;
  }, [loopCounter, newmaterials, webpTextures]);

  // Dispose of textures when component unmounts
  useMemo(() => {
    return () => {
      Object.values(webpTextures).forEach((texture) => {
        texture.dispose();
      });
    };
  }, [webpTextures]);

  // Door animation configuration
  const doorConfig = {
    door1: { start: 0.55, end: 0.61 },
    door2: { start: 0.64, end: 0.655 },
    maxRotation: Math.PI / 2,
  };

  // Helper function to calculate rotation amount for any door
  const calculateDoorRotation = (doorSettings) => {
    if (progress < doorSettings.start) return 0;
    if (progress > doorSettings.end) return doorConfig.maxRotation;

    const normalizedProgress =
      (progress - doorSettings.start) / (doorSettings.end - doorSettings.start);
    return normalizedProgress * doorConfig.maxRotation;
  };

  // Calculate door rotations
  const door1RotationAmount = useMemo(
    () => calculateDoorRotation(doorConfig.door1),
    [progress]
  );
  const door2RotationAmount = useMemo(
    () => calculateDoorRotation(doorConfig.door2),
    [progress]
  );

  // Calculate final rotations for each door
  const door1Rotation = useMemo(() => {
    const baseRotation = [0, 0.135, 0];
    return [
      baseRotation[0],
      baseRotation[1] + door1RotationAmount,
      baseRotation[2],
    ];
  }, [door1RotationAmount]);

  const door2Rotation = useMemo(() => {
    const baseRotation = [Math.PI, -0.135, 0];
    return [
      baseRotation[0],
      baseRotation[1] - door2RotationAmount,
      baseRotation[2],
    ];
  }, [door2RotationAmount]);

  return (
    <group {...props} dispose={null}>
      {loopCounter % 2 !== 0 && (
        <mesh
          geometry={nodes.Cessna_plane_Baked.geometry}
          material={webpMaterials["fourth_texture_set_Baked.001"]}
          position={[52.876, 22.403, -30.043]}
          rotation={[0, 0.134, -Math.PI / 2]}
        />
      )}
      <mesh
        geometry={nodes.Door.geometry}
        material={webpMaterials["third_texutre_set_Baked.001"]}
        position={[4.978, 0.927, -16.477]}
        rotation={door1Rotation}
      />
      <mesh
        geometry={nodes.Door_Two.geometry}
        material={webpMaterials["third_texutre_set_Baked.001"]}
        position={[3.821, 0.875, -18.43]}
        rotation={door2Rotation}
        scale={[-1.004, -1.012, -1.004]}
      />
      <ConditionalMesh progress={progress} showRange={[0.3, 0.64]}>
        <mesh
          geometry={nodes.First_Trees_Baked.geometry}
          material={webpMaterials.first_texture_set_baked}
          position={[29.8, -0.228, -13.801]}
          rotation={[-2.985, 0.885, 3.034]}
        />
      </ConditionalMesh>
      {loopCounter % 2 !== 0 && (
        <mesh
          geometry={nodes.Fourth_Snowman_Baked.geometry}
          material={webpMaterials["fourth_texture_set_Baked.001"]}
          position={[10.701, 0.089, -12.996]}
          rotation={[-2.985, 0.885, 3.034]}
        />
      )}
      <mesh
        geometry={nodes.House_Baked.geometry}
        material={webpMaterials["third_texutre_set_Baked.001"]}
        position={[4.432, 3.777, -17.151]}
        rotation={[Math.PI / 2, 0, -0.135]}
      />
      {loopCounter % 2 !== 0 && (
        <mesh
          geometry={nodes.Remove_This_Hidden.geometry}
          material={webpMaterials["third_texutre_set_Baked.001"]}
          position={[4.432, 3.777, -17.151]}
          rotation={[Math.PI / 2, 0, -0.135]}
        />
      )}
      {loopCounter % 2 !== 0 && (
        <mesh
          geometry={nodes.Rotar_Baked.geometry}
          material={webpMaterials["fourth_texture_set_Baked.001"]}
          position={[52.495, 22.305, -32.748]}
          rotation={[0, 0.134, -Math.PI / 2]}
        />
      )}
      <ConditionalMesh progress={progress} showRange={[0.3, 0.64]}>
        <mesh
          geometry={nodes.Snow_Background_Baked.geometry}
          material={webpMaterials["second_texutre_set_Baked.001"]}
          position={[83.978, -1.359, 4.807]}
          rotation={[0, Math.PI / 2, 0]}
        />
      </ConditionalMesh>
      {loopCounter % 2 !== 0 && (
        <mesh
          geometry={nodes.Other_Hidden.geometry}
          material={webpMaterials["third_texutre_set_Baked.001"]}
          position={[4.432, 3.777, -17.151]}
          rotation={[Math.PI / 2, 0, -0.135]}
        />
      )}
    </group>
  );
}

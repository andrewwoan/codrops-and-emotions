import * as THREE from "three";

export const cameraCurve = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(-3.173991, 0.527087, -1.304273),
    new THREE.Vector3(3.737109, 0.527087, -5.512709),
    new THREE.Vector3(5.077224, 0.527087, -11.86543),
    new THREE.Vector3(4.399514, 1.654118, -17.444349),
    new THREE.Vector3(3.968427, 1.370732, -22.734327),
    new THREE.Vector3(4.20915, 1.370732, -22.902386),
    new THREE.Vector3(4.044714, 0.829584, -24.020878),
    new THREE.Vector3(3.454959, 0.829584, -26.829981),
    new THREE.Vector3(1.747707, 0.829584, -33.011375),
    new THREE.Vector3(0.276049, 0.829584, -41.454048),
    new THREE.Vector3(-1.052099, 0.829584, -50.777229),
    new THREE.Vector3(-6.579686, 0.829584, -58.459641),
    new THREE.Vector3(-16.323229, 0.829584, -60.708153),
    new THREE.Vector3(-25.410957, 0.829584, -59.209145),
    new THREE.Vector3(-31.208363, 0.829584, -47.842926),
    new THREE.Vector3(-31.208363, 0.829584, -36.510437),
    new THREE.Vector3(-29.319614, 0.829584, -22.479734),
    new THREE.Vector3(-28.24033, 0.829584, -10.607602),
    new THREE.Vector3(-21.494801, 0.829584, -0.624219),
    new THREE.Vector3(-10.836866, 0.829584, 1.264529),
  ],
  true
);

export const rotationTargets = [
  {
    progress: 0,
    rotation: new THREE.Euler(
      window.innerWidth < 764 ? -0.1 : 0,
      0.00479125845971665,
      0.000597178775549178
    ),
  },
  {
    progress: 0.07,
    rotation: new THREE.Euler(
      -0.04277011042878412,
      -0.00866103427209704,
      -0.00037065478236413864
    ),
  },
  {
    progress: 0.2,
    rotation: new THREE.Euler(
      -0.04277011042878412,
      -0.00866103427209704,
      -0.00037065478236413864
    ),
  },
  {
    progress: 0.25,
    rotation: new THREE.Euler(
      -0.8851668165265633,
      0.003786054557443451,
      0.003635853660383532
    ),
  },
  {
    progress: 0.32,
    rotation: new THREE.Euler(
      -0.086339131170143176,
      0.398491298300412,
      -0.1343243154257062
    ),
  },
  {
    progress: 0.36,
    rotation: new THREE.Euler(
      -0.086339131170143176,
      0.708491298300412,
      -0.0143243154257062
    ),
  },
  {
    progress: 0.41,
    rotation: new THREE.Euler(
      -0.046339131170143176,
      0.0298491298300412,
      0.07343243154257062
    ),
  },
  {
    progress: 0.49,
    rotation: new THREE.Euler(
      -0.026015217004565497,
      -0.019361968160347905,
      -0.0405037879475436998
    ),
  },

  {
    progress: 0.61,
    rotation: new THREE.Euler(
      -0.038854519527552256,
      -0.5056419965908544,
      -0.01657632912947032
    ),
  },
  {
    progress: 0.65,
    rotation: new THREE.Euler(
      -0.3535558580154114,
      0.05311086541781096,
      0.005869310093750261
    ),
  },
  {
    progress: 0.75,
    rotation: new THREE.Euler(
      -0.05535558580154114,
      0.32017130864367585,
      0.02072972153013933
    ),
  },
  {
    progress: 0.8,
    rotation: new THREE.Euler(
      -0.13535558580154114,
      -0.13017130864367585,
      0.02072972153013933
    ),
  },
  {
    progress: 0.9,
    rotation: new THREE.Euler(
      0.01492353012229583,
      -0.073017130864367585,
      0.02072972153013933
    ),
  },
  {
    progress: 1,
    rotation: new THREE.Euler(
      window.innerWidth < 764 ? -0.1 : 0,
      0.00479125845971665,
      0.000597178775549178
    ),
  },
];

export const DebugCurve = ({ curve }) => {
  const points = curve.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={"red"} />
    </line>
  );
};

export const CameraHelper = ({ cameraRef }) => {
  useHelper(cameraRef, THREE.CameraHelper);

  return null;
};

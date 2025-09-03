import * as THREE from "three";

export const cameraCurve = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(6.930563259696433, 0.293114183603957, -4.220597563518357),
    new THREE.Vector3(
      0.7532147520886996,
      0.9751041788114987,
      -2.479471514852359
    ),
    new THREE.Vector3(
      0.2759456625447997,
      0.9963726373027335,
      1.538664839449443
    ),
    new THREE.Vector3(
      0.21526259397890724,
      1.4380528434347275,
      3.3849817896080205
    ),
    new THREE.Vector3(
      -0.9060867930362762,
      1.7325040662572624,
      6.825046050441438
    ),
    new THREE.Vector3(
      -0.5906330240700998,
      -0.4925349101226518,
      6.723112539482984
    ),
    new THREE.Vector3(
      -5.54448757804801,
      -0.42966158984317465,
      9.109989116015432
    ),
    new THREE.Vector3(
      -13.216840791734892,
      -0.17254478644825352,
      11.860764421221058
    ),
    new THREE.Vector3(
      -14.385900664741964,
      -0.22128276509489458,
      13.41643384022654
    ),
    new THREE.Vector3(
      -14.097685645953051,
      -0.7155245821316091,
      18.24287056823347
    ),
    new THREE.Vector3(
      -14.591078465344344,
      -1.4067165012330796,
      18.918167815935778
    ),
  ]
  // true
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

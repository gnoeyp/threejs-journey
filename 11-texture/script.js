import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Start of the code
THREE.ColorManagement.enabled = false;

const image = new Image();

const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {
  console.log("onStart");
};

loadingManager.onLoad = () => {
  console.log("onLoad");
};

loadingManager.onProgress = () => {
  console.log("onProgress");
};

loadingManager.onError = () => {
  console.log("onError");
};

const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load("/textures/door/color.jpg");
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const heightTexture = textureLoader.load("/textures/door/height.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const ambientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

const canvas = document.querySelector(".webgl");

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();

// const geometry = new THREE.BoxGeometry(1, 1, 1);
const geometry = new THREE.SphereGeometry(1, 32, 32);
console.log(geometry.attributes.uv);
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  1000
);

camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// After instantiating the renderer
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

const tick = () => {
  controls.update();

  renderer.render(scene, camera);

  requestAnimationFrame(tick);
};

tick();

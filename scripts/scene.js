import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js';
import { ARButton } from 'https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/webxr/ARButton.js';

const canvas = document.getElementById('xr-canvas');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.01,
  20
);
camera.position.set(0, 1.6, 0);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  canvas,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
renderer.setClearColor(0x000000, 0);
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

const boxGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x2ecc71 });
const cube = new THREE.Mesh(boxGeometry, boxMaterial);
cube.position.set(0, 0, -0.5);
scene.add(cube);

const arButton = ARButton.createButton(renderer);
document.body.appendChild(arButton);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  cube.rotation.y += 0.01;
  cube.rotation.x += 0.005;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
window.addEventListener('resize', onWindowResize);

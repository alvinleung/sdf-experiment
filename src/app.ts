import * as THREE from "three";
import SHADER_FRAG from "./shader2.frag";
import SHADER_VERT from "./shader.vert";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// setup mouse interactgion
const mouse = new THREE.Vector2();
const handleMouseMove = (event: PointerEvent) => {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
};
window.addEventListener("pointermove", handleMouseMove);

// handle screen resize
const handleResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};
window.addEventListener("resize", handleResize);

// add geometry to the scene
const geometry = new THREE.PlaneGeometry(1, 1, 6, 6);
const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: mouse },
  },
  fragmentShader: SHADER_FRAG,
  vertexShader: SHADER_VERT,
});

const obj = new THREE.Mesh(geometry, material);
scene.add(obj);

camera.position.z = 1;

function animate(time: number) {
  material.uniforms.uTime.value = time;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

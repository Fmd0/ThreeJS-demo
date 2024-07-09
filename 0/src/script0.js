import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
camera.position.z = 3;

const axisHelper = new THREE.AxesHelper(10);
scene.add(axisHelper);

const box = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
// const box = new THREE.SphereGeometry(1, 32, 32);
// const box = new THREE.BufferGeometry();

// const positionsArray = new Float32Array([
//     0, 0, 0,
//     0, 1, 0,
//     1, 0, 0,
//     -1, -1, 0,
//     // -1, 0, 0,
//     // 0, -1, 0
// ])

const positionsArray = new Float32Array( [
    -1.0, -1.0,  1.0, // v0
    1.0, -1.0,  1.0, // v1
    1.0,  1.0,  1.0, // v2

    1.0,  1.0,  1.0, // v3
    -1.0,  1.0,  1.0, // v4
    -1.0, -1.0,  1.0  // v5
] );


const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
// box.setAttribute('position', positionsAttribute)

// console.log(box.getAttribute("index"));
console.log(box.getIndex());

const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true });
const mesh = new THREE.Mesh(box, material);
scene.add(mesh);



const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const update = () => {
    controls.update()
    renderer.render(scene, camera);
    window.requestAnimationFrame(update);
}
update();
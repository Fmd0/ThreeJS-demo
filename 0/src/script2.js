import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
window.document.body.appendChild(renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
camera.position.z = 5;

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("/src/assets/mc.png");
texture.colorSpace = THREE.SRGBColorSpace;
// texture.wrapS = THREE.MirroredRepeatWrapping;
// texture.wrapT = THREE.MirroredRepeatWrapping;
// texture.repeat.x = 2;
// texture.repeat.y = 2;
// texture.offset.x = 1;
// texture.rotation = Math.PI/4;
// texture.center.x = 0.5;
// texture.center.y = 0.5;
texture.magFilter = THREE.NearestFilter;

const box = new THREE.BoxGeometry(1);
const material = new THREE.MeshBasicMaterial({map: texture});
const mesh = new THREE.Mesh(box, material);
scene.add(mesh);


const axisHelper = new THREE.AxesHelper(10);
scene.add(axisHelper);


const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;

const update = () => {
    orbitControls.update();
    mesh.position.x += 0.01;
    renderer.render(scene, camera);
    window.requestAnimationFrame(update);
}

update();


window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})
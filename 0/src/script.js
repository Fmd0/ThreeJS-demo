import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
camera.position.z = 10;


const mesh = new THREE.Mesh(
    new THREE.BoxGeometry( 2, 2, 2),
    new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
)
const axesHelper = new THREE.AxesHelper(10)


scene.add(axesHelper);
scene.add(mesh);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const update = () => {
    renderer.render(scene, camera);
    controls.update();
    window.requestAnimationFrame(update);
}

update();


window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

window.addEventListener('dblclick', () =>
{
    document.fullscreenElement?document.exitFullscreen():renderer.domElement.requestFullscreen();
})
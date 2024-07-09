import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from "lil-gui";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
window.document.body.appendChild(renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
camera.position.z = 5;

const material = new THREE.MeshStandardMaterial()
const mesh0 = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
mesh0.position.x = -1.5;

const mesh1 = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);

const mesh2 = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.25, 64, 128), material);
mesh2.position.x = 1.5;
scene.add(mesh0, mesh1, mesh2);


const textureLoader = new THREE.TextureLoader();
const doorTexture = textureLoader.load("/src/assets/000.jpg");
doorTexture.colorSpace = THREE.SRGBColorSpace;
const doorHeightTexture = textureLoader.load("/src/assets/material/door/height.jpg");
const doorMetalnessTexture = textureLoader.load("/src/assets/material/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/src/assets/material/door/roughness.jpg");
const doorNormalTexture = textureLoader.load("/src/assets/material/door/normal.jpg");
const doorAlphaTexture = textureLoader.load("/src/assets/material/door/alpha.jpg");


const gradientTexture = textureLoader.load("/src/assets/material/gradients/5.jpg");
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
// const alphaTexture = textureLoader.load("/src/assets/alpha.jpg");
const matTexture = textureLoader.load("/src/assets/material/matcaps/8.png");
matTexture.colorSpace = THREE.SRGBColorSpace;
// doorTexture.colorSpace = THREE.SRGBColorSpace;
// material.map = doorTexture;
// material.matcap = matTexture;
// material.transparent = true;
// material.opacity = 0.5;
// material.alphaMap = alphaTexture;
// material.side = THREE.DoubleSide;
// material.flatShading = true;
// material.shininess = 1;
// material.specular = new THREE.Color(0xff0000)
// material.gradientMap = gradientTexture;
material.metalness = 1
material.roughness = 1
material.map = doorTexture;
material.aoMap = doorTexture;
material.aoMapIntensity = 1;
material.displacementMap = doorHeightTexture;
material.displacementScale = 0.1;
material.metalnessMap = doorMetalnessTexture;
material.roughnessMap = doorRoughnessTexture;
material.normalMap = doorNormalTexture;
material.normalScale.set(0.5, 0.5);
material.transparent = true
material.alphaMap = doorAlphaTexture;
// material.side = THREE.DoubleSide;

const rgbeLoader = new RGBELoader()
rgbeLoader.load('/src/assets/material/environmentMap/2k.hdr', (environmentMap) =>
{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    scene.background = environmentMap
    scene.environment = environmentMap
})



// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// const pointLight = new THREE.PointLight(0xffffff, 50);
// pointLight.position.set(2,3,4)
// scene.add(ambientLight, pointLight);

const axisHelper = new THREE.AxesHelper(10);
scene.add(axisHelper);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;



const update = () => {
    controls.update();
    // camera.position.x -= 0.01;
    renderer.render(scene, camera);
    window.requestAnimationFrame(update);
}

update();


const gui = new GUI({
    title: "threejs panel"
});
gui.add(material, "metalness").min(0).max(1).step(0.01);
gui.add(material, "roughness").min(0).max(1).step(0.01);
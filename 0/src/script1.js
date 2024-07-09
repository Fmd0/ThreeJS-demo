import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from "lil-gui";
import gsap from "gsap";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
window.document.body.appendChild(renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
camera.position.z = 5;


const box = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0xff0000});
const mesh = new THREE.Mesh(box, material);
scene.add(mesh);

const axisHelper = new THREE.AxesHelper(10);
scene.add(axisHelper);

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;

const update = () => {
    mesh.position.y += 0.01;
    // camera.position.y = mesh.position.y;
    // controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(update);
}

update();

const debugObject = {
    spin : () => {
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
    },
    subdivision : 1,
    color: 0xff0000,
};

const gui = new GUI({
    title: 'Awesome controller',
});

const positionFolder = gui.addFolder("position");
positionFolder.add(mesh.position, "x").min(-5).max(5).name("mesh X");
positionFolder.add(mesh.position, "y").min(-5).max(5).name("mesh Y");
positionFolder.add(mesh.position, "z").min(-5).max(5).name("mesh Z");

gui.add(mesh, "visible");
gui.add(material, "wireframe");
// gui.addColor(material, "color")
//     .onChange(v => {
//         console.log(material.color);
//         console.log(v);
//         console.log(v.getHexString());
//     })


gui.addColor(debugObject, "color")
    .onChange(v => {
        console.log(v);
        material.color.set(debugObject.color)
    })

gui.add(debugObject, "spin");

gui.add(debugObject, "subdivision").min(1).max(20).step(1)
    .onFinishChange(v => {
        mesh.geometry.dispose();
        mesh.geometry = new THREE.BoxGeometry(1, 1, 1, v, v, v);
    })

// gui.hide()

window.addEventListener("keydown", (e) => {
    if(e.key === "h") {
        gui.show(gui._hidden);
    }
})
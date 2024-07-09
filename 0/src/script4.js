import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
window.document.body.appendChild(renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
camera.position.z = 5;

const fontLoader = new FontLoader();
fontLoader.load(
    '/static/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        const textGeometry = new TextGeometry(
            'Hello Three.js',
            {
                font: font,
                size: 0.5,
                depth: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        );
        textGeometry.center();
        const matcapTexture = new THREE.TextureLoader().load('/src/assets/matcap.png')
        const textMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture})
        const text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text)

        const torus = new THREE.TorusGeometry(0.5, 0.25);
        for (let i = 0; i < 100; i++) {
            const mesh = new THREE.Mesh(torus, textMaterial);
            mesh.position.set((Math.random() - 0.5) * 10+1, (Math.random() - 0.5) * 10+1, (Math.random() - 0.5) * 10+0.5);
            mesh.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, 0)
            const scale = Math.random()
            mesh.scale.set(scale, scale, scale)

            scene.add(mesh);
        }
    }
)


// const axisHelper = new THREE.AxesHelper(10);
// scene.add(axisHelper);

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;

const update = () => {
    renderer.render(scene, camera);
    orbitControls.update();
    window.requestAnimationFrame(update);
}

update();
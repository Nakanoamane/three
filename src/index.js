import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

// シーンの準備
const scene = new THREE.Scene();

// カメラの準備
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    2000,
);
camera.position.z = 250;

// レンダラーの準備
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xEAEADC, 1.0);
document.body.appendChild(renderer.domElement);

// ライトの準備
const ambientLight = new THREE.AmbientLight(0xFFFCEE, 0.35);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xF1FFFF);
directionalLight.position.set(-1, 1, 1).normalize();
scene.add(directionalLight);

// ローディングマネージャの準備
const manager = new THREE.LoadingManager();
manager.addHandler(/\.dds$/i, new DDSLoader()); // DDSローダーの準備
// manager.addHandler(/\.tga$/i, new TGALoader()); // TGAローダーの準備 (今回は未使用)

// MTLファイルの読み込み
new MTLLoader(manager).load(
    'models/materials/sumainu.mtl',
    // ロード完了時の処理
    function (materials) {
        materials.preload();

        // OBJファイルの読み込み
        new OBJLoader(manager)
            .setMaterials(materials) // マテリアルの指定
            .load(
                './models/objects/sumainu.obj',
                // ロード完了時の処理
                function (object) {
                    object.scale.set(50,50,50);
                    // シーンへのモデルの追加
                    scene.add(object);
                    object.position.y = -95;
                });
    },
);


// コントローラの準備
const controls = new OrbitControls(camera, document.body);

// アニメーションループの開始
function animate() {
    requestAnimationFrame(animate);

    // コントローラの更新
    controls.update();

    renderer.render(scene, camera);
}
animate();
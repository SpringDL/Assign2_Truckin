/// <reference path="C:\Users\Spring\Documents\GitHub\Assign2_Truck\Truckin\Truckin\libs/three.min.js" />
//Filename: Truckin.js
//Author: Danny Luk - 300709186

//Global Variables
var gui, controls;
var scene, camera, renderer;
var cameraTarget, camTargetBall;

var truck;
var wheelFL, wheelFR, wheelBL, wheelBR, frontAxel, backAxel;
var truckbody;

//Initialize
function init() {
    //Create Gui + Controls
    initGuiControl();

    //Create Scene
    scene = new THREE.Scene();

    //Create Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

    //Create and Set Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    //Add renderer output to Html element
    document.body.appendChild(renderer.domElement);
}

//
function createGeometry() {

    truck = new THREE.Object3D();

    frontAxel = new THREE.Object3D();
    backAxel = new THREE.Object3D();

    //Wheel
    var wheelGeometry = new THREE.CylinderGeometry(5, 5, 2, 6);
    var wheelMaterial = new THREE.MeshLambertMaterial({ color: 0xFF9933 });
    //Fronts
    wheelFL = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelFL.position.set(0, 0, 10);
    wheelFL.rotation.set(90 * Math.PI / 180, 0, 0);
    scene.add(wheelFL);
    wheelFR = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelFR.position.set(0, 0, -10);
    wheelFR.rotation.set(90 * Math.PI / 180, 0, 0);
    scene.add(wheelFR);
    //Front Axel
    frontAxel.add(wheelFL);
    frontAxel.add(wheelFR);
    frontAxel.position.set(-20, -5, 0);
    scene.add(frontAxel);
    //Backs
    wheelBL = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelBL.position.set(0, 0, 10);
    wheelBL.rotation.set(90 * Math.PI / 180, 0, 0);
    scene.add(wheelBL);
    wheelBR = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelBR.position.set(0, 0, -10);
    wheelBR.rotation.set(90 * Math.PI / 180, 0, 0);
    scene.add(wheelBR);
    //Back Axel
    backAxel.add(wheelBL);
    backAxel.add(wheelBR);
    backAxel.position.set(20, -5, 0);
    scene.add(backAxel);



    //Truck Body
    var truckBodyGeometry = new THREE.BoxGeometry(70, 10, 20);
    var truckBodyMaterial = new THREE.MeshLambertMaterial({ color: 0x9966FF });
    //
    truckbody = new THREE.Mesh(truckBodyGeometry, truckBodyMaterial);
    truckbody.position.set(5, 0, 0);
    scene.add(truckbody);



    //
    cameraTarget = new THREE.Object3D();
    cameraTarget.position.x = 0;
    cameraTarget.position.y = 0;
    cameraTarget.position.z = 0;
    scene.add(cameraTarget);
    //
    var camTarGeometry = new THREE.SphereGeometry(2, 8, 8);
    var camTarMaterial = new THREE.MeshNormalMaterial({ color: 0x00FF00 });
    camTargetBall = new THREE.Mesh(camTarGeometry, camTarMaterial);
    scene.add(camTargetBall);
    cameraTarget.add(camTargetBall);


    //Position Camera
    camera.position.x = 0;
    camera.position.y = 20;
    camera.position.z = 50;
    camera.lookAt(cameraTarget.position);

    //Add Ambient Lighting
    var ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

    //Add Spotlight for lighting
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 500, 0);
    scene.add(spotLight);
}

//
function animate() {
    //
    frontAxel.rotation.z += 0.03;
    backAxel.rotation.z += 0.03;

    // render using requestAnimationFrame
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

//
function initGuiControl() {
    controls = new function () {
        this.rotationSpeed = 0.25;

        //
        this.moonRotation = function () {
            if (spinMoons) {
                spinMoons = false;
            } else if (!spinMoons) {
                spinMoons = true;
            }
        };
    }

    gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', -50.0, 50.0, 1);
    gui.add(controls, 'moonRotation');
}

//
window.onload = function () {
    init();
    createGeometry();
    animate();
};

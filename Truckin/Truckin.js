/// <reference path="C:\Users\Spring\Documents\GitHub\Assign2_Truck\Truckin\Truckin\libs/three.min.js" />
//Filename: Truckin.js
//Author: Danny Luk - 300709186

//Global Variables
var gui, controls;
var scene, camera, renderer;
var cameraTarget, camTargetBall;

var truck;
var wheelFL, wheelFR, wheelBL, wheelBR, frontAxel, backAxel;
var truckBase, truckFront, truckMid, truckBody;

var spinDisplay = false;

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
    truckBody = new THREE.Object3D();

    //#region Wheels
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
    //#endregion

    truck.add(frontAxel);
    truck.add(backAxel);

    //#region TruckBody
    //Truck Base
    var truckBaseGeometry = new THREE.BoxGeometry(70, 10, 20);
    var truckBaseMaterial = new THREE.MeshLambertMaterial({ color: 0x9966FF });
    //
    truckBase = new THREE.Mesh(truckBaseGeometry, truckBaseMaterial);
    truckBase.position.set(5, 0, 0);
    scene.add(truckBase);

    //
    var headLight = new THREE.PointLight(0xff0000, 5, 20);
    headLight.position.set(-40, 0, 0);
    scene.add(headLight);
    truckBase.add(headLight);



    //Front Part
    var truckFrontGeometry = new THREE.CylinderGeometry(10, 10, 19.999, 3);
    var truckFrontMaterial = new THREE.MeshLambertMaterial({ color: 0x9966FF });
    //
    truckFront = new THREE.Mesh(truckFrontGeometry, truckFrontMaterial);
    truckFront.rotation.set(90 * Math.PI / 180, 30 * Math.PI / 180, 0);
    truckFront.position.set(-20, 5, 0);
    scene.add(truckFront);

    

    //Middle
    var truckMidGeometry = new THREE.BoxGeometry(20, 10, 19.999);
    var truckMidMaterial = new THREE.MeshLambertMaterial({ color: 0x9966FF });
    //
    truckMid = new THREE.Mesh(truckMidGeometry, truckMidMaterial);
    truckMid.position.set(-5, 9, 0);
    scene.add(truckMid);
    //
    truckBody.add(truckBase);
    truckBody.add(truckFront);
    truckBody.add(truckMid);
    scene.add(truckBody);
    //#endregion

    truck.add(truckBody);
    scene.add(truck);

    //Target for camera
    cameraTarget = new THREE.Object3D();
    cameraTarget.position.x = 0;
    cameraTarget.position.y = 0;
    cameraTarget.position.z = 0;
    scene.add(cameraTarget);
    //Physical representation of camera target
    var camTarGeometry = new THREE.SphereGeometry(2, 8, 8);
    var camTarMaterial = new THREE.MeshNormalMaterial({ color: 0x00FF00 });
    camTargetBall = new THREE.Mesh(camTarGeometry, camTarMaterial);
    scene.add(camTargetBall);
    cameraTarget.add(camTargetBall);


    //Position Camera
    camera.position.x = 0;
    camera.position.y = 30;
    camera.position.z = 100;
    camera.lookAt(cameraTarget.position);
    
    
    //lights
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 0.5);
    scene.add(directionalLight);

}

//
function animate() {
    //
    frontAxel.rotation.z += 0.01 * controls.wheelSpeed;
    backAxel.rotation.z += 0.01 * controls.wheelSpeed;

    if (spinDisplay) {
        truck.rotation.y += 0.01 * controls.rotationSpeed;
    }  

    // render using requestAnimationFrame
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

//
function initGuiControl() {
    controls = new function () {
        this.wheelSpeed = 5;
        
        //
        this.rotateDisplay = function () {
            if (spinDisplay) {
                spinDisplay = false;
            } else if (!spinDisplay) {
                spinDisplay = true;
            }
        };
        this.rotationSpeed = 1;
    }

    gui = new dat.GUI();
    gui.add(controls, 'wheelSpeed', -10, 10, 1);
    gui.add(controls, 'rotateDisplay');
    gui.add(controls, 'rotationSpeed', -5, 5, 1);
}

//
window.onload = function () {
    init();
    createGeometry();
    animate();
};

import * as THREE from "three";

//@ts-ignore
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export class SceneManager extends THREE.EventDispatcher {
  constructor(canvas, customOptions = {}) {
    super();
    const options = {
      cameraNear: 0.1,
      cameraFar: 1000,
      ...customOptions,
    };
    this.isInitiated = false;

    this.canvas = canvas;

    const aspectRatio = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(
      75,
      aspectRatio,
      options.cameraNear,
      options.cameraFar,
    );
    this.camera.position.set(0, 1, -3);
    this.camera.lookAt(new THREE.Vector3());

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      // antialias: true,
      alpha: true,
    });
    this.renderer.shadowMap.enabled = true;

    this.scene = new THREE.Scene();
    // this.scene.fog = new THREE.Fog(0xffffff, 0, 2);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    window.scene = this.scene;
  }

  clear() {}
  triggerUnmount() {
    if (!this.isInitiated) {
      return;
    }
  }
  init() {}
  draw() {}
  render() {
    this.init();
    this.draw();

    this.isInitiated = true;
  }

  clearScene() {
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }
  }

  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.customResize(width, height);
  }

  /**
   * Sketch specific resize operations
   */
  customResize(width, height) {}

  setCameraPos(x, y, z) {
    this.camera.position.set(x, y, z);
  }
  lookAt(vector) {
    this.camera.lookAt(vector);
  }
  setClearColor(hex) {
    this.renderer.setClearColor(hex);
  }
  disableOrbitControls() {
    this.controls.enabled = false;
  }
}

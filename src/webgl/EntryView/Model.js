import * as THREE from "three";
import { FBXLoader } from "three/addons/loaders/FBXLoader";
import { assets } from "@themes";
import { toRadians } from "@webgl/utils";
import { colors } from "@webgl/constants/colors";
/**
 * https://github.com/misspia/sketch-011/blob/master/src/Crystal.js
 */
export class Model {
  constructor(context) {
    this.context = context;
    this.mixer = undefined;
    this.clips = [];
    this.group = new THREE.Group();
    this.object = null;
    this.context.scene.add(this.group);

    this.bbox = new THREE.Box3();
  }

  get position() {
    return this.group.position;
  }

  load(url) {
    const loader = new FBXLoader();

    return new Promise((resolve) => {
      // loader.load(assets.Rig0001, (object) => {
      // loader.load(assets.Rig0006, (object) => {
      // loader.load(assets.Rig0091, (object) => {
      loader.load(assets.Rig0130, (object) => {
        // loader.load(assets.Rig0151, (object) => {
        // loader.load(assets.Rig0145, (object) => {
        this.object = object;

        this.mixer = new THREE.AnimationMixer(object);
        const action = this.mixer.clipAction(object.animations[4]);
        action.play();

        const bodyMaterial = new THREE.MeshPhysicalMaterial({
          metalness: 0.4,
          roughness: 0.0,
          opacity: 0.85,
          transparent: true,
          envMap: this.context.environment.envMap,
          side: THREE.DoubleSide,
          sheen: new THREE.Color(0x0000ff).convertSRGBToLinear(2.2),
          // color: new THREE.Color(0xffffff).convertSRGBToLinear(2.2), // grey
          color: new THREE.Color(colors.types.grass).convertSRGBToLinear(2.2),
          // color: new THREE.Color(colors.types.water).convertSRGBToLinear(2.2),
          // color: new THREE.Color(colors.types.fire).convertSRGBToLinear(2.2),
          // color: new THREE.Color(colors.types.psychic).convertSRGBToLinear(2.2),
          // color: new THREE.Color(colors.types.ice).convertSRGBToLinear(2.2),
          // color: new THREE.Color(colors.types.electric).convertSRGBToLinear(2.2),
          refractionRatio: 1.0 / 1.6,
        });

        this.object.traverse((child) => {
          if (child.isMesh) {
            child.material = bodyMaterial;
            child.castShadow = true;
          }
        });
        // this.object.scale.set(2, 2, 2);
        this.object.rotation.y = toRadians(20);
        this.object.rotation.x = toRadians(5);
        this.object.rotation.z = toRadians(-5);
        this.reposition();

        // hack...
        // fix: add to scene after animation start playing to avoid flash of unanimated model
        setTimeout(() => {
          this.context.scene.add(this.object);
          // this.group.add(object);
          resolve();
        }, 100);
      });
    });
  }

  reposition() {
    if (!this.object) return;
    const floor = 0.2;

    this.bbox.setFromObject(this.object);
    const { min, max } = this.bbox.setFromObject(this.object);
    this.object.position.set(0, -(max.y - min.y) / 2 + floor, 0);
  }

  // https://stackoverflow.com/a/11605007
  updatePosition() {
    this.position.set();
  }

  update() {
    if (this.mixer) {
      this.mixer.update(this.context.clock.getDelta());
    }
  }
}

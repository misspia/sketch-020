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
    this.context.scene.add(this.group);

    this.bbox = new THREE.Box3();
  }

  load() {
    const loader = new FBXLoader();

    return new Promise((resolve) => {
      // loader.load(assets.Rig0001, (object) => {
      // loader.load(assets.Rig0006, (object) => {
      loader.load(assets.Rig0091, (object) => {
        // loader.load(assets.Rig0130, (object) => {
        // loader.load(assets.Rig0151, (object) => {
        // loader.load(assets.Rig0145, (object) => {

        this.mixer = new THREE.AnimationMixer(object);
        const action = this.mixer.clipAction(object.animations[0]);
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
          color: new THREE.Color(colors.types.water).convertSRGBToLinear(2.2),
          // color: new THREE.Color(colors.types.fire).convertSRGBToLinear(2.2),
          color: new THREE.Color(colors.types.psychic).convertSRGBToLinear(2.2),
          color: new THREE.Color(colors.types.ice).convertSRGBToLinear(2.2),
          // color: new THREE.Color(colors.types.electric).convertSRGBToLinear(2.2),
          refractionRatio: 1.0 / 1.6,
        });

        object.traverse((child) => {
          if (child.isMesh) {
            child.material = bodyMaterial;
            child.castShadow = true;
          }
        });
        this.bbox.setFromObject(object);
        const center = this.bbox.getCenter(object.position).multiplyScalar(-1);
        console.debug(center);
        object.position.set(center.x - 2.3, center.y - 1, center.z - 0);
        object.scale.set(2, 2, 2);
        object.rotation.y = toRadians(50);
        object.rotation.x = toRadians(5);
        object.rotation.z = toRadians(-5);
        // this.group.add(object);
        // object.position.set(-2.3, -0.7, 0);

        // hack...
        // fix: add to scene after animation start playing to avoid flash of unanimated model
        setTimeout(() => {
          this.context.scene.add(object);
          // this.group.add(object);
          resolve();
        }, 100);
      });
    });
  }

  get position() {
    return this.group.position;
  }

  update() {
    if (this.mixer) {
      this.mixer.update(this.context.clock.getDelta());
    }
  }
}

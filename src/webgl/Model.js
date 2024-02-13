import * as THREE from "three";
import { FBXLoader } from "three/addons/loaders/FBXLoader";
import { assets } from "@themes";
import { toRadians } from "@webgl/utils";

/**
 * https://github.com/misspia/sketch-011/blob/master/src/Crystal.js
 */
export class Model {
  constructor(context) {
    this.context = context;
    this.mixer = undefined;
    this.clips = [];
  }

  load() {
    const loader = new FBXLoader();
    loader.load(assets.Rig, (object) => {
      object.rotation.y = toRadians(40);
      object.rotation.x = toRadians(15);

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
        color: new THREE.Color(0xffffff).convertSRGBToLinear(2.2),
        refractionRatio: 1.0 / 1.6,
      });

      object.traverse((child) => {
        if (child.isMesh) {
          child.material = bodyMaterial;
          child.castShadow = true;
        }
      });

      // hack...
      // fix: add to scene after animation start playing to avoid flash of unanimated model
      setTimeout(() => this.context.scene.add(object), 100);
    });
  }

  update() {
    if (this.mixer) {
      this.mixer.update(this.context.clock.getDelta());
    }
  }
}

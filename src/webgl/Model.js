import * as THREE from "three";
import { FBXLoader } from "three/addons/loaders/FBXLoader";
import { assets } from "../themes";
console.debug(assets);

export class Model {
  constructor(context) {
    this.context = context;
    this.mixer = undefined;
    this.clips = [];
  }

  load() {
    const loader = new FBXLoader();
    // loader.load(assets.Dancer, (object) => {
    loader.load(assets.Rig, (object) => {
      this.mixer = new THREE.AnimationMixer(object);
      const action = this.mixer.clipAction(object.animations[0]);
      action.play();
      console.debug("action", object);

      const bodyTexture = new THREE.TextureLoader().load(assets.Body);
      const bodyMaterial = new THREE.MeshBasicMaterial({ map: bodyTexture });
      object.traverse((child) => {
        if (child.isMesh) {
          child.material = bodyMaterial;
        }
      });

      this.context.scene.add(object);
    });
  }

  update() {
    if (this.mixer) {
      this.mixer.update(this.context.clock.getDelta());
    }
  }
}

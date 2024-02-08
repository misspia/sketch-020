import * as THREE from "three";
// @ts-ignore
import { FBXLoader } from "three/addons/loaders/FBXLoader";
import { assets } from "../themes";

export class Model {
  constructor() {}

  load() {
    const loader = new FBXLoader();
    loader.load(assets.Rig, (object) => {
      console.log(object);
    });
  }

  update() {}
}

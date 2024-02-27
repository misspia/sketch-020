import * as THREE from "three";
import { Model } from "@webgl/EntryView/Model";
import { TypeEffect } from "@webgl/EntryView/TypeEffect";

export class EntryView {
  constructor(context) {
    this.context = context;
    this.model = new Model(this.context);
    this.primaryTypeEffect = new TypeEffect();
    this.group = new THREE.Group();

    this.group.add(this.model.group);
    this.group.add(this.primaryTypeEffect.group);
  }

  /**
   *
   * @param {string} modelUrl
   * @param {string[]} types
   *
   */
  async setEntry({ modelUrl, types }) {
    await this.model.load(modelUrl);
    this.primaryTypeEffect.setType(types[0]);
  }

  update() {}
}

import * as THREE from "three";

export class TypeBackground {
  constructor(type) {
    this.type = type;
    this.group = new THREE.Group();
  }

  get position() {}

  update() {}
}

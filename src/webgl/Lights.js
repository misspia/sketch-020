import * as THREE from "three";

export class Lights {
  constructor(context) {
    this.context = context;
    this.ambient = new THREE.AmbientLight(0xffffff, 1.5);
    this.group = new THREE.Group();

    this.group.add(this.ambient);
  }

  init() {}

  update() {}
}

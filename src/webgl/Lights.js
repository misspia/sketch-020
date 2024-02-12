import * as THREE from "three";

export class Lights {
  constructor(context) {
    this.context = context;
    this.group = new THREE.Group();

    this.ambient = new THREE.AmbientLight(0xffffff, 2.5);
    this.group.add(this.ambient);

    this.directional = new THREE.DirectionalLight(0xffffff, 1);
    this.directional.position.set(0, 0, 10);
    this.group.add(this.directional);
  }

  init() {}

  update() {}
}

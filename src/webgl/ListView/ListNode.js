import * as THREE from "three";

export class ListNode {
  constructor() {
    this.group = new THREE.Group();
  }

  get position() {
    return this.group.position;
  }

  update() {}
}

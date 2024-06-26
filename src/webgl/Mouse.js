import * as THREE from 'three';
import * as ComponentNames from '@webgl/constants/componentNames';
import { remap } from '@webgl/utils';

export class Mouse {
  constructor(context) {
    this.context = context;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.mouseCSS = new THREE.Vector2();
    this.intersection = null;
  }

  get position() {
    return {
      x: this.mouse.x,
      y: this.mouse.y,
    };
  }

  get positionCSS() {
    return {
      left: this.mouseCSS.x,
      top: this.mouseCSS.y,
    }
  }

  get uv() {
    return {
      x: remap(-1, 1, 0, 1, this.mouse.x),
      y: remap(-1, 1, 0, 1, this.mouse.y),
    };
  }

  updatePosition(e) {
    const { height, width } = this.context.canvas;
    this.mouse.x = (e.clientX / width) * 2 - 1;
    this.mouse.y = -(e.clientY / height) * 2 + 1;

    this.mouseCSS.x = e.clientX;
    this.mouseCSS.y = e.clientY;
  }

  updateIntersection(intersectables = []) {
    this.context.camera.updateMatrix();
    this.raycaster.setFromCamera(this.mouse, this.context.camera);

    const intersections = this.raycaster.intersectObjects(intersectables, true);

    if (intersections) {
      this.intersection = intersections[0];
    } else {
      this.intersection = null;
    }
  }
  isIntersectionCardFront() {
    return this.intersection &&
      this.intersection.object.name === ComponentNames.HEX_FRONT;
  }

  isIntersectionCardBack() {
    return this.intersection &&
      this.intersection.object.name === ComponentNames.HEX_BACK;
  }

  isIntersectionCard() {
    return this.isIntersectionCardBack() || this.isIntersectionCardFront();
  }
}

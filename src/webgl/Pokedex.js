import * as THREE from "three";
import { SceneManager } from "@webgl/SceneManager";
import { Model } from "@webgl/Model";
import { Lights } from "@webgl/Lights";
import { Environment } from "@webgl/Environment";

export class Pokedex extends SceneManager {
  constructor(canvas, options = {}) {
    super(canvas, options);

    this.environment = new Environment(this);
    this.lights = new Lights(this);
    this.model = new Model(this);
    this.clock = new THREE.Clock();
  }
  init() {
    this.setClearColor(0xffffff);
    this.setCameraPos(0, 0, 3);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.scene.add(this.lights.group);
  }

  async loadModel(url) {
    await this.model.load(url);
  }

  updateModelPosition() {
    this.model.updatePosition();
  }
  setScissor(x, y, width, height) {
    this.renderer.setScissor(x, y, width, height);
  }

  enableScissor(enable) {
    this.renderer.setScissorTest(enable);
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
    this.controls.update();

    this.model.update();

    requestAnimationFrame(() => this.draw());
  }
}

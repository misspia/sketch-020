import * as THREE from "three";
import { SceneManager } from "./SceneManager";
import { Model } from "./Model";

export class Pokedex extends SceneManager {
  constructor(canvas, options = {}) {
    super(canvas, options);

    this.model = new Model();
  }
  init() {
    this.setClearColor(0x000000);
  }

  loadModel() {
    this.model.load();
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
    this.controls.update();

    requestAnimationFrame(() => this.draw());
  }
}

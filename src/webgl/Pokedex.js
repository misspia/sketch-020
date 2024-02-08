import * as THREE from "three";
import { SceneManager } from "./SceneManager";
import { Model } from "./Model";
import { Lights } from "./Lights";

export class Pokedex extends SceneManager {
  constructor(canvas, options = {}) {
    super(canvas, options);

    this.lights = new Lights(this);
    this.model = new Model(this);
    this.clock = new THREE.Clock();
  }
  init() {
    this.setClearColor(0xaaaaaa);
    this.setCameraPos(0, 0, 3);
    this.scene.add(this.lights.group);
  }

  loadModel() {
    this.model.load();
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
    this.controls.update();

    this.model.update();

    requestAnimationFrame(() => this.draw());
  }
}

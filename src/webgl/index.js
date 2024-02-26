import * as THREE from "three";
import { Pokedex } from "@webgl/Pokedex";

export class WebGLApp {
  constructor(canvas) {
    this.pokedex = new Pokedex(canvas);
  }

  resize(width, height) {
    this.pokedex.resize(width, height);
  }

  loadModel(url) {
    this.pokedex.loadModel(url);
  }

  updateModelPositin() {
    this.pokedex.updateModelPosition();
  }

  setScissor(x, y, width, height) {
    this.pokedex.setScissor(x, y, width, height);
  }

  enableScissor() {
    this.pokedex.enableScissor(true);
  }

  disableScissor() {
    this.pokedex.disableScissor(false);
  }

  draw() {
    this.pokedex.render();
  }
}

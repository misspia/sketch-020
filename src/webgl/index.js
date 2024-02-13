import * as THREE from "three";
import { Pokedex } from "@webgl/Pokedex";

export class WebGLApp {
  constructor(canvas) {
    this.pokedex = new Pokedex(canvas);
  }

  loadModel() {
    this.pokedex.loadModel();
  }

  resize(width, height) {
    this.pokedex.resize(width, height);
  }

  draw() {
    this.pokedex.render();
  }
}

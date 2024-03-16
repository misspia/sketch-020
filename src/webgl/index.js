import * as THREE from "three";
import { Pokedex } from "@webgl/Pokedex";

export class WebGLApp {
  constructor(canvas) {
    this.pokedex = new Pokedex(canvas);
  }

  resize(width, height) {
    this.pokedex.resize(width, height);
  }

  /**
   *
   * @param {string} modelUrl
   * @param {string[]} types
   *
   */
  async enterEntryStage({ modelUrl, types }) {
    await this.pokedex.enterEntryStage({ modelUrl, types });
  }

  /**
   * @param {Pokemon[]} allPokemon
   */
  enterListStage(allPokemon) {
    this.pokedex.enterListStage(allPokemon);
  }

  draw() {
    this.pokedex.render();
  }
}

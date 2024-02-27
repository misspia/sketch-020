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
  async setPokemonEntryView({ modelUrl, types }) {
    await this.pokedex.setPokemonEntryView({ modelUrl, types });
  }

  /**
   * @param {Pokemon[]} allPokemon
   */
  setListView(allPokemon) {
    this.pokedex.setListView(allPokemon);
  }

  draw() {
    this.pokedex.render();
  }
}

import * as THREE from "three";
import { SceneManager } from "@webgl/SceneManager";
import { Lights } from "@webgl/Lights";
import { Environment } from "@webgl/Environment";
import { EntryView } from "@webgl/EntryView";
import { ListView } from "@webgl/ListView";

export class Pokedex extends SceneManager {
  constructor(canvas, options = {}) {
    super(canvas, options);

    this.environment = new Environment(this);
    this.lights = new Lights(this);
    this.entryView = new EntryView(this);
    this.listView = new ListView(this);
    this.clock = new THREE.Clock();
  }
  init() {
    this.setClearColor(0xffffff);
    this.setCameraPos(0, 0, 3);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.scene.add(this.lights.group);
  }

  /**
   *
   * @param {string} modelUrl
   * @param {string[]} types
   *
   */
  async setPokemonEntryView({ modelUrl, types }) {
    this.entryView.setEntry({ modelUrl, types });
  }

  /**
   * @param {Pokemon[]} allPokemon
   */
  setListView(allPokemon) {
    this.listView.setList(allPokemon);
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
    this.controls.update();

    // conditionally update entry / list view based on app stage

    requestAnimationFrame(() => this.draw());
  }
}

import * as THREE from "three";
import { SceneManager } from "@webgl/SceneManager";
import { Lights } from "@webgl/Lights";
import { Environment } from "@webgl/Environment";
import { EntryStage } from "@webgl/EntryStage";
import { ListStage } from "@webgl/ListStage";

export class Pokedex extends SceneManager {
  constructor(canvas, options = {}) {
    super(canvas, options);

    this.environment = new Environment(this);
    this.lights = new Lights(this);
    this.entryStage = new EntryStage(this);
    this.listStage = new ListStage(this);
    this.clock = new THREE.Clock();
    this.currentStage = null;
  }
  init() {
    this.setClearColor(0xffffff);
    // this.setCameraPos(0, 0, 10);
    this.setCameraPos(0, 19, 0);

    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.scene.add(this.lights.group);
  }


  async exitCurrentStage() {
    if(!!this.currentStage) {
      await this.currentStage.exit();
      this.scene.remove(this.currentStage.group)
    }
    return;
  }
  /**
   *
   * @param {string} modelUrl
   * @param {string[]} types
   *
   */
  async enterEntryStage({ modelUrl, types }) {
    await this.exitCurrentStage();
    this.currentStage = this.entryStage;
    this.scene.add(this.entryStage.group);
    await this.entryStage.enterEntryStage({ modelUrl, types });
  }

  /**
   * @param {Pokemon[]} allPokemon
   */
  async enterListStage(allPokemon) {
    await this.exitCurrentStage();
    this.currentStage = this.listStage;
    this.scene.add(this.listStage.group);
    await this.listStage.enter(allPokemon);
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
    this.controls.update();

    if(this.currentStage) {
      this.currentStage.update();
    }

    // conditionally update entry / list view based on app stage

    requestAnimationFrame(() => this.draw());
  }
}

import * as THREE from "three";
import { BaseStage } from "@webgl/BaseStage";
import { Carousel } from "@webgl/ListStage/Carousel";

export class ListStage extends BaseStage {
  constructor(context) {
    super();
    this.context = context;
    this.group = new THREE.Group();
    this.carousel = new Carousel(this.context);

    this.group.add(this.carousel.group);
  }

  get position() {
    return this.group.position;
  }

  get rotation() {
    return this.group.rotation;
  }

  /**
   * @param {Pokemon[]} allPokemon
   */
  async enter(allPokemon) {
    this.carousel.enter(allPokemon);
  }

  async exit() {}

  update() {
    this.carousel.update();
  }
}

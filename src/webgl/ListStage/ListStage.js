import * as THREE from "three";
import { ListNode } from "@webgl/Liststage/ListNode";
import { BaseStage } from "@webgl/BaseStage";

export class ListStage extends BaseStage {
  constructor(context) {
    super();
    this.context = context;
    this.group = new THREE.Group();
    this.pokemon = [];
  }

  get position() {
    return this.group.position;
  }
  
   /**
   * @param {Pokemon[]} allPokemon
   */
  async enter(allPokemon) {
    this.setList(allPokemon)
  }

  async exit() {

  }

  /**
   * @param {Pokemon[]} allPokemon
   */
  setList(allPokemon) {
    this.pokemon = [];
    for (let i = 0; i < allPokemon.length; i++) {
      const pokemon = allPokemon[i];
      const node = new ListNode(pokemon.id, pokemon.spriteUrl);
      node.position.x = i * 2.5;
      this.pokemon.push(node);
      this.group.add(node.group);
    }
  }

  

  update() {}
}

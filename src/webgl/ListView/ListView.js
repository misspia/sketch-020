import * as THREE from "three";
import { ListNode } from "@webgl/ListView/ListNode";

export class ListView {
  constructor(context) {
    this.context = context;
    this.group = new THREE.Group();
    this.pokemon = [];
  }

  /**
   *
   * @param {Pokemon[]} allPokemon
   */
  setList(allPokemon) {
    this.pokemon = [];
    for (let i = 0; i < allPokemon.length; i++) {
      const node = new ListNode();
      node.position.x = i * 1.5;
      this.pokemon.push(node);
      this.group.add(node.group);
    }
  }

  update() {}
}

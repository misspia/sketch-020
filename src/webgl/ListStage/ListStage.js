import * as THREE from "three";
import { ListNode } from "@webgl/Liststage/ListNode";
import { BaseStage } from "@webgl/BaseStage";
import { toRadians } from '@webgl/utils'

export class ListStage extends BaseStage {
  constructor(context) {
    super();
    this.context = context;
    this.group = new THREE.Group();
    this.pokemon = [];
    this.center = new THREE.Vector3(0, 0, 0);
    this.rotationYVelocity = 0.002; 
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
    this.setList(allPokemon)
  }

  async exit() {

  }

  /**
   * @param {Pokemon[]} allPokemon
   */
  setList(allPokemon) {
    const radius = 7;
    const numPokemonPerRow = 18;
    const angleIncrement = (Math.PI * 2) / numPokemonPerRow;
    let y = 10;
    let angle = 0;

    for (let i = 0; i < allPokemon.length; i++) {
      const pokemon = allPokemon[i];
      const node = new ListNode(pokemon.id, pokemon.spriteUrl);
      angle += angleIncrement;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      if(i % numPokemonPerRow === 0) {
        angle = 0;
        y -= 2.5;
      }

      node.rotation.y = toRadians(0)

      node.position.set(x, y, z);
      this.pokemon.push(node);
      this.group.add(node.group);
    }
  }

  

  update() {
    this.rotation.y += this.rotationYVelocity;
  }
}

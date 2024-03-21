import * as THREE from "three";
import { ListNode, LIST_NODE_WIDTH } from "@webgl/Liststage/ListNode";
import { BaseStage } from "@webgl/BaseStage";
import { toRadians } from '@webgl/utils'

const HORIZONTAL_GAP = 0.5;
const VERTICAL_GAP = 2.5
export const TILE_WIDTH = LIST_NODE_WIDTH;
const TILES_PER_ROW = 25;
const CIRCUMFERENCE = TILES_PER_ROW * (TILE_WIDTH + HORIZONTAL_GAP * 2) - HORIZONTAL_GAP;
const RADIUS = CIRCUMFERENCE / (2 * Math.PI);

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
    const angleIncrement = (Math.PI * 2) / TILES_PER_ROW;
    let y = 10;
    let angle = 0;

    for (let i = 0; i < allPokemon.length; i++) {
      const pokemon = allPokemon[i];
      const node = new ListNode(pokemon.id, pokemon.spriteUrl);
      angle += angleIncrement;
      const x = Math.cos(angle) * RADIUS;
      const z = Math.sin(angle) * RADIUS;
      if(i % TILES_PER_ROW === 0) {
        angle = 0;
        y -= VERTICAL_GAP;
      }

      const yRotation = Math.cos(angle) * z - Math.sin(angle) * x;
      node.rotation.y = yRotation;

      node.position.set(x, y, z);
      this.pokemon.push(node);
      this.group.add(node.group);
    }
  }

  

  update() {
    this.rotation.y += this.rotationYVelocity;
  }
}

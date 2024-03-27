import * as THREE from "three";
import { ListNode } from "@webgl/Liststage/ListNode";
import { BaseStage } from "@webgl/BaseStage";
import { calcCircumference, FULL_CIRCLE_RADIANS } from '@webgl/utils'

const TOTAL_ENTRIES = 151;
const CAROUSEL_RADIUS = 16;
const NUM_ROWS = 3;
const ENTRIES_PER_ROW = Math.ceil(TOTAL_ENTRIES / NUM_ROWS);

const CIRCUMFERENCE = calcCircumference(CAROUSEL_RADIUS);
const GRID_WIDTH = CIRCUMFERENCE / ENTRIES_PER_ROW;
const ENTRY_WIDTH = GRID_WIDTH * 0.5;
const ENTRY_HEIGHT = ENTRY_WIDTH;
const ENTRY_PADDING = GRID_WIDTH - ENTRY_WIDTH;
const GRID_HEIGHT = ENTRY_HEIGHT + ENTRY_PADDING;

const ANGLE_INCREMENT = FULL_CIRCLE_RADIANS / ENTRIES_PER_ROW;
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
    for (let i = 0; i < allPokemon.length; i++) {
      const pokemon = allPokemon[i];
      const node = new ListNode({ id: pokemon.id, width: ENTRY_WIDTH, spriteUrl: pokemon.spriteUrl });

      const rotation = this.calcListItemRotation(i);
      const position = this.calcListItemPosition(i);
      node.rotation.set(rotation.x, rotation.y, rotation.z);
      node.position.set(position.x, position.y, position.z);
      this.pokemon.push(node);
      this.group.add(node.group);
    }
  }

  calcListItemPosition(index) {
    const centerCoord = this.group.position;
    const angle = ANGLE_INCREMENT * index;
    const verticalOffset = -Math.floor(index / ENTRIES_PER_ROW) * GRID_HEIGHT;
    return {
      x: CAROUSEL_RADIUS * Math.cos(angle) + centerCoord.x,
      y: centerCoord.y + verticalOffset,
      z: CAROUSEL_RADIUS * Math.sin(angle) + centerCoord.z,
    }
  }

  calcListItemRotation(index) {
    const ANGLE_INCREMENT = FULL_CIRCLE_RADIANS / ENTRIES_PER_ROW;
    const angleOffset = Math.PI / 2;
    const angle = -ANGLE_INCREMENT * index;
    return {
      x: 0,
      y: angleOffset + angle,
      z: 0,
    };
  }

  

  update() {
    this.rotation.y += this.rotationYVelocity;
  }
}

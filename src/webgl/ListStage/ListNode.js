import * as THREE from "three";
import { toRadians } from '@webgl/utils';
// import { TILE_WIDTH } from '.'

export const LIST_NODE_WIDTH = 1;

export class ListNode {
  constructor(id, spriteUrl) {
    this.id = id;
    this.spriteUrl = spriteUrl;
    this.loader = new THREE.TextureLoader();
    // this.imagePlane = this.createImagePlane() 
    this.tile = this.createTile()

    this.group = new THREE.Group();
    // this.group.add(this.imagePlane);
    this.group.add(this.tile);
  }

  get position() {
    return this.group.position;
  }

  get rotation() {
    return this.group.rotation;
  }
  
  enter() {

  }

  exit() {

  }
  

  createImagePlane() {
    const texture = this.loader.load(this.spriteUrl)
    const geometry = new THREE.PlaneGeometry( LIST_NODE_WIDTH, LIST_NODE_WIDTH, 32 );
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      map: texture,
    });
    const mesh = new THREE.Mesh( geometry, material );
    return mesh;
  }

  createTile() {
    const geometry = new THREE.CylinderGeometry( LIST_NODE_WIDTH, LIST_NODE_WIDTH, 0.5, 8,  ); 
    // const material = new THREE.MeshPhysicalMaterial({
    //   metalness: 0.4,
    //   roughness: 0.0,
    //   opacity: 0.5,
    //   transparent: true,
    //   color: 0x0000ff,
    //   sheen: 0x0000ff,
    // }); 
    const material = new THREE.MeshToonMaterial({
      // metalness: 0.4,
      // roughness: 0.0,
      // opacity: 0.5,
      // transparent: true,
      color: 0x0000ff,
      // sheen: 0x0000ff,
    }); 
    const mesh = new THREE.Mesh( geometry, material ); 
    mesh.rotation.x = toRadians(90)
    return mesh;
  }

 

  update() {}
}

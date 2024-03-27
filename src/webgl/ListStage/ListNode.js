import * as THREE from "three";
import { toRadians } from '@webgl/utils';

export class ListNode {
  constructor({ id, width, spriteUrl }) {
    this.id = id;
    this.spriteUrl = spriteUrl;
    this.loader = new THREE.TextureLoader();
    // this.imagePlane = this.createImagePlane(width, width) 
    this.tile = this.createTile(width, width)

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
  

  createImagePlane(width, height) {
    const texture = this.loader.load(this.spriteUrl)
    const geometry = new THREE.PlaneGeometry( width, height, 32 );
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      map: texture,
    });
    const mesh = new THREE.Mesh( geometry, material );
    return mesh;
  }

  createTile(width, height) {
    const geometry = new THREE.CylinderGeometry(width, height, 0.5, 8,  ); 
    const material = new THREE.MeshPhysicalMaterial({
      metalness: 0.4,
      roughness: 0.0,
      opacity: 0.5,
      transparent: true,
      color: 0x0000ff,
      sheen: 0x0000ff,
    }); 
    // const material = new THREE.MeshToonMaterial({
    //   // metalness: 0.4,
    //   // roughness: 0.0,
    //   // opacity: 0.5,
    //   // transparent: true,
    //   color: 0x0000ff,
    //   // sheen: 0x0000ff,
    // }); 
    const mesh = new THREE.Mesh( geometry, material ); 
    mesh.rotation.x = toRadians(90)
    return mesh;
  }

 

  update() {}
}

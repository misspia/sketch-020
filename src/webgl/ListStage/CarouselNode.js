import * as THREE from "three";
import gsap from "gsap";
import { toRadians, randomFloatBetween } from "@webgl/utils";

export class CarouselNode {
  constructor({ id, width, spriteUrl }) {
    this.id = id;
    this.spriteUrl = spriteUrl;
    this.loader = new THREE.TextureLoader();
    this.imagePlane = this.createImagePlane(width, width);
    this.tile = this.createTile(width, width);

    this.group = new THREE.Group();
    this.group.add(this.imagePlane);
    this.group.add(this.tile);
  }

  get position() {
    return this.group.position;
  }

  get rotation() {
    return this.group.rotation;
  }

  async enter() {
    return new Promise((resolve) => {
      const delay = randomFloatBetween(0, 3);
      const duration = randomFloatBetween(1, 3);
      const tl = gsap.timeline({
        onComplete: () => resolve(),
      });
      tl.from(
        this.tile.material,
        {
          opacity: 0,
          duration,
          delay,
        },
        "start",
      )
        .from(
          this.tile.position,
          {
            z: randomFloatBetween(2, 3.5),
            duration,
            delay,
            ease: "power2.out",
          },
          "start",
        )
        .from(this.imagePlane.material, {
          opacity: 0,
        });
    });
  }

  async exit() {
    return new Promise((resolve) => {
      const duration = 1;
      const delay = randomFloatBetween(0, 2);
      const tl = gsap.timeline({ onComplete: () => resolve() });
      tl.to(
        this.imagePlane.material,
        {
          opacity: 0,
          duration,
          delay,
        },
        "start",
      ).to(
        this.tile.material,
        {
          opacity: 0,
          duration,
          delay,
        },
        "start",
      );
    });
  }

  activate() {}

  deactivate() {}

  mouseEnter() {}

  mouseLeave() {}

  createImagePlane(width, height) {
    // const texture = this.loader.load(this.spriteUrl)
    const geometry = new THREE.PlaneGeometry(width, height, 32);
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      // map: texture,
    });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }

  createTile(width, height) {
    const geometry = new THREE.CylinderGeometry(width, height, 0.5, 8);
    const material = new THREE.MeshPhysicalMaterial({
      metalness: 0.4,
      roughness: 0.0,
      opacity: 0.5,
      transparent: true,
      color: 0x22aaff,
      sheen: 0xffffff,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = toRadians(90);
    return mesh;
  }

  update() {}
}

import * as THREE from "three";
import { BaseStage } from "@webgl/BaseStage";
import { Carousel } from "@webgl/ListStage/Carousel";
import { Mouse } from '@webgl/Mouse'
import gsap from 'gsap'

export class ListStage extends BaseStage {
  constructor(context) {
    super();
    this.context = context;
    this.group = new THREE.Group();
    this.carousel = new Carousel(this.context);
    this.isMousemoveDisabled = false;
    this.mouse = new Mouse(context)

    this.group.add(this.carousel.group);
    this.init();
  }

  get position() {
    return this.group.position;
  }

  get rotation() {
    return this.group.rotation;
  }

  init() {
    window.addEventListener('mousemove', this.onMouseMove)
  }

  /**
   * @param {Pokemon[]} allPokemon
   */
  async enter(allPokemon) {
    this.carousel.enter(allPokemon);
  }

  async exit() {
    window.removeEventListener('mousemove', this.onMouseMove)
  }


  onMouseMove = (e) => {
    if(this.isMousemoveDisabled) return;

    this.mouse.updatePosition(e)
    // this.mouse.updateIntersection([this.carousel])
    this.mouse.updateIntersection([])

    const { intersection } = this.mouse;

    if (intersection && intersection.object.name === ComponentNames.GATE) {
      gsap.to(this.gate.material.uniforms.uPos.value, 1.2, {
        x: intersection.uv.x,
        y: intersection.uv.y,
        ease: Power2.easeOut,
      });

    }
  }

  update() {
    this.carousel.update();
  }
}

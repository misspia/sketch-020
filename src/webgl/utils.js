import * as THREE from "three";

export const toRadians = (degrees) => (degrees * Math.PI) / 180;

export const clamp = (min, max, value) => Math.min(Math.max(value, min), max);

export const getCenter = (obj3d) =>
  new THREE.Box3().setFromObject(obj3d).getCenter();

export const remap = (min1, max1, min2, max2, value) =>
  min2 + ((max2 - min2) * (value - min1)) / (max1 - min1);

export const FULL_CIRCLE_RADIANS = 2 * Math.PI;

export const calcCircumference = (radius) => 2 * Math.PI * radius;

export const randomFloatBetween = (min, max) =>
  Math.random() * (max - min) + min;

export const randomIntBetween = (min, max) =>
  Math.round(utils.randomFloatBetween(min, max));

export const randomBool = () => Math.random() > 0.5;

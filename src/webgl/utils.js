import * as THREE from "three";

export const toRadians = (degrees) => (degrees * Math.PI) / 180;

export const clamp = (min, max, value) => Math.min(Math.max(value, min), max);

export const getCenter = (obj3d) =>
  new THREE.Box3().setFromObject(obj3d).getCenter();

export const remap = (min1, max1, min2, max2, value) =>
  min2 + ((max2 - min2) * (value - min1)) / (max1 - min1);

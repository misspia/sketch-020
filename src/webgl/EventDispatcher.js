import { EventDispatcher as THREEEventDispatcher } from "three";
import { WebglEvents } from "@constants/events";

export class EventDispatcher {
  constructor() {
    this.dispatcher = new EventDispatcher();
  }

  on(eventName, callback) {
    this.dispatcher.addEventListener(eventName, callback);
  }

  off(eventName, callback) {
    this.dispatcher.removeEventListener(eventName, callback);
  }

  dispatch(eventName, data) {
    this.dispatcher.dispatchEvent({ type: eventName, ...data });
  }
}

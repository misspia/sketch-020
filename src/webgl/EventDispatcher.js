import { EventDispatcher as THREEEventDispatcher } from "three";

export class EventDispatcher extends THREEEventDispatcher {
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

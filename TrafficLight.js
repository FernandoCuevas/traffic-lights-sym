'use strict';
/**
 * TrafficLight light's ENUM.
 */
const LIGHTS = {
  GREEN: 'GREEN',
  YELLOW: 'YELLOW',
  RED: 'RED',
  OFF: 'OFF'
}
/**
 * 
 * @param {string} label that identifies a particular TrafficLight. Passed as a parameter to the TrafficLightIntersection logger.
 */
function TrafficLight(label) {
  let self = this;
  /** Initial state is OFF */
  let light = LIGHTS.OFF;

  self.setLight = l => light = l;

  self.getLight = () => light;

  self.getLabel = () => label;
}

TrafficLight.LIGHTS = LIGHTS;

module.exports = TrafficLight;
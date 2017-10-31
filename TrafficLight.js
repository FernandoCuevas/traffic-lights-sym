'use strict';

const LIGHTS = {
  GREEN: 'GREEN',
  YELLOW: 'YELLOW',
  RED: 'RED',
  OFF: 'OFF'
}

function TrafficLight(label) {
  let self = this;
  let light = LIGHTS.OFF;

  self.setLight = l => light = l;

  self.getLight = () => light;

  self.getLabel = () => label;
}

TrafficLight.LIGHTS = LIGHTS;

module.exports = TrafficLight;
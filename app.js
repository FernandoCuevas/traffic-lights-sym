'use strict';
const TrafficLightIntersection = require('./TrafficLightIntersection');
/**
 * Creates a new instance of TrafficLightIntersection using a stdout logger and starts a simulation with the default parameters.
 */
new TrafficLightIntersection((label, prev, next) => {
  console.log(`Traffic light ${label} changed from '${prev}' to '${next}'`);
}).simulate();
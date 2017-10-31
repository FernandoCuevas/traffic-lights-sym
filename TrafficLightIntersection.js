'use strict';
const TrafficLight = require('./TrafficLight');
/**
 * Creates a TrafficLightIntersection instance.
 * TrafficLightIntersection represents a set of traffic lights in a given intersection.
 * @constructor
 * @param {fn(label, prev, next)} log 
 */
function TrafficLightIntersection(log) {
  let self = this;
  /** Queue of TrafficLight sets. A TrafficLight set is a collection of TrafficLight objects whose lights need to be changed at the same time.  */
  let trafficLightSets = [];
  trafficLightSets.push([new TrafficLight('N'), new TrafficLight('S')]);
  trafficLightSets.push([new TrafficLight('E'), new TrafficLight('W')]);

  /**
   * Starts a simulation and outputs the traffic light changes to the logger provided in the class constructor.
   * @param {number} [lightDuration=300] how long should a light change take in ms
   * @param {number} [yellowLightDuration=30] how long should a yellow light last in ms
   * @param {number} [simulationDuration=1800] how long should the simulation take in ms
   * @returns {void}
   */
  self.simulate = function (lightDuration = 300, yellowLightDuration = 30, simulationDuration = 1800) {
    /**Turn the last traffic light in the queue to RED*/
    trafficLightSets[trafficLightSets.length - 1].forEach(trafficLight => {
      log(trafficLight.getLabel(), trafficLight.getLight(), TrafficLight.LIGHTS.RED);
      trafficLight.setLight(TrafficLight.LIGHTS.RED);
    });

    /** Turn the first traffic light set in the queue GREEN*/
    trafficLightSets[0].forEach(trafficLight => {
      log(trafficLight.getLabel(), trafficLight.getLight(), TrafficLight.LIGHTS.GREEN);
      trafficLight.setLight(TrafficLight.LIGHTS.GREEN);
      /** Turn the first traffic light set in the queue YELLOW in lightDuration - yellowLightDuration ms , IF there's still enough time left in the simulation */
      let yellowLightTimeout = lightDuration - yellowLightDuration;
      if (yellowLightTimeout <= simulationDuration) {
        setTimeout(() => {
          log(trafficLight.getLabel(), trafficLight.getLight(), TrafficLight.LIGHTS.YELLOW);
          trafficLight.setLight(TrafficLight.LIGHTS.YELLOW);
        }, yellowLightTimeout);
      }
    });

    /** Move the first traffic light set, the one we've just turned GREEN, to the end of the queue. */
    trafficLightSets.push(trafficLightSets.shift());

    /** If there's still enough time left, schedule another cycle of the simulation. */
    if (simulationDuration >= lightDuration) {
      setTimeout(() => {
        self.simulate(lightDuration, yellowLightDuration, simulationDuration - lightDuration);
      }, lightDuration);
    }
    console.log('========================');
  }

  /**
   * Returns the current state of the traffic lights.
   * @returns {Object[]} TrafficLight
   */
  self.getTrafficLights = () => trafficLightSets;
}

module.exports = TrafficLightIntersection;
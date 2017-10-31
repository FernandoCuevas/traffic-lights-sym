'use strict';
const TrafficLight = require('./TrafficLight');

function TrafficLightIntersection(log) {
  let self = this;

  let trafficLightSets = [];
  trafficLightSets.push([new TrafficLight('N'), new TrafficLight('S')]);
  trafficLightSets.push([new TrafficLight('E'), new TrafficLight('W')]);

  self.simulate = function (lightDuration = 300, yellowLightDuration = 30, simulationDuration = 1800) {
    //turn the last traffic light in the queue to RED
    trafficLightSets[trafficLightSets.length - 1].forEach(trafficLight => {
      log(trafficLight.getLabel(), trafficLight.getLight(), TrafficLight.LIGHTS.RED);
      trafficLight.setLight(TrafficLight.LIGHTS.RED);
    });

    //turn first traffic light set GREEN
    trafficLightSets[0].forEach(trafficLight => {
      log(trafficLight.getLabel(), trafficLight.getLight(), TrafficLight.LIGHTS.GREEN);
      trafficLight.setLight(TrafficLight.LIGHTS.GREEN);
      //turn first traffic light set YELLOW in lightDuration-yellowLightDuration seconds IF we still want to keep simulating
      let yellowLightTimeout = lightDuration - yellowLightDuration;
      if (yellowLightTimeout <= simulationDuration) {
        setTimeout(() => {
          log(trafficLight.getLabel(), trafficLight.getLight(), TrafficLight.LIGHTS.YELLOW);
          trafficLight.setLight(TrafficLight.LIGHTS.YELLOW);
        }, yellowLightTimeout);
      }
    });

    //move the first traffic light set to the end of the queue.
    trafficLightSets.push(trafficLightSets.shift());

    if (simulationDuration >= lightDuration) {
      setTimeout(() => {
        self.simulate(lightDuration, yellowLightDuration, simulationDuration - lightDuration);
      }, lightDuration);
    }
    console.log('========================');
  }

  self.getTrafficLights = () => trafficLightSets;
}

module.exports = TrafficLightIntersection;
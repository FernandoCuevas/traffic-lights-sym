'use strict';
const TrafficLightIntersection = require('./TrafficLightIntersection');
let tli = new TrafficLightIntersection((label,prev,next)=>{
  console.log(`Traffic light ${label} changed from '${prev}' to '${next}'`);
});
tli.simulate();

module.exports 
'use strict';
const TrafficLight = require('../TrafficLight');
/** Unit tests for the TrafficLight class */
describe('TrafficLight',function(){
  it('should set and get label',function(done){
    let trafficLight = new TrafficLight('N');
    expect(trafficLight.getLabel()).toBe('N');
    done();
  });
  it('should start light as OFF',function(done){
    let trafficLight = new TrafficLight('N');
    expect(trafficLight.getLight()).toBe(TrafficLight.LIGHTS.OFF);
    done();
  });
  it('should update light',function(done){
    let trafficLight = new TrafficLight('N');
    expect(trafficLight.getLight()).toBe(TrafficLight.LIGHTS.OFF);
    trafficLight.setLight(TrafficLight.LIGHTS.GREEN);
    expect(trafficLight.getLight()).toBe(TrafficLight.LIGHTS.GREEN);
    done();
  });
});

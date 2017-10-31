'use strict';
const TrafficLightIntersection = require('../TrafficLightIntersection');
const TrafficLight = require('../TrafficLight');

/** In-memory logger */
function Logger() {
  let logs = [];
  this.clear = () => logs = [];
  this.log = (label, prev, next) => logs.push({ label, prev, next });
  this.size = () => logs.length;
}

/** Unit tests for the TrafficLightIntersection class */
describe('TrafficLightIntersection', function () {

  /** Setup a logger and the Jasmine clock */
  beforeEach(function () {
    this.logger = new Logger();
    jasmine.clock().install();
  });

  /** Remove the Jasmine clock */
  afterEach(function () {
    jasmine.clock().uninstall();
  });

  describe('simulate a single cycle of two intersections', function () {
    it('should start with all lights OFF', function (done) {
      let trafficLightIntersection = new TrafficLightIntersection(this.logger.log);
      let trafficLightSets = trafficLightIntersection.getTrafficLights();
      trafficLightSets.forEach(set => {
        set.forEach(trafficLight => {
          expect(trafficLight.getLight()).toBe(TrafficLight.LIGHTS.OFF);
        })
      });
      done();
    });

    it('should change first light set from OFF to GREEN', function (done) {
      let trafficLightIntersection = new TrafficLightIntersection(this.logger.log);
      let trafficLightSet = trafficLightIntersection.getTrafficLights()[0];
      trafficLightSet.forEach(trafficLight => {
        expect(trafficLight.getLight()).toBe(TrafficLight.LIGHTS.OFF);
      });
      trafficLightIntersection.simulate(1, 1, 1);
      trafficLightSet.forEach(trafficLight => {
        expect(trafficLight.getLight()).toBe(TrafficLight.LIGHTS.GREEN);
      });
      done();
    });

    it('should change last light set from OFF to RED', function (done) {
      let trafficLightIntersection = new TrafficLightIntersection(this.logger.log);
      let trafficLightSet = trafficLightIntersection.getTrafficLights()[1];
      trafficLightSet.forEach(trafficLight => {
        expect(trafficLight.getLight()).toBe(TrafficLight.LIGHTS.OFF);
      });
      trafficLightIntersection.simulate(1, 1, 1);
      trafficLightSet.forEach(trafficLight => {
        expect(trafficLight.getLight()).toBe(TrafficLight.LIGHTS.RED);
      });
      done();
    });

    it('should change GREEN light to YELLOW', function (done) {
      let trafficLightIntersection = new TrafficLightIntersection(this.logger.log);
      let trafficLightSet = trafficLightIntersection.getTrafficLights()[0];
      trafficLightIntersection.simulate(2, 1, 2);
      trafficLightSet.forEach(trafficLight => {
        expect(trafficLight.getLight()).toBe(TrafficLight.LIGHTS.GREEN);
      });
      jasmine.clock().tick(1);
      trafficLightSet.forEach(trafficLight => {
        expect(trafficLight.getLight()).toBe(TrafficLight.LIGHTS.YELLOW);
      });
      done();
    });

    it('should change YELLOW light to RED', function (done) {
      let trafficLightIntersection = new TrafficLightIntersection(this.logger.log);
      let trafficLightSet = trafficLightIntersection.getTrafficLights()[0];
      trafficLightIntersection.simulate(2, 1, 2);
      jasmine.clock().tick(1);
      trafficLightSet.forEach(trafficLight => {
        expect(trafficLight.getLight()).toBe(TrafficLight.LIGHTS.YELLOW);
      });
      jasmine.clock().tick(1);
      trafficLightSet.forEach(trafficLight => {
        expect(trafficLight.getLight()).toBe(TrafficLight.LIGHTS.RED);
      });
      done();
    });
  });

  it('should change RED light to GREEN on second cycle', function (done) {
    let trafficLightIntersection = new TrafficLightIntersection(this.logger.log);
    let trafficLightSet = trafficLightIntersection.getTrafficLights()[1];
    trafficLightIntersection.simulate(1, 1, 2);
    trafficLightSet.forEach(trafficLight => {
      expect(trafficLight.getLight()).toBe(TrafficLight.LIGHTS.RED);
    });
    jasmine.clock().tick(1);
    trafficLightSet.forEach(trafficLight => {
      expect(trafficLight.getLight()).toBe(TrafficLight.LIGHTS.GREEN);
    });
    done();
  });

  it('should call simulate twice', function (done) {
    let trafficLightIntersection = new TrafficLightIntersection(this.logger.log);
    let spy = spyOn(trafficLightIntersection, 'simulate').and.callThrough();
    trafficLightIntersection.simulate(1, 1, 1);
    jasmine.clock().tick(1);
    expect(spy).toHaveBeenCalledTimes(2);
    done();
  });

  it('should call simulate three times', function (done) {
    let trafficLightIntersection = new TrafficLightIntersection(this.logger.log);
    let spy = spyOn(trafficLightIntersection, 'simulate').and.callThrough();
    trafficLightIntersection.simulate(1, 1, 2);
    jasmine.clock().tick(6);
    expect(spy).toHaveBeenCalledTimes(3);
    done();
  });

  it('should generate four log entries', function (done) {
    let trafficLightIntersection = new TrafficLightIntersection(this.logger.log);
    trafficLightIntersection.simulate(1, 1, 1);
    expect(this.logger.size()).toBe(4);
    done();
  });

});
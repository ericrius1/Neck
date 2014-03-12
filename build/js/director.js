var Director,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

FW.Director = Director = (function() {
  function Director() {
    this.run = __bind(this.run, this);
    this.scene1TotalTime = 10000;
    this.scene2TotalTime = 5000;
  }

  Director.prototype.startShow = function() {
    this.startTime = Date.now();
    FW.world = new FW.World();
    if (!soundOff) {
      FW.audio.source.noteOn(0);
    }
    return this.run();
  };

  Director.prototype.run = function() {
    requestAnimationFrame(this.run);
    FW.audio.update();
    return FW.world.render();
  };

  return Director;

})();

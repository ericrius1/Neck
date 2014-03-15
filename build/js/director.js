var Director,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

FW.Director = Director = (function() {
  function Director() {
    this.run = __bind(this.run, this);
    this.scene1TotalTime = 10000;
    this.scene2TotalTime = 5000;
  }

  Director.prototype.startShow = function() {
    var setTimeout,
      _this = this;
    this.startTime = Date.now();
    setTimeout = (function() {
      return console.log('yaaar');
    }, 1000);
    FW.world = new FW.World();
    if (!soundOff) {
      FW.audio.source.noteGrainOn(8, 0, 1000000);
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

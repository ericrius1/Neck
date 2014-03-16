var Director,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

FW.Director = Director = (function() {
  function Director() {
    this.run = __bind(this.run, this);
    this.scene1TotalTime = 10000;
    this.scene2TotalTime = 5000;
  }

  Director.prototype.startShow = function() {
    var _this = this;
    this.startTime = Date.now();
    setTimeout(function() {
      return _this.blowBalls();
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

  Director.prototype.blowBalls = function() {
    var ball, impulse, offset, _i, _len, _ref, _results;
    console.log('blow');
    _ref = FW.balls;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      ball = _ref[_i];
      impulse = new THREE.Vector3(rnd(-1000, 1000), rnd(1000, 4000), 2000);
      offset = new THREE.Vector3();
      _results.push(ball.ball.applyImpulse(impulse, offset));
    }
    return _results;
  };

  return Director;

})();

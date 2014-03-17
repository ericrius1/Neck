var World,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

FW.World = World = (function() {
  function World() {
    this.render = __bind(this.render, this);
    var light,
      _this = this;
    FW.bouncyFactor = 1.0;
    FW.clock = new THREE.Clock();
    this.SCREEN_WIDTH = window.innerWidth;
    this.SCREEN_HEIGHT = window.innerHeight;
    this.camFar = 200000;
    FW.audio.masterGain.value = 1;
    FW.bodies = [];
    this.gravity = -180;
    FW.camera = new THREE.PerspectiveCamera(70.0, this.SCREEN_WIDTH / this.SCREEN_HEIGHT, 1, this.camFar);
    FW.camera.position.set(0, 30, 80);
    this.initStats();
    Physijs.scripts.worker = 'lib/physijs/physijs_worker.js';
    Physijs.scripts.ammo = 'ammo.js';
    FW.scene = new Physijs.Scene();
    FW.scene.setGravity(new THREE.Vector3(0, this.gravity, 0));
    FW.scene.addEventListener('update', function() {
      FW.scene.simulate(void 0, 2);
      return _this.physics_stats.update();
    });
    this.initSceneObjects();
    light = new THREE.PointLight(0xffffff, 1, 200);
    light.position.set(-20, 20, 20);
    FW.scene.add(light);
    light = new THREE.PointLight(0xff00ff, 1, 200);
    light.position.set(20, 20, -20);
    FW.scene.add(light);
    FW.Renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    FW.Renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
    document.body.appendChild(FW.Renderer.domElement);
    window.addEventListener("resize", (function() {
      return _this.onWindowResize();
    }), false);
    this.playWithBalls();
    FW.scene.simulate();
  }

  World.prototype.initSceneObjects = function() {
    this.spectrum = new FW.Spectrum();
    this.screens = new FW.Screens();
    return FW.fire = new FW.Fire();
  };

  World.prototype.onWindowResize = function(event) {
    this.SCREEN_WIDTH = window.innerWidth;
    this.SCREEN_HEIGHT = window.innerHeight;
    FW.Renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
    FW.camera.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;
    return FW.camera.updateProjectionMatrix();
  };

  World.prototype.initStats = function() {
    this.render_stats = new Stats();
    this.render_stats.domElement.style.position = 'absolute';
    this.render_stats.domElement.style.top = '0px';
    this.render_stats.domElement.style.zIndex = 100;
    this.physics_stats = new Stats();
    this.physics_stats.domElement.style.position = 'absolute';
    this.physics_stats.domElement.style.top = '50px';
    return this.physics_stats.domElement.style.zIndex = 100;
  };

  World.prototype.render = function() {
    var delta;
    this.screens.update();
    FW.fire.update();
    this.render_stats.update();
    delta = FW.clock.getDelta();
    return FW.Renderer.render(FW.scene, FW.camera);
  };

  World.prototype.playWithBalls = function() {
    var ball, force, offset, _i, _len, _ref,
      _this = this;
    if (FW.ballImpulse > 2000) {
      force = new THREE.Vector3(rnd(-50, 50), FW.ballImpulse, rnd(-50, 50));
    } else {
      force = new THREE.Vector3(0, FW.ballImpulse, 0);
    }
    offset = new THREE.Vector3();
    _ref = _.sample(FW.balls, rnd(4, 8));
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      ball = _ref[_i];
      if (ball.ball.position.y < 10) {
        ball.ball.applyImpulse(force, offset);
      }
    }
    return setTimeout(function() {
      return _this.playWithBalls();
    }, 100);
  };

  return World;

})();

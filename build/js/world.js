var World,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

FW.World = World = (function() {
  function World() {
    this.render = __bind(this.render, this);
    var _this = this;
    FW.clock = new THREE.Clock();
    this.SCREEN_WIDTH = window.innerWidth;
    this.SCREEN_HEIGHT = window.innerHeight;
    this.camFar = 200000;
    FW.audio.masterGain.value = 1;
    FW.bodies = [];
    FW.camera = new THREE.PerspectiveCamera(60.0, this.SCREEN_WIDTH / this.SCREEN_HEIGHT, 1, this.camFar);
    FW.camera.position.set(0, 80, 10);
    this.controls = new THREE.TrackballControls(FW.camera);
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
    this.controls.noZoom = false;
    this.controls.noPan = false;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;
    this.initStats();
    Physijs.scripts.worker = '/lib/physijs/physijs_worker.js';
    Physijs.scripts.ammo = '/lib/physijs/ammo.js';
    FW.scene = new Physijs.Scene();
    FW.scene.setGravity(new THREE.Vector3(0, -90, 0));
    FW.scene.addEventListener('update', function() {
      FW.scene.simulate(void 0, 2);
      return _this.physics_stats.update();
    });
    this.initSceneObjects();
    FW.Renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    FW.Renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
    document.body.appendChild(FW.Renderer.domElement);
    window.addEventListener("resize", (function() {
      return _this.onWindowResize();
    }), false);
    FW.scene.simulate();
  }

  World.prototype.initSceneObjects = function() {
    this.spectrum = new FW.Spectrum();
    return this.screens = new FW.Screens();
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
    document.body.appendChild(this.render_stats.domElement);
    this.physics_stats = new Stats();
    this.physics_stats.domElement.style.position = 'absolute';
    this.physics_stats.domElement.style.top = '50px';
    this.physics_stats.domElement.style.zIndex = 100;
    return document.body.appendChild(this.physics_stats.domElement);
  };

  World.prototype.render = function() {
    var delta;
    this.screens.update();
    this.controls.update();
    this.render_stats.update();
    delta = FW.clock.getDelta();
    return FW.Renderer.render(FW.scene, FW.camera);
  };

  return World;

})();

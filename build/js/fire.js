var Fire;

FW.Fire = Fire = (function() {
  function Fire() {
    this.fireGroup = new SPE.Group({
      texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png')
    });
    this.colorEnd = new THREE.Color();
    this.position = new THREE.Vector3(-5000, 100, -30000);
    this.colorEnd.setRGB(Math.random(), Math.random(), Math.random());
    this.generateFire();
    FW.scene.add(this.fireGroup.mesh);
  }

  Fire.prototype.generateFire = function() {
    var colorStart;
    colorStart = new THREE.Color();
    colorStart.setRGB(.7, .2, .3);
    this.fireEmitter = new SPE.Emitter({
      colorStart: colorStart,
      position: new THREE.Vector3(14, 35, -50),
      velocity: new THREE.Vector3(0, 0, 150),
      acceleration: new THREE.Vector3(0, 0, 10),
      velocitySpread: new THREE.Vector3(40, 20, 40),
      sizeStart: 20,
      colorStartSpread: new THREE.Vector3(.3, .2, .2),
      particleCount: 1000
    });
    this.fireEmitter.disable();
    return this.fireGroup.addEmitter(this.fireEmitter);
  };

  Fire.prototype.activate = function() {
    return this.fireEmitter.enable();
  };

  Fire.prototype.deactivate = function() {
    return this.fireEmitter.disable();
  };

  Fire.prototype.update = function() {
    return this.fireGroup.tick();
  };

  return Fire;

})();

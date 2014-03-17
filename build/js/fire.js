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
    colorStart.setRGB(.8, .1, .9);
    this.fireEmitter = new SPE.Emitter({
      colorStart: colorStart
    });
    return this.fireGroup.addEmitter(this.fireEmitter);
  };

  Fire.prototype.activate = function() {
    return this.fireEmitter.enable();
  };

  Fire.prototype.update = function() {
    return this.fireGroup.tick();
  };

  return Fire;

})();

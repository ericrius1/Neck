var Screen;

FW.Screen = Screen = (function() {
  function Screen(position) {
    var ball, h, handleCollision, material, screenMaterial, w,
      _this = this;
    this.timeOfLastCollision = Date.now();
    this.debounceTime = 100;
    this.spiceRange = {
      startX: .23,
      startY: .7375,
      endX: .48,
      endY: 1
    };
    this.uniforms = {
      time: {
        type: 'f',
        value: 1.0
      },
      resolution: {
        type: 'v2',
        value: new THREE.Vector2()
      },
      spice: {
        type: 'v2',
        value: new THREE.Vector2(rnd(this.spiceRange.startX, this.spiceRange.startY), rnd(this.spiceRange.endX, this.spiceRange.endY))
      },
      texture: {
        type: 't',
        value: FW.screenTexture
      }
    };
    w = 1 / window.innerWidth;
    h = 1 / window.innerHeight;
    this.uniforms.resolution.value.set(w, h);
    material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: document.getElementById('vertexShader').textContent,
      fragmentShader: document.getElementById('fragmentShader1').textContent
    });
    screenMaterial = Physijs.createMaterial(material, 0, FW.bouncyFactor);
    this.screen = new Physijs.BoxMesh(FW.screenGeometry, screenMaterial, 0);
    this.screen.position = position;
    FW.scene.add(this.screen);
    handleCollision = function() {
      var currentTime;
      currentTime = Date.now();
      if (currentTime - _this.timeOfLastCollision > _this.debounceTime) {
        _this.uniforms.spice.value.set(rnd(_this.spiceRange.startX, _this.spiceRange.startY), rnd(_this.spiceRange.endX, _this.spiceRange.endY));
      }
      return _this.timeOfLastCollision = currentTime;
    };
    this.screen.addEventListener('collision', handleCollision);
    ball = new FW.Ball(new THREE.Vector3(position.x, position.y + 30, position.z));
    FW.balls.push(ball);
  }

  return Screen;

})();

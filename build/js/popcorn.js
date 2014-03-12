var Popcorn;

FW.Popcorn = Popcorn = (function() {
  function Popcorn() {
    var canvas, h, imageData, pixelsRoot, w;
    canvas = document.getElementById('textureData');
    this.context = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    imageData = this.context.createImageData(this.width, this.height);
    this.context.putImageData(imageData, 0, 0);
    this.texture = new THREE.Texture(canvas);
    this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
    this.pixels = FW.frequencyBinCount / 4;
    pixelsRoot = Math.pow(FW.frequencyBinCount, 0.5);
    this.uniforms = {
      time: {
        type: 'f',
        value: 1.0
      },
      resolution: {
        type: 'v2',
        value: new THREE.Vector2()
      },
      mouse: {
        type: 'v2',
        value: new THREE.Vector2(.29, .53)
      },
      texture: {
        type: 't',
        value: this.texture
      }
    };
    w = 1 / window.innerWidth;
    h = window.innerHeight;
    this.uniforms.resolution.value.set(w, h);
    this.createPopcornStand();
    this.slowUpdate();
  }

  Popcorn.prototype.createPopcornStand = function() {
    var ballMaterial, ground_material, handleCollision, material2, sphereGeometry,
      _this = this;
    material2 = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: document.getElementById('vertexShader').textContent,
      fragmentShader: document.getElementById('fragmentShader1').textContent
    });
    ground_material = Physijs.createMaterial(material2, .4, 0.3);
    this.ground = new Physijs.BoxMesh(new THREE.CubeGeometry(20, 1, 20), ground_material, 0);
    this.ground.receiveShadow = true;
    FW.scene.add(this.ground);
    sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    handleCollision = function(collided_with, linearVelocity, angularVelocity) {
      var x, y;
      x = rnd(.29, .53);
      y = rnd(.5, .9);
      return _this.uniforms.mouse.value.set(x, .54);
    };
    ballMaterial = Physijs.createMaterial(new THREE.MeshBasicMaterial(), .2, 1.0);
    this.ball = new Physijs.SphereMesh(sphereGeometry, ballMaterial, void 0);
    this.ball.position.set(0, 10, 0);
    this.ball.addEventListener('collision', handleCollision);
    return FW.scene.add(this.ball);
  };

  Popcorn.prototype.slowUpdate = function() {
    var impulse,
      _this = this;
    impulse = new THREE.Vector3(0, 1000, 0);
    this.ball.applyImpulse(impulse, this.ball.position);
    return setTimeout(function() {
      return _this.slowUpdate();
    }, 3000);
  };

  Popcorn.prototype.update = function() {
    var a, b, g, i, imageData, r, time, x, y, _i, _ref;
    time = Date.now() - this.startTime;
    this.uniforms.time.value = time / 1000;
    imageData = this.context.createImageData(this.width, this.height);
    for (i = _i = 0, _ref = this.pixels; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      x = i;
      y = 0;
      r = FW.freqByteData[i] | 0;
      g = FW.freqByteData[i + 1] | 0;
      b = FW.freqByteData[i + 2] | 0;
      a = FW.freqByteData[i + 3] | 0;
      this.setPixel(imageData, x, y, r, g, b, a);
    }
    this.context.putImageData(imageData, 0, 0);
    return this.texture.needsUpdate = true;
  };

  Popcorn.prototype.setPixel = function(imageData, x, y, r, g, b, a) {
    var index;
    index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    return imageData.data[index + 3] = a;
  };

  return Popcorn;

})();

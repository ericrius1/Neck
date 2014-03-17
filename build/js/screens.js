var Screens;

FW.Screens = Screens = (function() {
  function Screens() {
    var canvas, imageData, pixelsRoot;
    this.spiceRange = {
      startX: .5,
      startY: .5675,
      endX: .52,
      endY: .63
    };
    this.screens = [];
    FW.balls = [];
    canvas = document.getElementById('textureData');
    this.context = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    imageData = this.context.createImageData(this.width, this.height);
    this.context.putImageData(imageData, 0, 0);
    FW.screenTexture = new THREE.Texture(canvas);
    FW.screenTexture.wrapS = FW.screenTexture.wrapT = THREE.RepeatWrapping;
    this.pixels = FW.frequencyBinCount / 4;
    pixelsRoot = Math.pow(FW.frequencyBinCount, 0.5);
    this.layoutScreens();
  }

  Screens.prototype.setPixel = function(imageData, x, y, r, g, b, a) {
    var index;
    index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    return imageData.data[index + 3] = a;
  };

  Screens.prototype.layoutScreens = function() {
    var ceiling, frontWall, h, leftWall, material, numScreensPerRow, rightWall, screen, screenMaterial, screenSize, side, w, wallGeometry, wallMaterial, x, z, _i, _j, _ref, _ref1, _ref2, _ref3;
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
      },
      colorTwerk: {
        type: 'v3',
        value: new THREE.Vector3(.01, .1, .3)
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
    side = 100;
    numScreensPerRow = 4;
    screenSize = side / numScreensPerRow;
    FW.screenGeometry = new THREE.CubeGeometry(side / numScreensPerRow, 7, side / numScreensPerRow);
    for (x = _i = _ref = -side / 2 + screenSize / 2, _ref1 = side / 2 - screenSize / 2; screenSize > 0 ? _i <= _ref1 : _i >= _ref1; x = _i += screenSize) {
      for (z = _j = _ref2 = -side / 2 + screenSize / 2, _ref3 = side / 2 - screenSize / 2; screenSize > 0 ? _j <= _ref3 : _j >= _ref3; z = _j += screenSize) {
        screen = new FW.Screen(new THREE.Vector3(x, 0, z));
      }
    }
    wallMaterial = Physijs.createMaterial(new THREE.MeshNormalMaterial(), .4, FW.bouncyFactor);
    wallGeometry = new THREE.CubeGeometry(side, 1, side);
    frontWall = new Physijs.BoxMesh(wallGeometry, screenMaterial, 0);
    frontWall.rotation.x = Math.PI / 2;
    frontWall.position.z += side / 2;
    frontWall.position.y += side / 2;
    FW.scene.add(frontWall);
    frontWall.visible = false;
    FW.mediaScreen = new FW.MediaScreen();
    leftWall = new Physijs.BoxMesh(wallGeometry, screenMaterial, 0);
    leftWall.rotation.z = Math.PI / 2;
    leftWall.position.x -= side / 2;
    leftWall.position.y += side / 2;
    FW.scene.add(leftWall);
    rightWall = new Physijs.BoxMesh(wallGeometry, screenMaterial, 0);
    rightWall.rotation.z = Math.PI / 2;
    rightWall.position.x += side / 2;
    rightWall.position.y += side / 2;
    FW.scene.add(rightWall);
    ceiling = new Physijs.BoxMesh(wallGeometry, screenMaterial, 0);
    ceiling.position.y += side;
    return FW.scene.add(ceiling);
  };

  Screens.prototype.update = function() {
    var a, b, g, i, imageData, r, x, y, _i, _ref;
    FW.mediaScreen.update();
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
    return FW.screenTexture.needsUpdate = true;
  };

  return Screens;

})();

var Screens;

FW.Screens = Screens = (function() {
  function Screens() {
    var canvas, imageData, pixelsRoot;
    this.screens = [];
    this.screenSize = 20;
    this.numUnitsAcross = 4;
    FW.screenGeometry = new THREE.CubeGeometry(this.screenSize, 1, this.screenSize);
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
    var backWall, floor, frontWall, leftWall, rightWall, side, size, wallGeometry, wallMaterial;
    size = 100;
    wallMaterial = Physijs.createMaterial(new THREE.MeshNormalMaterial(), .4, 0.3);
    side = 100;
    wallGeometry = new THREE.CubeGeometry(side, 1, side);
    floor = new Physijs.BoxMesh(wallGeometry, wallMaterial, 0);
    FW.scene.add(floor);
    frontWall = new Physijs.BoxMesh(wallGeometry, wallMaterial, 0);
    frontWall.rotation.x = Math.PI / 2;
    frontWall.position.z += side / 2;
    frontWall.position.y += side / 2;
    FW.scene.add(frontWall);
    backWall = new Physijs.BoxMesh(wallGeometry, wallMaterial, 0);
    backWall.rotation.x = Math.PI / 2;
    backWall.position.z -= side / 2;
    backWall.position.y += side / 2;
    FW.scene.add(backWall);
    leftWall = new Physijs.BoxMesh(wallGeometry, wallMaterial, 0);
    leftWall.rotation.z = Math.PI / 2;
    leftWall.position.x -= side / 2;
    leftWall.position.y += side / 2;
    FW.scene.add(leftWall);
    rightWall = new Physijs.BoxMesh(wallGeometry, wallMaterial, 0);
    rightWall.rotation.z = Math.PI / 2;
    rightWall.position.x += side / 2;
    rightWall.position.y += side / 2;
    return FW.scene.add(rightWall);
  };

  Screens.prototype.update = function() {
    var a, b, g, i, imageData, impulse, offset, r, randIndex, x, y, _i, _ref;
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
    FW.screenTexture.needsUpdate = true;
    randIndex = Math.floor(rnd(0, 100));
    if (randIndex >= 0 && randIndex < 16) {
      impulse = new THREE.Vector3(0, 2000, 0);
      offset = new THREE.Vector3();
      return this.screens[randIndex].ball.ball.applyImpulse(impulse, offset);
    }
  };

  return Screens;

})();

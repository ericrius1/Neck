var Spectrum;

FW.Spectrum = Spectrum = (function() {
  function Spectrum() {
    var cubeWidth, i, specBox, specBoxTemplate, specGeo, specMat, xPos, xRange;
    xRange = 40;
    cubeWidth = xRange / 1024;
    this.specBoxes = [];
    specGeo = new THREE.CubeGeometry(cubeWidth, 1, 1);
    specBoxTemplate = (function() {
      var _i, _results;
      _results = [];
      for (i = _i = 0; _i < 1024; i = ++_i) {
        xPos = map(i, 0, 1024, -xRange / 2, xRange / 2);
        specMat = new THREE.MeshBasicMaterial();
        specBox = new THREE.Mesh(specGeo, specMat);
        specBox.material.color.setRGB(Math.random(), Math.random(), Math.random());
        specBox.position.set(xPos, 0, -50);
        FW.scene.add(specBox);
        _results.push(this.specBoxes.push(specBox));
      }
      return _results;
    }).call(this);
  }

  Spectrum.prototype.update = function() {
    var i, _i, _ref, _results;
    _results = [];
    for (i = _i = 0, _ref = this.specBoxes.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      _results.push(this.specBoxes[i].scale.y = Math.max(1, FW.freqByteData[i]));
    }
    return _results;
  };

  return Spectrum;

})();

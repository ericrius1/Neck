var MediaScreen;

FW.MediaScreen = MediaScreen = (function() {
  function MediaScreen() {
    var backWall, preVideoMaterial, screenGeo, side, videoMaterial;
    console.log('yyaarr');
    side = 100;
    screenGeo = new THREE.CubeGeometry(100, 100, 1);
    this.video = document.createElement('video');
    this.video.src = 'assets/intro.mp4';
    if (window.soundOff !== true) {
      this.video.autoplay = true;
    }
    this.videoTexture = new THREE.Texture(this.video);
    this.videoTexture.minFilter = THREE.LinearFilter;
    this.videoTexture.magFilter = THREE.LinearFilter;
    this.videoTexture.format = THREE.RGBFormat;
    this.videoTexture.generateMipmaps = false;
    preVideoMaterial = new THREE.MeshLambertMaterial({
      map: this.videoTexture
    });
    videoMaterial = Physijs.createMaterial(preVideoMaterial, .2, FW.bouncyFactor);
    backWall = new Physijs.BoxMesh(screenGeo, videoMaterial, 0);
    backWall.position.z -= side / 2;
    backWall.position.y = side / 2;
    FW.scene.add(backWall);
  }

  MediaScreen.prototype.update = function() {
    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      return this.videoTexture.needsUpdate = true;
    }
  };

  return MediaScreen;

})();

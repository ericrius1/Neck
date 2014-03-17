var MediaScreen;

FW.MediaScreen = MediaScreen = (function() {
  function MediaScreen() {
    var preVideoMaterial, screenGeo, side, videoMaterial;
    this.fileNames = ['assets/photos/neck1.jpg', 'assets/photos/neck2.jpg', 'assets/photos/neck3.jpg', 'assets/photos/kindness.jpg', 'assets/photos/home.jpg'];
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
    this.mediaScreen = new Physijs.BoxMesh(screenGeo, videoMaterial, 0);
    this.mediaScreen.position.z -= side / 2;
    this.mediaScreen.position.y = side / 2;
    FW.scene.add(this.mediaScreen);
  }

  MediaScreen.prototype.beginSlideShow = function() {
    this.currentIndex = 0;
    return this.updateSlideShow();
  };

  MediaScreen.prototype.updateSlideShow = function() {
    var _this = this;
    if (this.currentIndex >= this.fileNames.length) {
      return;
    }
    this.mediaScreen.material = new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture(this.fileNames[this.currentIndex])
    });
    return setTimeout(function() {
      _this.currentIndex++;
      return _this.updateSlideShow();
    }, 8000);
  };

  MediaScreen.prototype.update = function() {
    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      return this.videoTexture.needsUpdate = true;
    }
  };

  return MediaScreen;

})();

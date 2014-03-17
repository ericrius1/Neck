var MediaScreen;

FW.MediaScreen = MediaScreen = (function() {
  function MediaScreen() {
    var invitationGeo, invitationMaterial, invitationPhotoFileName, preVideoMaterial, screenGeo, side, videoMaterial;
    invitationPhotoFileName = 'assets/photos/home.jpg';
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
    invitationGeo = new THREE.PlaneGeometry(20, 30);
    invitationMaterial = new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('assets/photos/home.jpg')
    });
    this.invitation = new THREE.Mesh(invitationGeo, invitationMaterial);
    this.invitation.position.set(25, -7, 50);
    FW.scene.add(this.invitation);
  }

  MediaScreen.prototype.loopVideo = function() {
    var _this = this;
    this.video.src = 'assets/avatar.mov';
    return setTimeout(function() {
      return _this.loopVideo();
    }, 14000);
  };

  MediaScreen.prototype.update = function() {
    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      this.videoTexture.needsUpdate = true;
    }
    if (this.invitation.position.y < 25) {
      return this.invitation.position.y += .015;
    }
  };

  return MediaScreen;

})();

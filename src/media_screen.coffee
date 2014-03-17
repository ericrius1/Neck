FW.MediaScreen = class MediaScreen
  constructor: ()->
    invitationPhotoFileName = 'assets/photos/home.jpg'
    side = 100
    screenGeo = new THREE.CubeGeometry 100, 100, 1
    @video = document.createElement('video');
    @video.src = 'assets/intro.mp4'
    if window.soundOff isnt true
      @video.autoplay = true
    @videoTexture = new THREE.Texture(@video)
    @videoTexture.minFilter = THREE.LinearFilter;
    @videoTexture.magFilter = THREE.LinearFilter;
    @videoTexture.format = THREE.RGBFormat;
    @videoTexture.generateMipmaps = false;
    preVideoMaterial = new THREE.MeshLambertMaterial(map: @videoTexture)
    videoMaterial = Physijs.createMaterial \
      preVideoMaterial
      ,.2   #friction
      ,FW.bouncyFactor  #bouncy
    @mediaScreen = new Physijs.BoxMesh \
      screenGeo
      ,videoMaterial
      ,0 #mass
    @mediaScreen.position.z -= side/2
    @mediaScreen.position.y = side/2
    FW.scene.add @mediaScreen

    invitationGeo = new THREE.PlaneGeometry 20, 30
    invitationMaterial = new THREE.MeshBasicMaterial map: THREE.ImageUtils.loadTexture('assets/photos/home.jpg')
    @invitation = new THREE.Mesh invitationGeo, invitationMaterial
    @invitation.position.set 25, -7, 50 
    FW.scene.add @invitation

  #We've finished the video, now we transition to a slideshow
  loopVideo: ->
    @video.src = 'assets/avatar.mov'
    setTimeout(()=>
      @loopVideo()
    14000)


  update: ->
    if @video.readyState is @video.HAVE_ENOUGH_DATA 
      @videoTexture.needsUpdate = true
    if @invitation.position.y < 25 
      @invitation.position.y += .015
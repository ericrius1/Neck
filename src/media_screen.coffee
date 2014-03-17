FW.MediaScreen = class MediaScreen
  constructor: ()->
    @fileNames = [
      'assets/photos/neck1.jpg',
      'assets/photos/neck2.jpg',
      'assets/photos/neck3.jpg',
      'assets/photos/kindness.jpg',
      'assets/photos/home.jpg',

    ]
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

  #We've finished the video, now we transition to a slideshow
  beginSlideShow: ->
    @currentIndex = 0
    @updateSlideShow();

  updateSlideShow: ->
    if @currentIndex >= @fileNames.length
      return
    @mediaScreen.material = new THREE.MeshBasicMaterial(map: THREE.ImageUtils.loadTexture(@fileNames[@currentIndex]))
    setTimeout(()=>
      @currentIndex++
      @updateSlideShow()
    8000)






  update: ->
    if @video.readyState is @video.HAVE_ENOUGH_DATA 
      @videoTexture.needsUpdate = true
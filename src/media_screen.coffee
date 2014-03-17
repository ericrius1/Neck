FW.MediaScreen = class MediaScreen
  constructor: ()->
    console.log 'yyaarr'
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
    backWall = new Physijs.BoxMesh \
      screenGeo
      ,videoMaterial
      ,0 #mass
    backWall.position.z -= side/2
    backWall.position.y = side/2
    FW.scene.add backWall


  update: ->
    if @video.readyState is @video.HAVE_ENOUGH_DATA 
      @videoTexture.needsUpdate = true
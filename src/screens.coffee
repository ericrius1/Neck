#Abstract out everything every screen needs and handle initialization of all screens
#Can every screen use the same basic material??
FW.Screens = class Screens
  constructor: ->
    @spiceRange = 
      startX: .23
      startY: .7375
      endX: .48
      endY: 1
    @screens = []
    FW.balls = []
    @numUnitsAcross = 4
    #create a canvas element
    canvas = document.getElementById('textureData')
    @context = canvas.getContext('2d')

    #read the width and height of the canvas
    @width = canvas.width
    @height = canvas.height

    imageData = @context.createImageData(@width, @height)
    @context.putImageData imageData, 0, 0
    #Assigns the texture
    FW.screenTexture = new THREE.Texture canvas

    #wrap the texture so we have 'infinite' data 
    FW.screenTexture.wrapS = FW.screenTexture.wrapT = THREE.RepeatWrapping

    @pixels = FW.frequencyBinCount / 4
    pixelsRoot = Math.pow FW.frequencyBinCount, 0.5

    @layoutScreens()



  #Sets pixel data to the image data
  setPixel: (imageData, x, y, r, g, b, a) ->
    index = (x+ y * imageData.width) * 4
    imageData.data[index + 0] = r
    imageData.data[index + 1] = g
    imageData.data[index + 2] = b
    imageData.data[index + 3] = a

  layoutScreens: ->

    @uniforms = 
      time: {type: 'f', value: 1.0}
      resolution: { type: 'v2', value: new THREE.Vector2()}
      spice: {type: 'v2', value: new THREE.Vector2(rnd(@spiceRange.startX, @spiceRange.startY), rnd(@spiceRange.endX, @spiceRange.endY))}
      texture: {type: 't', value: FW.screenTexture}
      colorTwerk: {type: 'v3', value: new THREE.Vector3(.01, .1, .3)}

    w = 1/window.innerWidth
    h = 1/window.innerHeight
    @uniforms.resolution.value.set w, h


    material = new THREE.ShaderMaterial
      uniforms: @uniforms
      vertexShader: document.getElementById('vertexShader').textContent
      fragmentShader: document.getElementById('fragmentShader1').textContent
    screenMaterial = Physijs.createMaterial \
      material
      ,0 # friction
      ,FW.bouncyFactor #  (bounciness)

    side = 100
    numScreensPerRow = 5
    screenSize = side/numScreensPerRow
    FW.screenGeometry = new THREE.CubeGeometry(side/numScreensPerRow, 20, side/numScreensPerRow)
    for x in [-side/2 + screenSize/2..side/2- screenSize/2] by screenSize
      for z in [-side/2 +screenSize/2..side/2 - screenSize/2] by screenSize
         screen = new FW.Screen(new THREE.Vector3(x, 0, z))
   
    wallMaterial = Physijs.createMaterial \
      new THREE.MeshNormalMaterial()
      ,.4   #friction
      ,FW.bouncyFactor  #bouncy
    wallGeometry = new THREE.CubeGeometry side, 1, side


    #front side
    frontWall = new Physijs.BoxMesh \
      wallGeometry
      ,screenMaterial
      ,0 #mass
    frontWall.rotation.x  = Math.PI/2
    frontWall.position.z += side/2
    frontWall.position.y += side/2
    FW.scene.add frontWall
    frontWall.visible = false

    #MEDIA SCREEN
    FW.mediaScreen = new FW.MediaScreen()
 

    #leftside
    leftWall = new Physijs.BoxMesh \
      wallGeometry
      ,screenMaterial
      ,0 #mass
    leftWall.rotation.z  = Math.PI/2
    leftWall.position.x -= side/2
    leftWall.position.y += side/2
    FW.scene.add leftWall

    #rightside
    rightWall = new Physijs.BoxMesh \
      wallGeometry
      ,screenMaterial
      ,0 #mass
    rightWall.rotation.z  = Math.PI/2
    rightWall.position.x += side/2
    rightWall.position.y += side/2
    FW.scene.add rightWall

    #ceiling
    ceiling = new Physijs.BoxMesh \
    wallGeometry
    ,screenMaterial
    ,0 #mass
    ceiling.position.y += side
    FW.scene.add ceiling


  update: ->
    FW.mediaScreen.update()


    #creates the image data 
    imageData = @context.createImageData @width, @height

    #Transfer audio data to rgb values. 
    #It would be shitty and silly- shilly- to do this for every single screen
    for i in [0...@pixels]
      x = i
      y = 0
      r = FW.freqByteData[i] | 0
      g = FW.freqByteData[i+1] | 0
      b = FW.freqByteData[i+2] | 0
      a = FW.freqByteData[i+3]| 0
      @setPixel imageData, x, y, r, g, b, a

    @context.putImageData imageData, 0, 0

    #updates the texture
    FW.screenTexture.needsUpdate = true





 

#Abstract out everything every screen needs and handle initialization of all screens
#Can every screen use the same basic material??
FW.Screens = class Screens
  constructor: ->
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
    #FLOOR
    # startingXPos = -40
    # startingZPos = -40
    # for x in [0...@numUnitsAcross]
    #   for z in [0...@numUnitsAcross]
    #     xPos = startingXPos + (x * @screenSize)
    #     console.log 'xPos', xPos
    #     zPos = startingZPos + (z * @screenSize)
    #     position = new THREE.Vector3 xPos, 0, zPos
    #     @screens.push new FW.Screen(position)
    side = 100
    numScreensPerRow = 5
    screenSize = side/numScreensPerRow
    FW.screenGeometry = new THREE.CubeGeometry(side/numScreensPerRow, 1, side/numScreensPerRow)
    for x in [-side/2..side/2] by screenSize
      for z in [-side/2..side/2] by screenSize
         screen = new FW.Screen(new THREE.Vector3(x, 0, z))
    #SCREEN GEOMETRY
    #FLOOR
   
    wallMaterial = Physijs.createMaterial \
      new THREE.MeshNormalMaterial()
      ,.4
      ,0.3 
    wallGeometry = new THREE.CubeGeometry side, 1, side


    #front side
    frontWall = new Physijs.BoxMesh \
      wallGeometry
      ,wallMaterial
      ,0 #mass
    frontWall.rotation.x  = Math.PI/2
    frontWall.position.z += side/2
    frontWall.position.y += side/2
    FW.scene.add frontWall

    #backside
    backWall = new Physijs.BoxMesh \
      wallGeometry
      ,wallMaterial
      ,0 #mass
    backWall.rotation.x  = Math.PI/2
    backWall.position.z -= side/2
    backWall.position.y += side/2
    FW.scene.add backWall

    #leftside
    leftWall = new Physijs.BoxMesh \
      wallGeometry
      ,wallMaterial
      ,0 #mass
    leftWall.rotation.z  = Math.PI/2
    leftWall.position.x -= side/2
    leftWall.position.y += side/2
    FW.scene.add leftWall

    #rightside
    rightWall = new Physijs.BoxMesh \
      wallGeometry
      ,wallMaterial
      ,0 #mass
    rightWall.rotation.z  = Math.PI/2
    rightWall.position.x += side/2
    rightWall.position.y += side/2
    FW.scene.add rightWall

  update: ->
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

    # #picks a ball to add impulse to
    randIndex = Math.floor (rnd(0, 100))
    if randIndex >=0 and randIndex < FW.balls.length
      impulse = new THREE.Vector3(0, 2000, 0)
      offset = new THREE.Vector3()
      FW.balls[randIndex].ball.applyImpulse impulse, offset



 

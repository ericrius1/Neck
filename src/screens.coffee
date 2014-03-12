#Abstract out everything every screen needs and handle initialization of all screens
#Can every screen use the same basic material??
FW.Screens = class Screens
  constructor: ->
    @screens = []
    @screenSize = 20
    @numUnitsAcross = 4

    #SCREEN GEOMETRY
    FW.screenGeometry = new THREE.CubeGeometry(@screenSize, 1, @screenSize)
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
    startingXPos = -40
    startingZPos = -40
    for x in [0...@numUnitsAcross]
      for z in [0...@numUnitsAcross]
        xPos = startingXPos + (x * @screenSize)
        console.log 'xPos', xPos
        zPos = startingZPos + (z * @screenSize)
        position = new THREE.Vector3 xPos, 0, zPos
        @screens.push new FW.Screen(position)

    #SIDES

    material = Physijs.createMaterial \
      new THREE.MeshNormalMaterial()
      ,.4
      ,0.3 
    geometry = new THREE.CubeGeometry 1, 100, 100
    #right side

    side = new Physijs.BoxMesh \
      geometry
      ,material
      ,0 # mass
    side.position.x = 30
    FW.scene.add side

    #left side 
    side = new Physijs.BoxMesh \
      geometry
      ,material
      ,0 #mass
    side.position.x = -50
    FW.scene.add side

    #front side
    side = new Physijs.BoxMesh \
      geometry
      ,material
      ,0 #mass
    side.position.z = 30
    side.rotation.y  = Math.PI/2
    FW.scene.add side

    #back side
    side = new Physijs.BoxMesh \
      geometry
      ,material
      ,0 #mass
    side.position.z = -50 
    side.rotation.y = Math.PI/2
    FW.scene.add side


    
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

    #picks a ball to add impulse to
    randIndex = Math.floor (rnd(0, 100))
    if randIndex >=0 and randIndex < 16
      impulse = new THREE.Vector3(0, 2000, 0)
      offset = new THREE.Vector3()
      @screens[randIndex].ball.ball.applyImpulse impulse, offset



 

FW.Spectrum = class Spectrum
  constructor: ->
    #set up a row of 1024 cuebs- each one representing a fequency bin
    xRange = 40
    cubeWidth = xRange/1024
    @specBoxes = []

    specGeo = new THREE.CubeGeometry cubeWidth, 1, 1

    specBoxTemplate = 
    for i in [0...1024]
      xPos = map i, 0, 1024, -xRange/2, xRange/2
      specMat = new THREE.MeshBasicMaterial()
      specBox = new THREE.Mesh specGeo, specMat
      specBox.material.color.setRGB Math.random(), Math.random(), Math.random()
      specBox.position.set(xPos, 0, -50)
      FW.scene.add specBox
      @specBoxes.push specBox


  update: ->
    for i in [0...@specBoxes.length]
      #Toggle visibility on and off dynamically
      # console.log FW.freqMap.voiceStart
      # @specBoxes[i].visible = true
      @specBoxes[i].scale.y = Math.max(1, FW.freqByteData[i])
    # else
    #   @specBoxes[i].visible = false




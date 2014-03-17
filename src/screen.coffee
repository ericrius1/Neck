#Just hanle one screen as physics mesh


FW.Screen = class Screen
  constructor: (position)->
    @timeOfLastCollision = Date.now()
    @debounceTime = 100
    @spiceRange = 
      startX: .23
      startY: .7375
      endX: .48
      endY: 1

    @uniforms = 
      time: {type: 'f', value: 1.0}
      resolution: { type: 'v2', value: new THREE.Vector2()}
      spice: {type: 'v2', value: new THREE.Vector2(rnd(@spiceRange.startX, @spiceRange.startY), rnd(@spiceRange.endX, @spiceRange.endY))}
      texture: {type: 't', value: FW.screenTexture}

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
    
    @screen = new Physijs.BoxMesh \
      FW.screenGeometry
      ,screenMaterial
      ,0 # mass
    @screen.position = position
    FW.scene.add( @screen )
    handleCollision = () =>
      currentTime = Date.now()
      if currentTime - @timeOfLastCollision > @debounceTime
      #Lets change the screen if the time since last collision is greater than our debounce
        @uniforms.spice.value.set rnd(@spiceRange.startX, @spiceRange.startY), rnd(@spiceRange.endX, @spiceRange.endY)
      @timeOfLastCollision = currentTime

    @screen.addEventListener('collision', handleCollision)

    #associate a ball with a screen
    ball = new FW.Ball new THREE.Vector3(position.x, position.y + 30, position.z)
    FW.balls.push ball

    


  


    
        
FW.Fire = class Fire
  constructor: ()->

    @fireGroup = new SPE.Group(
      texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png')
    )

    @colorEnd = new THREE.Color()
    @position = new THREE.Vector3 -5000, 100, -30000
    @colorEnd.setRGB(Math.random(),Math.random(),Math.random() )
    @generateFire()
    FW.scene.add(@fireGroup.mesh)

  generateFire: ->
    colorStart = new THREE.Color()
    colorStart.setRGB .8, .1, .9
    @fireEmitter = new SPE.Emitter
      colorStart: colorStart
     
    
    # @fireEmitter.disable()
    @fireGroup.addEmitter @fireEmitter
  
  activate: ->
    @fireEmitter.enable()

  update: ->
    @fireGroup.tick()
    


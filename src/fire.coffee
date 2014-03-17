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
    colorStart.setRGB .7, .2, .3
    @fireEmitter = new SPE.Emitter
      colorStart: colorStart
      position: new THREE.Vector3 14, 35, -50
      velocity: new THREE.Vector3 0, 0, 100
      acceleration: new THREE.Vector3 0, 0, 10
      velocitySpread: new THREE.Vector3 20, 20, 20
      sizeStart: 20
      particleCount: 1000
     
    
    @fireEmitter.disable()
    @fireGroup.addEmitter @fireEmitter
  
  activate: ->
    @fireEmitter.enable()

  deactivate: ->
    @fireEmitter.disable()

  update: ->
    @fireGroup.tick()
    


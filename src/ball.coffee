FW.Ball= class Ball
  constructor: (@position)->
    sphereGeometry = new THREE.SphereGeometry 2, 32, 32
    color = new THREE.Color()
    color.setRGB rnd(0,1), rnd(0,1), rnd(0,1)
    ballMat = new THREE.MeshPhongMaterial(color: color)
    ballMaterial = Physijs.createMaterial \
      ballMat
      , 0.0 # low friction
      , 1.0 #bouncy
    @ball = new Physijs.SphereMesh sphereGeometry, ballMaterial, undefined
    @ball.position = @position
    #Each ball should have a particle emitter
    FW.scene.add @ball





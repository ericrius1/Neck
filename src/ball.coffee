FW.Ball= class Ball
  constructor: (@position)->
    sphereGeometry = new THREE.SphereGeometry 2, 32, 32
    color = new THREE.Color()
    color.setRGB rnd(0,1), rnd(0,1), rnd(0,1)
    ballMaterial = Physijs.createMaterial \
      new THREE.MeshBasicMaterial(color: color)
      , .2 # low friction
      , 0
    @ball = new Physijs.SphereMesh sphereGeometry, ballMaterial, undefined
    @ball.position = @position
    FW.scene.add @ball





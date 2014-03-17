FW.Ball= class Ball
  constructor: (@position)->
    sphereGeometry = new THREE.SphereGeometry 2, 32, 32
    color = new THREE.Color()
    color.setRGB rnd(0,1), rnd(0,1), rnd(0,1)
    ballMat = new THREE.MeshBasicMaterial map: THREE.ImageUtils.loadTexture('assets/photos/galaxy.jpg')
    ballMaterial = Physijs.createMaterial \
      ballMat
      , -1.0 # low friction
      , 1.0 #bouncy
    @ball = new Physijs.SphereMesh sphereGeometry, ballMaterial, undefined
    @ball.position = @position
    FW.scene.add @ball





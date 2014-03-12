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
    handleCollision = (collidedWith, linearVelocity, angularVelocity) ->
      if collidedWith.material.color?
        otherColor = collidedWith.material.color
        myColor = @material.color
        newRed = (myColor.r + otherColor.r)/2
        newGreen = (myColor.g + otherColor.g)/2
        newBlue = (myColor.b + otherColor.b)/2
        newColor = new THREE.Color()
        newColor.setRGB(newRed, newGreen, newBlue)
        @material.color = newColor
        collidedWith.material.color = newColor

    @ball.addEventListener('collision', handleCollision);




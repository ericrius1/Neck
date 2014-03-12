var Ball;

FW.Ball = Ball = (function() {
  function Ball(position) {
    var ballMaterial, color, handleCollision, sphereGeometry;
    this.position = position;
    sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    color = new THREE.Color();
    color.setRGB(rnd(0, 1), rnd(0, 1), rnd(0, 1));
    ballMaterial = Physijs.createMaterial(new THREE.MeshBasicMaterial({
      color: color
    }), .2, 0);
    this.ball = new Physijs.SphereMesh(sphereGeometry, ballMaterial, void 0);
    this.ball.position = this.position;
    FW.scene.add(this.ball);
    handleCollision = function(collidedWith, linearVelocity, angularVelocity) {
      var myColor, newBlue, newColor, newGreen, newRed, otherColor;
      if (collidedWith.material.color != null) {
        otherColor = collidedWith.material.color;
        myColor = this.material.color;
        newRed = (myColor.r + otherColor.r) / 2;
        newGreen = (myColor.g + otherColor.g) / 2;
        newBlue = (myColor.b + otherColor.b) / 2;
        newColor = new THREE.Color();
        newColor.setRGB(newRed, newGreen, newBlue);
        this.material.color = newColor;
        return collidedWith.material.color = newColor;
      }
    };
    this.ball.addEventListener('collision', handleCollision);
  }

  return Ball;

})();

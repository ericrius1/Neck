var Ball;

FW.Ball = Ball = (function() {
  function Ball(position) {
    var ballMaterial, color, sphereGeometry;
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
  }

  return Ball;

})();

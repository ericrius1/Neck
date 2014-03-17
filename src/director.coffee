FW.Director = class Director
  constructor: ->
    @scene1TotalTime = 10000
    @scene2TotalTime = 5000



  startShow: ->
    @startTime = Date.now()
    setTimeout(()=>
      @blowBalls()
      FW.fire.activate()
      setTimeout(()=>
        FW.fire.deactivate()
      1100)
    19000)


    FW.world = new FW.World()
    unless soundOff
      #when, starthere, duration
      FW.audio.source.noteGrainOn(8, 0, 1000000)

    @run()


  run: =>
    requestAnimationFrame @run
    FW.audio.update()
    FW.world.render()



  blowBalls: ->
    console.log 'blow'
    for ball in FW.balls
      impulse = new THREE.Vector3(rnd(-1000, 1000), rnd(1000, 4000), 2000)
      offset = new THREE.Vector3()
      ball.ball.applyImpulse impulse, offset



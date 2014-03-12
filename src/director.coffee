FW.Director = class Director
  constructor: ->
    @scene1TotalTime = 10000
    @scene2TotalTime = 5000


  startShow: ->
    @startTime = Date.now()

    FW.world = new FW.World()
    unless soundOff
      FW.audio.source.noteOn(0)

    @run()


  run: =>
    requestAnimationFrame @run
    FW.audio.update()
    FW.world.render()







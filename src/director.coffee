FW.Director = class Director
  constructor: ->
    @scene1TotalTime = 10000
    @scene2TotalTime = 5000


  startShow: ->
    @startTime = Date.now()
    setTimeout = (()=>
      console.log 'yaaar'
    1000)


    FW.world = new FW.World()
    unless soundOff
      #when, starthere, duration
      FW.audio.source.noteGrainOn(8, 0, 1000000)

    @run()


  run: =>
    requestAnimationFrame @run
    FW.audio.update()
    FW.world.render()







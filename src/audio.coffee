
FW.Audio = class Audio
  constructor: ->
    FW.frequencyBinCount = 1024

    context =  window.AudioContext || window.webkitAudioContext;
    @musicContext =  new context()
    @masterGain = @musicContext.createGain()
    @masterAnalyser = @musicContext.createAnalyser();

    #number of different parts of spectrum
    @masterAnalyser.frequencyBinCount = FW.frequencyBinCount

    @masterGain.connect @masterAnalyser
    @masterAnalyser.connect @musicContext.destination
    @loadFile('assets/Drinkin.mp3')

  loadFile: (filePath)->
    request = new XMLHttpRequest();
    request.open 'GET', filePath, true
    request.responseType= "arraybuffer"
    request.onload = =>
      @musicContext.decodeAudioData request.response, (buffer)=>
        unless buffer
          alert('error decoding file data!')
          return
        @buffer = buffer
        @createSource()
        @play()
    request.send()

  createSource: ->
    @source = @musicContext.createBufferSource()
    @source.buffer = @buffer
    @source.loop = false
    @analyser = @musicContext.createAnalyser()
    @gain = @musicContext.createGain()
    @source.connect @gain
    @gain.connect @analyser
    @analyser.connect @masterGain


  play: ->
    FW.director.startShow()

  update: ->
    FW.freqByteData = new Uint8Array(FW.audio.masterAnalyser.frequencyBinCount)
    FW.audio.masterAnalyser.getByteFrequencyData(FW.freqByteData)



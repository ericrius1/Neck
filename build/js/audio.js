var Audio;

FW.Audio = Audio = (function() {
  function Audio() {
    var context;
    FW.frequencyBinCount = 1024;
    context = window.AudioContext || window.webkitAudioContext;
    this.musicContext = new context();
    this.masterGain = this.musicContext.createGain();
    this.masterAnalyser = this.musicContext.createAnalyser();
    this.masterAnalyser.frequencyBinCount = FW.frequencyBinCount;
    this.masterGain.connect(this.masterAnalyser);
    this.masterGain.gain.value = 2.0;
    this.masterAnalyser.connect(this.musicContext.destination);
    this.loadFile('assets/Drinkin.mp3');
  }

  Audio.prototype.loadFile = function(filePath) {
    var request,
      _this = this;
    request = new XMLHttpRequest();
    request.open('GET', filePath, true);
    request.responseType = "arraybuffer";
    request.onload = function() {
      return _this.musicContext.decodeAudioData(request.response, function(buffer) {
        if (!buffer) {
          alert('error decoding file data!');
          return;
        }
        _this.buffer = buffer;
        _this.createSource();
        return _this.play();
      });
    };
    return request.send();
  };

  Audio.prototype.createSource = function() {
    this.source = this.musicContext.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.loop = false;
    this.analyser = this.musicContext.createAnalyser();
    this.gain = this.musicContext.createGain();
    this.source.connect(this.gain);
    this.gain.connect(this.analyser);
    return this.analyser.connect(this.masterGain);
  };

  Audio.prototype.play = function() {
    return FW.director.startShow();
  };

  Audio.prototype.update = function() {
    FW.freqByteData = new Uint8Array(FW.audio.masterAnalyser.frequencyBinCount);
    return FW.audio.masterAnalyser.getByteFrequencyData(FW.freqByteData);
  };

  return Audio;

})();

if (!Detector.webgl) {
  Detector.addGetWebGLMessage();
}

window.map = function(value, min1, max1, min2, max2) {
  return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
};

window.FW = {};

if (typeof SC !== "undefined" && SC !== null) {
  SC.initialize({
    client_id: "7da24ca214bf72b66ed2494117d05480"
  });
}

FW.globalTick = 0.16;

window.soundOff = false;

window.onload = function() {
  FW.audio = new FW.Audio();
  return FW.director = new FW.Director();
};

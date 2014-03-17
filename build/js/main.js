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
  var infoEl, infoShowing;
  FW.audio = new FW.Audio();
  FW.director = new FW.Director();
  infoEl = document.getElementsByClassName('infoWrapper')[0];
  infoShowing = false;
  return document.onclick = function(event) {
    var el;
    el = event.target;
    if (el.className === "icon") {
      infoEl.style.display = infoShowing ? 'none' : 'block';
      return infoShowing = !infoShowing;
    }
  };
};

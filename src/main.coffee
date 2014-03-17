#Multiplayer - have users stomp and dance an create ripples from point they hit
#energy soccer

#Balls collide mix colors!! WHAAAATTT
if !Detector.webgl
   Detector.addGetWebGLMessage()


window.map = (value, min1, max1, min2, max2) ->
  min2 + (max2 - min2) * ((value - min1) / (max1 - min1))

window.FW = {}
SC?.initialize({
    client_id: "7da24ca214bf72b66ed2494117d05480",
});

FW.globalTick = 0.16
window.soundOff = true

window.onload = ->
  FW.audio = new FW.Audio()
  FW.director = new FW.Director()
  infoEl = document.getElementsByClassName('infoWrapper')[0]
  infoShowing = false
  document.onclick = (event)-> 
    el = event.target;
    if (el.className is "icon") 
      infoEl.style.display = if infoShowing then 'none' else 'block'
      infoShowing = !infoShowing;







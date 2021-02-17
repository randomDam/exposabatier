function setup() {
  
  var canvasDiv = document.getElementById('expo');
  var div_width = canvasDiv.offsetWidth;
  var div_height = canvasDiv.offsetHeight;
  
  var canvas = createCanvas(div_width, div_height, WEBGL);
  
  canvas.parent('expo');
  
  createEasyCam();
  //document.oncontextmenu = ()=>false;
}

function draw() {
  background(0);
  lights();
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  box(100);
}
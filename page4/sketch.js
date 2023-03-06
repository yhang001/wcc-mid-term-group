
/* the visual portotype of the second page 
Because the prototype animation is different from what we what, so I uploaded a finished image instead.
The code is the basic visual effects we want.

Reference:  Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni, Generative Gestaltung – Creative Coding im Web, http://www.generative-gestaltung.de */

let x = 0;
let y = 0;
let stepSize = 5.0;

var fontSizeMin = 10;
var angleDistortion = 0.0;

var counter = 0;

let poems;
let currIdx = 0;

let myFont;
let myImage;

let alpha;

let link;

function preload() {
  poems = loadStrings('poems.txt');
   myFont = loadFont('HanChengWangShiLiXingShu-2.ttf');
   myImage = loadImage('background.jpg');
  prototypeVersion = loadImage('page4-05.jpg');
}

function setup() {
  //add canvas to the html
  //upload the image immediately
  // use full screen size
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container"); 

  myImage.resize(width,height);
  
  background(255);
  cursor(CROSS);

  x = mouseX;
  y = mouseY;

  textFont(myFont);
  textAlign(LEFT);
  textSize(32);
  
  tint(255,100);
  image(myImage,0,0);

  
  //link = createA("https://jwang006.github.io/poetry-to-mood/","back to home page ");
  //link.position(width*0.6,height*0.85);
  //link.textSize(32);
  
}

function draw() {
  
  //moving circle
  
  if (mouseIsPressed && mouseButton == LEFT) {
    var d = dist(x, y, mouseX, mouseY);//the distance 

    
    textSize(fontSizeMin + d /3 );//change the size according to teh distance
    var newLetter = poems[currIdx].charAt(counter);//return the character at counter position
   // console.log(newLetter)
    
    stepSize = textWidth(newLetter);

    if (d > stepSize) {
       if (counter < poems[currIdx].length){
         
      var angle = atan2(mouseY - y, mouseX - x);

      push();
      translate(x, y);
      rotate(angle + random(angleDistortion));
        
      if(currIdx == 2){
        fill(0);
      }else{
        fill(36,73,113,alpha);
      }

      text(newLetter, 0, 0);
      pop();

      counter++;
      console.log(counter)
       }
      
      //rotate the words
      x = x + cos(angle) * stepSize;
      y = y + sin(angle) * stepSize;
    }
  }
  prototypeVersion.resize(width,height);
  image(prototypeVersion,0,0);

textSize(32);
text('Save it', 1200, 620);
fill(	155, 68, 0);

textSize(50);
text('Your poetry postcard', 60, 150);
fill(	155, 68, 0);

}

function mousePressed() {
  x = mouseX;
  y = mouseY;
  currIdx++;
  counter=0;
  alpha=random(100,255);
}


function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(canvas, 'png');
  if (keyCode == DELETE || keyCode == BACKSPACE) background(255);
}

// //Main sketch below
// // an array to store the creatures
// let creatures = [];
// let food = [];

// function setup() {
 
//   // canvas = createCanvas(windowWidth,windowHeight);
//   // canvas.parent("sketch-container"); //move our canvas inside this HTML element
//   // background(255,150);
// }

// function draw() {
  

  
// }
// function windowResized() {

//   resizeCanvas(windowWidth, windowHeight);

// }

// // This sketch works on the same principle as my "Tiny Fluid Sim", but it uses shaders for speed.

let img,
		blurBuffer,
		threshBuffer,
		
		blurShader,
		threshShader,
		
		col = [0, 0, 0];

function preload(){
	blurShader = new p5.Shader(this._renderer, blurVert, blurFrag);
	threshShader = new p5.Shader(this._renderer, threshVert, threshFrag);
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	img = createGraphics(windowWidth, windowHeight);
	blurBuffer = createGraphics(windowWidth, windowHeight, WEBGL);
	threshBuffer = createGraphics(windowWidth, windowHeight, WEBGL);
		
	img.noStroke();
	img.clear();
	
}

function draw() {
	// Fixes WEBGL centering
	blurBuffer.translate(-width/2, -height/2);
	threshBuffer.translate(-width/2, -height/2);

	// Draw the color palette
	img.push(); // for colorMode
	img.colorMode(HSB);
	for(let i = 0; i < 7; i ++){
		img.fill(i === 0 ? 0 : [i * 60, 100, 80]);
		img.ellipse(width - 100, height / 14 + height / 7 * i, 20, 20);
	}
	img.pop();
	
	// Draw the brush
	img.fill(...col);
	if(mouseIsPressed){
		const current = new p5.Vector(mouseX, mouseY),
					past = new p5.Vector(pmouseX, pmouseY),
					d = current.dist(past);
		
		for(let i = 0; i < d; i += Math.random() * 20){
			img.ellipse(past.x + i * (current.x - past.x) / d, past.y + i * (current.y - past.y) / d, 20, 20);
		}
	}
	
	// First, apply a blur
	blurBuffer.shader(blurShader);
	blurShader.setUniform('tex0', img._renderer);
	blurShader.setUniform('texelSize', [1 / width, 1 / height]);
	
	blurBuffer.rect(0, 0, width, height);
		
	// Next, apply a small threshold
	threshBuffer.shader(threshShader);
	threshShader.setUniform('tex0', blurBuffer._renderer);
	threshShader.setUniform('threshold', 0.05);
	
	threshBuffer.rect(0, 0, width, height);
	
	// Finally, copy the threshold buffer back into the main buffer (to repeat next frame)
	img.clear();
	img.image(threshBuffer, 0, 0);
	
	// And draw the blurry version to the screen
	clear();
	image(blurBuffer, 0, 0);
}

function keyPressed(){
	if(key === ' '){
		col = img.get(mouseX, mouseY);
	}
}
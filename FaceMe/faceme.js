//Abra White
//Week 5 Homework


//Using your own custom function, draw a character (animal, person, etc.). 
//Your character function must use function arguments, allowing you to pass in:
//positionX, positionY, characterWidth, characterHeight, and characterColor properties.


//generates a black screen that will generate faces of random color and size at point where mouse is clicked

//for those interested: the faces were drawn with a vector graphics program and saved as an SVG
//I then translated the SVG code to P5.js code

function setup() {
	createCanvas(1200,400);
	background('black');
	alert("Click Mouse to Draw");
}

//original height and width of original drawing
//(use to get proportions correct)
let oWidth = 169.139;
let oHeight = 229.476;
//percentage to change size by
let p;

function draw() {	
	//nothing here because all drawing is in mouseClicked()
}

function mouseClicked(){
	//generate random percentage for size
	//this is used to preserve aspect ratios
	p = random(.3,1);

	//create character on mouse click
	//color is randomly generated 
	character(mouseX,mouseY,p*oWidth,p*oHeight,random(0,360));
	return false;
}

//position X, positionY is where the center of the face should be
//characterWidth, characterHeight are the height and width proportions for the face
//characterColor should be a value between 0-360 to represent a hue value
function character(positionX, positionY, characterWidth, characterHeight, characterColor){
	//scale is used to change size for modularity
	scale(p,p);
	//translate so that it corresponds better with the mouse click location
	positionX= (positionX/p)-(characterWidth)/2;
	positionY= (positionY/p)-(characterHeight)/2;

	//use the color parameter to create a color pallette
	colorMode(HSB);
	let h = characterColor;
	let s = 75;

	//original character was greyscale with these brightness values
	//by changing the hue value we get the same result in different colors
	let dark = color(h,s,10);
	let mediumDark = color(h,s,20);
	let medium = color(h,s,40);
	let mediumLight = color(h,s,60);
	let light = color(h,s,90);


	//draw character with features based off of original positions
	face(mediumLight, positionX+12.68, positionY+50.05);
	eye(mediumDark,positionX+93.64,positionY+105.08);
	bottomLip(mediumDark,positionX+41.62,positionY+176.32);
	topLip(dark,positionX+41.63,positionY+176.32);
	cheek(medium,light,positionX+124.34,positionY+197.68,positionX+160.34,positionY+145.01);
	nose(medium,light,positionX+80.23,positionY+147.55,positionX+62.82,positionY+140.59);
	eyebrows(mediumDark,positionX+86.63,positionY+86.5,positionX+11.18,positionY+88.82);

}

//creates base of the face
//h: color of face
//x,y: starting coordinates
function face(h, x, y){
	//set new variables for x,y which will change as face is drawn
	let currentX = x;
	let currentY = y;

	//fill with color parameter
	fill(h);

	//draw face
	noStroke();
	beginShape();
		vertex(currentX,currentY);
		bezierVertex(currentX-22.25,currentY+41.05, currentX-9.62,currentY+83.6, currentX=currentX-4,currentY=currentY+102.54);
		bezierVertex(currentX+7.01,currentY+23.63, currentX+20.38,currentY+68.67, currentX=currentX+51.94,currentY=currentY+75.91);
		bezierVertex(currentX+38.86,currentY+8.91, currentX+80.12,currentY-45.28, currentX=currentX+95.88,currentY=currentY-80.57);
		bezierVertex(currentX+4.63,currentY-10.37, currentX+18.35,currentY-42.27, currentX=currentX+9.99,currentY=currentY-80.57);
		bezierVertex(currentX-2.4,currentY-10.99, currentX-6.06,currentY-27.74, currentX=currentX-19.98,currentY=currentY-42.61);
		bezierVertex(currentX-19.59,currentY-20.94, currentX-51.59,currentY-29.72, currentX=currentX-79.9,currentY=currentY-21.97);
		bezierVertex(currentX-33.23,currentY+8.83, currentX-48.62,currentY+37.47, x,y);
	endShape();	
}

//creates bottom lip
//h: color of bottom lip
//x,y: starting coordinates
function bottomLip(h,x,y){
	//set new variables for x,y which will change as lip is drawn
	let currentX = x;
	let currentY = y;

	//fill with color parameter
	fill(h);

	//draw bottom lip
	noStroke();
	beginShape();
		vertex(currentX,currentY);
		bezierVertex(currentX,currentY, currentX+3.04,currentY+16.26, currentX=currentX+22.8,currentY=currentY+16.81);
		bezierVertex(currentX+19.75,currentY+0.55, currentX+28.28,-13.88+currentY, currentX=currentX+28.28,currentY=-13.88+currentY);
	endShape();

}

//creates top lip
//h: color of top lip
//x,y: starting coordinates
function topLip(h,x,y){
	//set new variables for x,y which will change as lip is drawn
	let currentX = x;
	let currentY = y;

	//fill with color parameter
	fill(h);

	//draw top lip
	noStroke();
	beginShape();
		vertex(currentX,currentY);
		bezierVertex(currentX,currentY, currentX+6.7,currentY-13.82, currentX=currentX+15.07,currentY=currentY-10.47);
		bezierVertex(currentX+8.37,currentY+3.35, currentX+10.89,currentY+7.54, currentX=currentX+10.89, currentY=currentY+7.54);
		bezierVertex(currentX,currentY, currentX+8.79,currentY-11.51, currentX=currentX+14.23,currentY=currentY-8.06);
		bezierVertex(currentX+5.44,currentY+3.45, currentX+10.89, currentY+13.92, currentX+10.89, currentY+13.92);
	endShape();

}

//creates eye
//h: color of eye
//x,y: starting coordinates
function eye(h,x,y){
	//eye is only a stroke, not filled
	stroke(h);
	strokeWeight(1);
	noFill();

	//set new variables for x,y which will change as eye is drawn
	let currentX=x;
	let currentY=y;


	//draw eye
	beginShape();
		vertex(currentX,currentY);
		bezierVertex(currentX,-.031+currentY, 18.74+currentX,14.25+currentY, 37.48+currentX,-.56+currentY);
	endShape();

}

//creates cheek and earring
//c1: color of cheek shadow
//x,y: starting coordinates of cheek
//c2: color of earring
//x2,y2: center of earring
function cheek(c1,c2,x,y,x2,y2){
	//set new variables for x,y which will change as cheek is drawn
	let currentX = x;
	let currentY = y;

	//fill with color parameter
	fill(c1);

	//draw cheek shadow
	noStroke();
	beginShape();
		vertex(currentX,currentY);
		bezierVertex(currentX,currentY, currentX-24.82,currentY-32.09, currentX=currentX-18.97,currentY=currentY-50.39);
		bezierVertex(currentX,currentY, currentX+23.29,currentY-25.47, currentX=currentX+35.18,currentY=currentY-33.02);
		bezierVertex(currentX,currentY, currentX+28.6,currentY-30.76, currentX=currentX+28.6, currentY=currentY-30.76);
		bezierVertex(currentX,currentY, currentX+0.3,currentY+34.78, currentX=currentX-8.3,currentY=currentY+54.2);
		bezierVertex(currentX,currentY, currentX-21.31,currentY+42.99, x,y)
	endShape();

	//change color to c2 color parameter
	fill(c2);
	//draw earring (radius can be hard coded, as it will be scaled later on)
	circle(x2,y2,3.5*2)
}

//creates nose
//c1: color of nose shadow
//x,y: starting coordinates of nose shadow
//c2: color of nose highlight
//x2,y2: center of nose highlight
function nose(c1,c2,x,y,x2,y2){
	//set new variables for x,y which will change as nose is drawn
	let currentX = x;
	let currentY = y;

	//fill with color parameter
	fill(c1);

	noStroke();
	beginShape();
		vertex(currentX,currentY);
		bezierVertex(currentX-.55,currentY+.79, currentX-1.79,currentY+.76, currentX=currentX-2.63,currentY=currentY+.26);
		bezierVertex(currentX-.83,currentY-.5, currentX-1.41,currentY-1.32, currentX=currentX-2.12,currentY=currentY-1.97);
		bezierVertex(currentX-1.63,currentY-1.5, currentX-4.04,currentY+.49, currentX=currentX-6.18,currentY=currentY-1.51);
		bezierVertex(currentX-.7,currentY+.19, currentX-1.46,currentY+.49, currentX=currentX-2.12,currentY=currentY+.19);
		bezierVertex(currentX-1.33,currentY-.61, currentX-.71,currentY-2.59, currentX=currentX-.03,currentY=currentY-3.89);
		bezierVertex(currentX+4.44,currentY-8.54, currentX+2.19,currentY-19.32, currentX=currentX+6.36,currentY=currentY-27.99);
		bezierVertex(currentX+3.21,currentY+6.1, currentX+4.03,currentY+13.15, currentX=currentX+4.45,currentY=currentY+20.03);
		bezierVertex(currentX+.08,currentY+1.28, currentX+.15,currentY+2.58, currentX=currentX+.6,currentY=currentY+3.77);
		bezierVertex(currentX+.69,currentY+1.81, currentX+2.19,currentY+3.18, currentX=currentX+3.16,currentY=currentY+4.86);
		bezierVertex(currentX+.97,currentY+1.68, currentX+1.23,currentY+4.12, currentX=currentX-.3,currentY=currentY+5.31);
	endShape();

	//change to c2 color parameter
	fill(c2);
	//draw nose highlight (radius can be hard coded, as it will be scaled later on)
	circle(x2,y2,4.42*2);
}

//creates nose
//h: color of eyebrows
//x1,y1: starting coordinates of right eyebrow
//x2,y2: starting coordinates of left eyebrow
function eyebrows(h,x1,y1,x2,y2){
	//fill with color parameter
	fill(h);

	//x and y don't change for these shapes, so parameters are used

	//eyebrow right
	beginShape();
		vertex(x1,y1);
		vertex(x1+34.33,y1-7.69);
		vertex(x1+55.41,y1+4);
		vertex(x1+30.53,y1-2.43);
		vertex(x1,y1+6.08);
	endShape();

	//eyebrow left
	beginShape();
		vertex(x2,y2);
		vertex(x2+14.1,y2-6.91);
		vertex(x2+46.16,y2-3.13);
		vertex(x2+46.16,y2+2.49);
		vertex(x2+15.2,y2-3.13);
	endShape();
}
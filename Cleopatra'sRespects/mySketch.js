/*
Abra White
(C)2021
Paying Resepects to Cleopatra

Cleopatra's suicide has been depicted many times throughout history in art, literature, theater, and film.
However many of the depictions were constructed by men and were highly eroticized and sexualized. 
The purpose of this interactive collage is to bring respect back to her death.

The portraits of Cleopatra are depictions by female artists, depicting events surrounding her death.
Cleopatra Decorating the Tomb of Mark Antony by Angelica Kauffman (1741-1807)
Antony and Cleopatra by Anne Seymour Damer (1788)
Cleopatra by Artemesia Gentileschi (1633-1635)
The Death of Cleopatra by Edmonia Lewis (1876)
Morte di Cleopatra by Elisabetta Sirani (mid 1600s)
Cleopatra the Alchemist by Lavinia Fontana (1605)
Cleopatra by Margaret Foley (1876)

Interaction:
Each time the mouse is clicked a new collage centered around one of these portraits is generated.
Moving mouse acress the screen changes tree color.

Artistic Choices:
A flower is selected and placed over her heart.
Playing on the idea of collage, an animated Barnsley fern is generated, using a collage theorem IFS.
As Cleopatra was sometimes depicted as Isis (the Egyptian moon goddess) in Egyptian art, a moon is place behind her.
The original artist's name is prominently displayed.
The palm tree changes from a dead yellow color to a lush green depending on the mouse position.
The colors of the shapes are selected from a palette based on the original artwork.

Images used were all public domain, or free to use through a creative commons license
*/

//arrays for images
let portraits = [];
let flowers = [];
let moons = [];
//variables to hold instances for current collage
let currentColors = [];
let currentImage, currentFlower, currentEllipse, currentRect, currentMoon, currentTriangle, currentTriangleSize;
let tree;
let fern1;
let fern2;



function preload() {
	//load data for portraits from json
	let json = loadJSON('portraits.json',
		loadPortraits,
		function() {
			print("err")
		});

	//load flower images
	for (let i = 1; i < 7; i++) {
		flowers.push(loadImage("assets/flower" + i + ".png"));
	}
	//load moon images
	for (let i = 1; i < 6; i++) {
		moons.push(loadImage("assets/moon" + i + ".png"));
	}
	//load tree
	tree = loadImage('assets/palm_tree_drawing.png');
}



function setup() {
	createCanvas(windowWidth, windowHeight);
	smooth();

	//setup placement for portraits
	for (var i = 0; i < portraits.length; i++) {
		portraits[i].setOrigin(width, height);
	}

	//always the same tree, only needs to be resized once
	tree.resize(0, height * 0.75);


	//generate all assets to be used in current collage
	assets();
}


function draw() {
	background('#F2E4C9');
	writeName();

	//moon
	imageMode(CENTER);
	image(currentMoon, width / 2, height / 2);
	imageMode(CORNER);

	//geometric shapes
	genTriangles(currentTriangle, currentTriangleSize);
	stroke('black');
	strokeWeight(3);
	noFill();
	ellipse(currentEllipse.x, currentEllipse.y, map(currentEllipse.y % height, 0, height, 60, height));
	rectMode(CENTER);
	rect(currentRect.x, currentRect.y, currentRect.y, currentRect.x);

	//tree
	tint(color(map(mouseX, 0, width, 155, 255), 255, 0));
	image(tree, currentPortrait.origin.x - tree.width / 2, currentPortrait.rightCorner.y - tree.height);


	//painting
	tint('255');
	image(currentPortrait.image, currentPortrait.origin.x, currentPortrait.origin.y);

	//flower over heart
	push();
		imageMode(CENTER);
		translate(currentPortrait.origin.x, currentPortrait.origin.y);
		fern1.drawFern();
		push();
			translate(currentPortrait.heart.x, currentPortrait.heart.y);
			rotate(PI);
			fern2.drawFern();
		pop();
		//size is relative to the scale of the larger edge of the painting
		let s = (currentPortrait.landscape == "true") ? currentPortrait.image.width / 8 : currentPortrait.image.height / 5;
		image(currentFlower, currentPortrait.heart.x, currentPortrait.heart.y, s, s);
	pop();
}



//makes array of portrait objects from json data
function loadPortraits(data) {
	for (let port of data.portraits) {
		let path = port.name;
		let posx = port.posx;
		let posy = port.posy;
		let landscape = port.landscape;
		portraits.push(new Portrait(path, posx, posy, landscape));
	}
}


//generates random positions for a shape to use before draw
function genShape(minx, maxx, miny, maxy) {
	return createVector(random(minx, maxx), random(miny, maxy));
}


//generate all assets to be used in current collage
function assets() {
	background('#F2E4C9');

	//select images
	currentPortrait = random(portraits);
	currentFlower = random(flowers);
	currentMoon = random(moons);
	
	//setup placement for geometry
	currentEllipse = genShape(width / 2, width * 0.75, 0, height / 2);
	currentRect = genShape(width / 4, width / 2, height / 2, height);
	currentTriangle = genShape(width / 8, width / 4, 0, height / 4);
	currentTriangleSize = random(150, 300);
	
	//gen color scheme
	currentColors = currentPortrait.colorScheme();
	
	//instantiate ferns
	fern1 = new Fern(currentPortrait.heart.x, currentPortrait.heart.y);
	fern2 = new Fern(0, 0);
	
	//resize moon
	currentMoon.resize(0, height * 0.9);

}


//generate new collage on mouse click
function mouseClicked() {
	//clear and generate assets again
	clear();
	assets();
}


//writes the name of the artist
function writeName() {

	//style
	fill('Salmon');
	noStroke();
	textAlign(CENTER);
	textSize(height / 12);
	textFont('Helvetica');
	textLeading(textSize());
	textStyle(BOLD);

	//write text
	let splitName = currentPortrait.name.split(" ");
	for (let l = 0; l < splitName.length; l++) {
		splitName[l] = splitName[l].split("").join("\n");
		text(splitName[l],
			width * 0.9 - (textSize() * 1.5 * (splitName.length - l)),
			textSize());
	}
}

//equilateral triangle
function equalTriangle(x, y, size) {
	return triangle(x, y, x + size, y, x + size / 2, y + (size * sqrt(3) / 2));
}


//generate a number of triangles based on the number of colors available
//point is starting coordinate, size is the size of the largest triangle
function genTriangles(point, size) {
	let num = currentColors.length;
	for (let i = 0; i < num; i++) {
		let col = currentColors[i];
		fill(color(col));
		equalTriangle(point.x - (num / 2 * i), point.y, size / (i + 1));
	}

}

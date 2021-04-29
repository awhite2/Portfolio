/*Abra White
April 2021
Use playlist on side to play some songs
click to change animation*/

let dadSprite; //dad character
let animIt = 0; //animation iterator
let titleColors = []; //colors for title
let labels = []; //keep track of animation labels
let fr = 9;


function preload(){
	//load animations and add to the sprites
	dadSprite = createSprite(0, 0, 400, 400);
	dadSprite.addAnimation("hips", loadAnimation("assets/Hips001.png","Hips004.png"));
	labels.push("hips");
	dadSprite.addAnimation("toes", loadAnimation("assets/Toes001.png","Toes004.png"));
	labels.push("toes");
	dadSprite.addAnimation("step", loadAnimation("assets/Step001.png","Step004.png"));
	labels.push("step");
	dadSprite.addAnimation("disco", loadAnimation("assets/Untitled_Artwork-1.png","Untitled_Artwork-2.png"));
	labels.push("disco");
	dadSprite.changeAnimation("hips");
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	frameRate(fr);
	
	titleColors = [
		"#FF5026",
		"#E300E8",
		"#6E68FF",
		"#0ECBE8",
		"#10FF39"
		];
	
	//add music embed, not using p5.sound in order to not worry about licesning
	let music = createElement('span','<iframe src="https://open.spotify.com/embed/playlist/4tQaRDQFjicN5yihiECbk2" width="250" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>');
	music.position(30, 250);
	music.style("display" , "inline");
}

function draw() {
	background(0);
	
	//title
	textSize(160);
	fill(color(random(titleColors)));
	textAlign(CENTER);
	text("DAD MOVES", width/2, 170);
	
	//place sprite
	push();
		scale(0.25);
		translate(windowWidth*2, windowHeight*2.5);
		drawSprites();
	pop();
	
}

//change animation
function mouseClicked(){
		animIt++;
		dadSprite.changeAnimation(labels[animIt%4])
}

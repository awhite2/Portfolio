function setup() {
	createCanvas(600, 600);
	
}


function draw() {
	background('white');
	
	//stationary hexagon
	concentric(60,height*.80,width/2,height/2);
	
	//animated hexagon
	translate(p5.Vector.fromAngle(millis() / 1000, 30));
	concentric(60,height*.80,width/2,height/2);
}

function hexagon(h,x,y){
	let a = h/4;
	let b = Math.sqrt(3)*a;
	
	beginShape();
		vertex(x,y+(-2*a));
		vertex(x+b,y-a);
		vertex(x+b,y+a);
		vertex(x,y+(2*a));
		vertex(x-b,y+a);
		vertex(x-b,y-a);
		vertex(x,y+(-2*a));
	endShape();
}

function concentric(num, h, x, y){
	var currentH;
	for(i=1; i<=num; i++){
		noFill();
		print(i);
	  currentH = i*(h/num);
		hexagon(currentH, x, y);
		
	}
	
}
//Create a sketch that moves multiple shapes along Lissajous curves. 
//In addition to animating the shapes’ x and y positions, 
//use the sin() and cos() functions to animate their fill and/or stroke colors.

var waveLengthOne;
var waveLengthTwo;
var waveLengthThree;
var pointCount = 0;
var angle = 0.0;
var amplitude;
var bkgdColor = 255;


function setup(){
    createCanvas(400,400);

    //set random values for the wavelengths
    waveLengthOne = random(50,150);
    waveLengthTwo = random(50,150);
    waveLengthThree = random(50,150);

    //amplitude is relative to width - 10 to give a margin
    amplitude = width/2-10;
    frameRate(24);
    }

function draw(){

    //don't let anumation continue forever
    if(pointCount > 10000){
        noLoop();
    }

    //move to center of the canvas
    noFill();
    noStroke();
    translate(width/2, height/2);

    drawOnCurve(waveLengthOne, waveLengthTwo, waveLengthThree);
    pointCount++;
}



//on mouse click change the wavelengths and start new animation
function mouseClicked(){
    waveLengthOne = random(50,150);
    waveLengthTwo = random(50,150);
    waveLengthThree = random(50,150);
    background(bkgdColor);
}


//create two animated circles from three wavelength variables
function drawOnCurve(wlOne, wlTwo, wlThree){


    beginShape();
    for(var i=0; i < pointCount; i++){
        //to see the curves, comment out this line
        background(bkgdColor); //reset so it looks like circle is moving

        angle = (i / wlOne) * TWO_PI;
        var y = cos(angle)* amplitude;
        
       
        angle = (i / wlTwo) * TWO_PI;
        var x = sin(angle)* amplitude;

        //circle one
        fill(lerpColor(color('Coral'),color('DarkGoldenRod'),sin(angle))); //change color on gradient
        var rad = Math.abs((cos(angle))*15); //change circle size
        circle(x,y,rad); //draw circle

        //circle two
        angle = (i / wlThree) * TWO_PI;
        var y = cos(angle)*amplitude;
        fill(lerpColor(color('Maroon'),color('Tomato'),sin(angle))); //change color on gradient
        circle(x,y,rad); //draw circle
    }
    endShape();

}
/*
Week 6 Homework, Abra White

Using the transformation functions (translate(x,y), rotate(angle), and/or scale(x,y)) 
create a sketch with animated, spiralling shapes. Your sketch must incorporate a color 
palette of interpolated colors using lerpColor(). To successfully complete this assignment, 
you must use at least two of the three transformation functions.
*/

function setup(){
  createCanvas(400, 400);
  frameRate(15);
  background(1);
  colorMode(RGB);
  color1 = color(255,0,0);
  color2 = color (255,255,0);
}

//speed determines how far apart the shapes will be
var speed = 7;

//going out is 1, going in is -1
let direction = 1;

//posx, and posy of the shape
let posx = 0;
let posy = 0;

//size of the shapes
let size = 35;

let color1;
let color2;


function draw() {
    //initialize the color for interpolating
    noFill();


    //move origin to center of canvas
    translate(width/2,height/2);
    rectMode(CENTER);

    //change the x position by the amount in the current direction
    posx = posx + speed * direction;


    //when the shapes get to the edge of the screen, change direction
    //when the shapes get back to the middle, clear and change direction
    if (posx > width/2){
        direction *= -1;
    } else if (posx < 0){
        direction *= -1;
        background(1);
    }

    //set the current color relative to what position we are currently in
    let color3 = lerpColor(color1, color2, posx/(width/2));
    stroke(color3);

    //rotate to create the spiraling curve effect
    rotate(radians(posx));


        for(var i =0; i < 6; i++){
            push();

            //divide the canvas into 6 sections and draw in each of those sections
            rotate(TWO_PI * i / 6);

            //shapes should increase in size
            scale (posx/100);

            //when going in, draw ellipses
            //when going out, draw rectangles
            if(direction == -1){
                ellipse(posx, posy, size, size+15);
            }else{
                rect(posx, posy, size, size);
            }
            pop();
        }
    
}

//on mouse click, change the colors to interpolate between
function mouseClicked(){


    color1 = color(random(0, 255), random(0, 128), random(0, 25));
    color2 = color(random(0, 25), random(0, 128), random(0, 255));

    print(color1.toString());
    print(color2.toString());
    
    return false;
}
/*
Abra White
March 2021


Create a Particle System using custom Javascript Objects (ES6 class notation). 
Your Particle object must contain the following properties: position, size, color, speed.

based on the De Jong iterative system

*/



//pos is the starting point of the drawing
//color is the starting color
//params is an array of 4 numbers between -2 and 2

class Dot{
    constructor(pos, color, params){
        this.pos = createVector(pos.x, pos.y);
        this.pos2 = createVector(pos.x, pos.y); //if newPos isn't called, pos by default
        this.color = color;
        this.params = params; //parameters for sinusoidal equation for new vector

        this.color.setAlpha(0.5);
    }//end constructor

    //calculates a new vector based on the one passed in
    newPos(){   
         //equation based on De Jong curves
        let x = ((sin(this.params[0]*this.pos.y)) - (cos(this.params[1]*this.pos.x)));
        let y = ((sin(this.params[2]*this.pos.x)) - (cos(this.params[3]*this.pos.y)));
        
        this.pos2.set(x, y);

        this.pos2.set(this.pos2.x*100, this.pos2.y*100);
    }//end newPos

}//end class definition



//handles a system of dots inluding single and multiple curves
class DotSystem{
    constructor(pos, size, color, speed, params){
        this.pos = createVector(pos.x, pos.y);
        this.size = size; //number of dots per curve
        this.color = color; //base of the color scheme
        this.speed = speed; //how much we are interpolating each time
        this.params = params; //input paramaters for the sinusoidal equations to be use by Dot
        this.dotSys = []; //array of separate curves based on params (the particle system)
        this.num = this.params.length/4; //calculates the number of curves based on the sets of 4 equation parameters
    }
    
    //generate a single curve
    generateCurve(c, params = []){
        let dotSeq = [];
        let p = createVector(this.pos.x, this.pos.y);
        for (var i=0; i<this.size; i++){
            dotSeq.push(new Dot(p, c, params));
            dotSeq[i].newPos();
            p.set(dotSeq[i].pos2.x/100, dotSeq[i].pos2.y/100);
        }
        return dotSeq;
    }

    //generate a multidimensional array of Dots based on the paramets inputs
    //should change to a second variable to splice probably
    generateMultiArray(){
        let num = this.num;
        let c = this.triadicColor(this.color);

        for(var i=0; i<num; i++){
            this.dotSys.push(this.generateCurve(c[i%3], this.params.splice(0,4)));
        }
    }

    //draw a curve based on an array of Dots
    drawCurve(num, myArray = this.dotSys[num]){
        for(var i=0; i<myArray.length; i++){
            strokeWeight(1);
            stroke(color(myArray[i].color));
            point(myArray[i].pos2.x, myArray[i].pos2.y);
        }
    }

    //create a new curve based on two other curves 
    animate(lerpPos, n){
        let currentArray = [];
        let firstCurve = this.dotSys[n];
        let secondCurve = this.dotSys[n+1];
        let prams = [];

        let c;

        for(var p = 0; p < firstCurve[0].params.length; p++){
            //calculate new equation parameters based on place in animation
            prams.push(lerp(firstCurve[0].params[p], secondCurve[0].params[p], lerpPos))
            //calculate color based on place in animation
            c = lerpColor(firstCurve[0].color, secondCurve[0].color, lerpPos);
        }
        currentArray = this.generateCurve(c, prams);
        this.drawCurve(null, currentArray);
        lerpPos+=this.speed;
        return lerpPos;
    }

    //generate color scheme
    triadicColor(col = this.color){
        colorMode(HSB);
        let c = hue(col);
        let s = saturation(col);
        let b = brightness(col);

        let c2 = (c - 120) < 0 ? c + 240 : c - 120;
        let c3 = (c + 120) > 360 ? 480 - c : c + 120;

        return [color(c,s,b), color(c2,s,b), color(c3,s,b)];
    }
}// end class def







//variables to put into object later
let p; //position
let s; //size
let c; //color
let v; //speed
let prams = []; //parameters
let particleSystem; //particle system
let lerpPos=0;
let n = 0; //keeps track of current curve numbers

function setup(){
    createCanvas(1000,1000);
    background(255);
    colorMode(HSB);


    p = createVector(1,1); //starting position
    s = 50000; //size or number of particles in the system
    c = color('orange');
    v = .008; //relates to the difference between start and end points
    

    //code if you want random parameters, but most don't look good
    // for (i=0; i<4; i++){
    //     prams.push(random(-2, 2));
    //     print(prams[i]);
    // }

    prams = [
        1.9656548229073136,
        1.5182617727132568,
        0.6008418697330651,
        1.8002179645256131,   

        0.8804864880020826,
        1.5483376402787492,
        1.5456179262064271,
        -1.9428844408004853,

        1.1656622811003698,
        1.2209656649851883,
        1.603113595680595,
        -1.3469920131041553
    ]
    frameRate(40);
     particleSystem = new DotSystem(p, s, c, v, prams);
     particleSystem.generateMultiArray();

}

function draw(){
    translate(width/2, height/2);


    //animate between curves for as many curves as there are
    if(lerpPos<1){
        background(255);
        lerpPos = particleSystem.animate(lerpPos, n);
    }else{
        if(n < particleSystem.num-2){
            lerpPos = 0;
            n++;
            lerpPos = particleSystem.animate(lerpPos, n);
        }else{
        noLoop();
        }
    }
}
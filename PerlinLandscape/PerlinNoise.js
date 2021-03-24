/*
    Abra White
    March 2021
    Homework 9 
    DOM

    Generates a mountain terrain landscape animation
    sliders affect:
    mountainHeight (size)
    timeOfDay (color)
    drivingSpeed (animationSpeed)

    "Pause" changes isAnimated and stops and starts the animation
*/

var speed = 0.01;

let colors = [];

//Ranges
let mountains1;
let mountains2;

//DOM Elements
let mountainHeight;
let timeOfDay;
let drivingSpeed;
let btn;

let isAnimated = 1;
let weird = false;

function setup(){
    createCanvas(windowWidth, windowHeight);

    //setup color pallette
    colors = [
        color(115, 77, 91), //0: purple
        color(194, 82, 48), //1: terracotta
        color(134, 201, 165), //2: blue
        color(39, 25, 42), //3: dark purple
        color(140, 61, 43), //4: dark terracotta
        color(28, 42, 45), //5: dark blue
        color(249,237,50), //6: yellow
        color(195,178,175),  //7: grey  
        color(155, 77, 91, 0)
    ]
    let box = width/20;

    let heightText = createElement('span', 'height');
    heightText.position(box+width/10,box);

    mountainHeight = createSlider(-height/2, height/2, 0, 10);
    mountainHeight.position(box, box);
    mountainHeight.style('width', width/10);

    let timeText = createElement('span','time');
    timeText.position(box+width/10,box+20);
    
    timeOfDay = createSlider(0, 1, 0, .1);
    timeOfDay.position(box, box+20);
    timeOfDay.style('width', width/10);

    let speedText = createElement('span','speed');
    speedText.position(box+width/10,box+40);

    drivingSpeed = createSlider(0.004, 0.05, 0.01, 0.001);
    drivingSpeed.position(box, box+40);
    drivingSpeed.style('width', width/10);

    //style the text
    let text = selectAll('span');
    for(var i = 0; i<text.length; i++){
        text[i].style('padding-left','1%');
        text[i].style('font-family', 'sans-serif');

        text[i].style('wrap','left');
    }

    //START AND STOP ANIMATION
    btn = createButton('PAUSE');
    btn.position(box, box+60);
    btn.style('width', width/10);

    btn.mousePressed(animate)

    secretBtn = createButton('MAKE THINGS WEIRD');
    secretBtn.position(width-box*3, height-box*2);
    
    secretBtn.mousePressed(
        function(){
            if(weird){     
                blendMode(BLEND);
                colors[8].setAlpha(1);
                weird = false;
            }else{
                blendMode(OVERLAY);
                colors[8].setAlpha(1);
                weird = true;
        }
    }
    );

    //back range of mountains
    //divide speed for a parallax effect
    mountains1 = new Range(0, .01, speed/3, 0);

    //front range of mountains
    mountains2 = new Range(10000, 0.008, speed, height/2);
}


function draw(){
    background(setColor(colors[2],colors[5]));
    noStroke();

    fill(colors[8]);
    rect(0,0,width,height);

    fill(setColor(colors[6],colors[7]));
    ellipse(width*.75, height/10, width/10, width/10);
    
    fill(setColor(colors[1],colors[4]));
    mountains1.drawRange();

    fill(setColor(colors[0],colors[3]));
    mountains2.drawRange();

    let val = drivingSpeed.value();

    mountains1.setSpeed(val/3);
    mountains2.setSpeed(val);

    mountains1.setHeight(mountainHeight.value());
    mountains2.setHeight(mountainHeight.value());

    
}

/** 
 * class to generate a mountain range based on perlin noise
 */
class Range{
    /** 
     * @param {number} [start] startng x val on perlin noise curve
     * @param {number} [inc] how much to increment x val of curve, or mountain frequency & slope, best between .0001 and .01
     * @param {number} [speed] how quickly the range moves across the screen
     * @param {number} [h] y position of the tallest peak
     */
    constructor(start, inc, speed, h){
        this.start = start;
        this.inc = inc; 
        this.height = h; 
        this.originalHeight = h;
        this.speed = speed;
    }
    /** 
     * draws a mountain range based on Range properties
     * based on perlin noise numbers
     * increases start by speed
     */
    drawRange(){
        var xoff = this.start; 
        beginShape();
        vertex(0,height);
        for (var a = 0;a<width; a++){
            var b = map(noise(xoff), 0, 1, this.height, height);
            vertex(a, b);
    
            xoff += this.inc;
        }
        vertex(width, height);
        endShape();
        this.start += this.speed;
    } 
    /** 
     * setter for height (size)
     * @param {number} [h] first color
     */    
    setHeight(h){
        this.height = this.originalHeight-h;
    }
    /** 
     * setter for speed
     * @param {number} [s] new speed between 0 and 1
     */
    setSpeed(s){
        this.speed = s;
    }

}//end class

/** 
 * stops and starts the animation
 */
function animate(){
    isAnimated = isAnimated*-1;
    if(isAnimated==-1){
        noLoop();
    }else{
        loop();
    }
}

/** 
 * calculates a color based on the positon of the "time of day" slider
 * @param {p5.Color} [a] first color
 * @param {p5.Color} [b] second color
 * @return {p5.Color} the requested color
 */
function setColor(a, b){
    return lerpColor(a,b,timeOfDay.value());
}
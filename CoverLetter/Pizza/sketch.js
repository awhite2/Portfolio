//global variables
let pizza; //crust object
let cheese; //cheese slider
let cheescol; //cheese color
let cheeseMax = 255;
let pepperoni; //pepperoni slider
let pepperoniCol; //color of pepperoni
let pepperoniMax = 30;
let cheeseCirc; //cheese object
let spices; //garlic slider
let spicesCol = []; //color of spices
let spicesMax = 50;

function setup() {
  colorMode(RGB, 255);
  createCanvas(windowWidth, windowHeight);
  pizza = new Pizza(6, width / 2.5, createVector(0, 0));

  //load up this pizza with toppings
  let title = createElement('span', 'Load up this pizza with toppings!');
  title.position(20, 20);
  title.style('color', 'white');
  title.style('text-shadow', '2px 1px black');
  
  
  //setup cheese and slider
  let cheeseText = createElement('span', 'Great Foundation');
  cheeseText.position(20, 45);
  cheeseText.style('color', 'white');

  cheeseCirc = new Pizza(6, width / 2.5 - 20, createVector(0, 0));
  cheeseCol = color('darkOrange');
  cheeseCol.setAlpha(0);
  cheese = createSlider(0, cheeseMax, 0, 5);
  cheese.position(20, 65);
  cheese.style('width', '15%');


  //setup pepperoni and slider
  let pepText = createElement('span', 'Creative Flavor');
  pepText.position(20, 85);
  pepText.style('color', 'white');
  
  pepperoniCol = color('DarkRed');
  pepperoni = createSlider(0, pepperoniMax, 0, 1);
  pepperoni.position(20, 105);
  cheeseCirc.createPepperoni(pepperoniMax);
  pepperoni.style('width', '15%');
  
  
   //setup spices and slider
  let garText = createElement('span', 'Strong Ideas');
  garText.position(20, 125);
  garText.style('color', 'white');
  
  spicesCol = ['DarkGreen','LightGoldenRodYellow','Black'];
  spices = createSlider(0, spicesMax, 0, 1);
  spices.position(20, 145);
  cheeseCirc.createGarlic(spicesMax, spicesCol);
  spices.style('width', '15%');

//format text
  let text = selectAll('span');
  for (var i = 0; i < text.length; i++) {
    text[i].style('padding-left', '1%');
    text[i].style('font-family', 'sans-serif');

    text[i].style('wrap', 'left');
  }


}

function draw() {
  stroke('black');
  background('DarkRed');
  textSize(32);

  fill('BurlyWood');
  translate(width / 2, height / 2);
  pizza.pie();

  //cheese functionality
  cheeseCol.setAlpha(cheese.value());
  fill(cheeseCol);
  cheeseCirc.pie();

  //pep functionality
  fill(pepperoniCol);
  cheeseCirc.pepperoni(pepperoni.value());
  
  //garlic functionality
  cheeseCirc.garlic(spices.value());
  
  //bring up text when pizza is perfect
  if(cheese.value()==cheeseMax && pepperoni.value()==pepperoniMax && spices.value()==spicesMax){
    fill(255,255,255,200)
    rect(0, height*0.25, width, height*0.5)
    textSize(16);
    textAlign(LEFT);
    fill('black');
    text('Like this pizza, I bring a lot to the table. My degrees and continued education have given me a great foundaton. I have excellent creative problem solving skills because of my unique background. My experience has given me excellent communication skills and the ability to express myself and my ideas. \nAlso, I really love pizza.', 0, height*0.25+20, width*.9, height*0.5)
  }

}

//just a slice
class Slice {
  constructor(size, fraction, org) {
    this.size = size;
    this.fraction = fraction;
    arc(org.x, org.y, this.size, this.size, 0, TWO_PI / this.fraction, PIE);
  }
}


//the whole pizza
class Pizza {
  constructor(slices, size, org) {
    this.slices = slices;
    this.size = size;
    this.org = org;
    this.pieces = [];
    this.pepps = [];
    this.spices = [];
  }

  //makes a pizza pie with designated number of slices
  pie() {
    for (var i = 1; i <= this.slices; i++) {
      push();
      rotate(TWO_PI * i / this.slices);
      this.pieces.push(new Slice(this.size, this.slices, this.org));
      pop();
    }
  }

  //prepares n maximum pepperoni within the crust
  createPepperoni(n) {
    for (var i = 0; i < n; i++) {
      let x = random((this.size / -2) / sqrt(2) + 20, (this.size / 2) / sqrt(2)) - 20;
      let y = random((this.size / -2) / sqrt(2) + 20, (this.size / 2) / sqrt(2)) - 20;
      this.pepps.push([x, y, this.size / 20, this.size / 20]);
    }
  }

  //reveals pepperoni (based on slider)
  pepperoni(n) {
    for (var i = 0; i < n; i++) {
      ellipse(this.pepps[i][0], this.pepps[i][1], this.pepps[i][2], this.pepps[i][3]);
    }
  }
  
  //prepares n maximum pepperoni within the crust
  createGarlic(n, mycolors) {
    for (var i = 0; i < n; i++) {
      let c = random(mycolors);
      let x = random((this.size / -2) / sqrt(2) + 20, (this.size / 2) / sqrt(2)) - 20;
      let y = random((this.size / -2) / sqrt(2) + 20, (this.size / 2) / sqrt(2)) - 20;
      this.spices.push([x, y, this.size / 50, this.size / 50, c]);
    }
  }

  //reveals pepperoni (based on slider)
  garlic(n) {
    for (var i = 0; i < n; i++) {
      rectMode(CENTER);
      fill(color(this.spices[i][4]));
      noStroke();
      rect(this.spices[i][0], this.spices[i][1], this.spices[i][2], this.spices[i][3]);
    }
  }

}
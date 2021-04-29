/*Abra White
March 2021

generates a map that looks at all my contexts and plots a bubble map based on relatonship and location
whether someone was contacted during a week is indicated by a line
*/

let geographies;//world map
let contacts;//contacts data
let relationships;//types of relationships
var geoGenerator;
var projection;
let cxt;

let colors;
let c = 0;//color iterator 
let h = 40; //height iterator for legend

function preload(){
    //load world map data and contacts data
    let geourl = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";
    geographies = loadJSON(geourl);
    let conurl2 = "https://raw.githubusercontent.com/awhite2/CreativeCoding/main/contacts.geojson";
    contacts = loadJSON(conurl2);
    
}

function setup(){
    
    var c = createCanvas(windowWidth,windowHeight);
    var canvas = c.canvas;
    ctx = canvas.getContext('2d');

    //color pallette 
    colors = [color('orange'),color('green'),color('blue'),color('red'),color('black')];
    
    noLoop();
}

function draw(){

    //title and introduction
    textAlign(RIGHT);
    textSize(36);
    text("Weekly Contacts",width-10, h);
    h+=40;

    textSize(16);
    text("Bubbles represent number of contacts\nin different social groups.\nLines represent calls made this week.",width-10, h);
    h+=60;

    
    projection = d3.geoMercator();
    geoGenerator = d3.geoPath().projection(projection).context(ctx);
    
    
    //draw countries
    ctx.beginPath();
    geoGenerator({type: 'FeatureCollection', features:   geographies.features});
    fill('#fdfdfd');
    ctx.fill();
    stroke('grey');
    ctx.stroke();


    //Pull distinct locations and relationships
    let locs = new Set(contacts.features.map(x => x.properties.Location));
    relationships = new Set(contacts.features.map(x => x.properties.Relation));
    
    //loop through locations
    locs.forEach(circs);

    //draw legend
    c = 0;
    relationships.forEach(legend);
    c = 0;

    //text for me
    fill('black');
    textSize(14);
    text("me", projection([-30,0])[0]+5, projection([-30,0])[1]+10);

  
}

//draw circles
function circs(set){
  let results = contacts.features.filter(x => x.properties.Location === set);
  
  let size = relationships.forEach(rels);
  c = 0;
  
  //loops through relationships
  function rels(cur){
    let sizes = results.filter(x => x.properties.Relation === cur);
    if(sizes.length>0){
      let p = sizes[0].geometry.coordinates;
      let s = sizes.length/2;

      var circle = d3.geoCircle()
      .center(p)
      .radius(s);
      
			//draw circles
      ctx.beginPath();
      geoGenerator(circle());
      colors[c].setAlpha(255);
      stroke(colors[c]);
      colors[c].setAlpha(20);
      fill(colors[c]);
      ctx.stroke();
      ctx.fill();

			//draw center points
      strokeWeight(1);
      stroke('black');
      let center = projection(p);
      point(center[0],center[1]);
    
    //draw line
    for(var i = 0; i<sizes.length; i++){
        if(sizes[i].properties.Contacted==="TRUE"){
            ctx.beginPath();
            stroke('red');
            geoGenerator({type: 'Feature', geometry: {type: 'LineString', coordinates: [sizes[0].geometry.coordinates, [-30,0]]}});
            ctx.stroke();
        }
    }
    }
    c++;
  }
}//end of circs

//makes legend for what colors mean
function legend(types){

    //color guide
    colors[c].setAlpha(20);
    fill(colors[c]);
    colors[c].setAlpha(255);
    stroke(colors[c]);
    ellipse(width-40, h,20,20);

    //text
    fill('black');
    noStroke();
    text(types, width-60,h+5);
    c++;
    h+=25;
}

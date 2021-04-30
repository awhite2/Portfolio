
import toxi.geom.*;
import java.util.ArrayList;

import toxi.physics3d.*;
import toxi.physics3d.behaviors.*;
import toxi.physics3d.constraints.*;
//import toxi.physics.constraints.*;

int c = 80;
int r = 80;

Particle[][] particles = new Particle[c][r];
ArrayList<Spring> springs;
SphereConstraint sphere;

float w = 5;

VerletPhysics3D physics; 

void setup(){
  size(600,800, P3D);

  
  springs = new ArrayList<Spring>();
  physics = new VerletPhysics3D();
  
  
  float x = -250;
  for (int i = 0; i < c; i++){
  float y = -100;
      for (int j = 0; j < r; j++){
          Particle p = new Particle(x,y, 0);
          particles[i][j] = p;
          physics.addParticle(p);
          y = y + w;
      }
     x = x + w;
  }
  
  //cnnect right and connect down
 for (int i =0; i<c-1; i++){
    for (int j = 0; j<r-1; j++){
       Particle a = particles[i][j];

         Particle b1 = particles[i+1][j];
         Spring s1 = new Spring(a,b1);
         springs.add(s1);
         physics.addSpring(s1);

         Particle b2 = particles[i][j+1];
         Spring s2 = new Spring(a,b2);
         springs.add(s2);
         physics.addSpring(s2);
         
       if(j==r-2){
         Particle a2 = particles[i][j+1];
         Particle b3 = particles[i+1][j+1];
         Spring s3 = new Spring(a2,b3);
         springs.add(s3);
         physics.addSpring(s3);
       }
       if(i==c-2){
         Particle a2 = particles[i+1][j];
         Particle b3 = particles[i+1][j+1];
         Spring s4 = new Spring(b3,a2);
         springs.add(s4);
         physics.addSpring(s4);
       }
    }
  }
  
  
  sphere = new SphereConstraint(new Vec3D(-50, 50, -50), 200.0,true);
  
  frameRate(30);
  
}

void draw(){
  background(255, 200, 200); 
  translate(width/2+50, height/2-50);
  physics.update();
  colorMode(RGB);
  directionalLight(100, 100, 0, 0, 1, 0);
  pointLight(200, 0, 0, -1, 1, 0);
  ambientLight(255, 255, 255);
  
  
  
  for (int i =0; i<c; i++){
    for (int j = 0; j<r; j++){
      sphere.apply(particles[i][j]);   
    }
  }

  fill(200, 170, 150);
  noStroke();
  textureMode(NORMAL);
  for (int j = 0; j < r-1; j++) {
    beginShape(TRIANGLE_STRIP);
    for (int i = 0; i < c; i++) {
      float x1 = particles[i][j].x;
      float y1 = particles[i][j].y;
      float z1 = particles[i][j].z;
      float u = map(i, 0, c-1, 0, 1);
      float v1 = map(j, 0, r-1, 0, 1);
      vertex(x1, y1, z1, u, v1);
      float x2 = particles[i][j+1].x;
      float y2 = particles[i][j+1].y;
      float z2 = particles[i][j+1].z;
      float v2 = map(j+1, 0, c-1, 0, 1);
      vertex(x2, y2, z2, u, v2);
    }
    endShape();
  }
  
}

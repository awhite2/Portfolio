class Spring extends VerletSpring3D {
   
  Spring(Particle a, Particle b) {
    super(a, b, w, 0.5);
  }

  
  void display(){
     stroke(color(255,100,100));
     line(a.x,a.y, a.z, b.x, b.y, b.z);
  }
}

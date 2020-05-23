//range of rad from json should be 0.15<n<1
class People {
  constructor(jsonobj) {
    this.appear_time = jsonobj.appear_time;
    this.rad = (-cam_z) * jsonobj.rad;
    this.jsonrad = HALF_PI*jsonobj.rad;
    this.pos = createVector(cam_x + (this.rad) * sin(radians(jsonobj.pan)), cam_y + (this.rad) * sin(radians(jsonobj.tilt)), cam_z + (this.rad) * cos(radians(jsonobj.pan)) * cos(radians(jsonobj.tilt)));

    this.centeranglex = atan((this.pos.x-cam_x)/(this.pos.z-cam_z));
    this.centerangley = atan((this.pos.y-cam_y)/(this.pos.z-cam_z));
    this.width = 25;
    this.diagonal = this.width * sqrt(2);
    this.distance = sqrt(sq(this.pos.x-cam_x)+sq(this.pos.z-cam_z));
    this.tipangle = asin(this.diagonal/this.distance);
    this.leftangle = this.centeranglex-this.tipangle;
    this.rightangle = this.centeranglex+this.tipangle;
    this.upangle = this.centerangley+this.tipangle;
    this.downangle = this.centerangley-this.tipangle;
    this.detect;
    this.texture = jsonobj.texture;
    //we need to compare cam(pan&tilt) w/ jsonobj.pan&tilt.
  }

  render() {
    //if song time ~ == this.time
    if(song.currentTime() >= this.appear_time){
      push();
      texture(peopletexture[this.texture]);

      translate(this.pos);
      box(50, 50, 50);
      pop();
    }
  }


  detected() {
    if (pan+(1.75+10*cos(this.jsonrad))*aim_tipangle<=this.rightangle && pan-(1.75+10*cos(this.jsonrad))*aim_tipangle>=this.leftangle &&
       tilt+(1.75+10*cos(this.jsonrad))*aim_tipangle <= this.upangle && tilt-(1.75+10*cos(this.jsonrad))*aim_tipangle >= this.downangle) {
      this.detect = true;
    } else this.detect = false;
    return this.detect;
  }
}

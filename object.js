//range of rad from json should be 0.15<n<1
class People {
  constructor(jsonobj) {
    this.appear_time = jsonobj.appear_time;
    this.rescue;
    this.rad = (-cam_z) * jsonobj.rad;
    this.jsonrad = HALF_PI * jsonobj.rad;
    this.origin = createVector(cam_x + (this.rad) * sin(radians(jsonobj.pan)), cam_y + (this.rad) * sin(radians(jsonobj.tilt)), cam_z + (this.rad) * cos(radians(jsonobj.pan)) * cos(radians(jsonobj.tilt)));
    this.pos = createVector(cam_x + (this.rad) * sin(radians(jsonobj.pan)), cam_y + (this.rad) * sin(radians(jsonobj.tilt)), cam_z + (this.rad) * cos(radians(jsonobj.pan)) * cos(radians(jsonobj.tilt)) + 500);
    this.centeranglex = atan((this.origin.x - cam_x) / (this.origin.z - cam_z));
    this.centerangley = atan((this.origin.y - cam_y) / (this.origin.z - cam_z));
    this.width = 25;
    this.diagonal = this.width * sqrt(2);
    this.distance = sqrt(sq(this.origin.x - cam_x) + sq(this.origin.z - cam_z));
    this.tipangle = asin(this.diagonal / this.distance);
    this.leftangle = this.centeranglex - this.tipangle;
    this.rightangle = this.centeranglex + this.tipangle;
    this.upangle = this.centerangley + this.tipangle;
    this.downangle = this.centerangley - this.tipangle;
    this.detect;
    this.texture = jsonobj.texture;
    this.isrendering;

    //we need to compare cam(pan&tilt) w/ jsonobj.pan&tilt.
  }

  shadow(){
    if (this.rescue == false &&  song.currentTime() <= this.appear_time+0.3) {
      if (song.currentTime() >= this.appear_time-1) {
        this.isrendering = true;
        push();
        noStroke();
        tint(0, 255, 0);
        fill(100+map(this.pos.z-this.origin.z, 150,0,0,155),100,100,20);
        translate(this.origin.x, this.origin.y, this.origin.z);
        box(50, 50, 50);
        pop();
      }
    }

  }


  render() {
    //if song time ~ == this.time
    if (this.rescue == false) {
      if (song.currentTime() >= this.appear_time-1) {
        this.isrendering = true;
        push();
        tint(0, 255, 0);
        texture(peopletexture[this.texture]);
        translate(this.pos);
        box(50, 50, 50);
        this.pos.z-=10;
        pop();
      } else if (song.currentTime() < this.appear_time-1) {
        this.isrendering = false;
      }
    } else if(this.rescue == true){
      this.isrendering = false;
    }
  }

  detected() {
    if (this.detect == false && this.isrendering == true) {
      if (pan + (1.75 + 10 * cos(this.jsonrad)) * aim_tipangle <= this.rightangle && pan - (1.75 + 10 * cos(this.jsonrad)) * aim_tipangle >= this.leftangle &&
        tilt + (1.75 + 10 * cos(this.jsonrad)) * aim_tipangle <= this.upangle && tilt - (1.75 + 10 * cos(this.jsonrad)) * aim_tipangle >= this.downangle) {
        this.detect = true;
        soundeffect[int(random(4)) + 1].play();
        setTimeout(function() {
          anime[int(random(4)) + 1].play();
        }, 50);
      } else this.detect = false;
    }

    return this.detect;
  }

  rescued() {
    if (this.detect == true) {
      this.rescue = true;
    } else {
      this.rescue = false;
    }
  }

}

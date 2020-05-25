//range of rad from json should be 0.15<n<1
class People {
  constructor(jsonobj) {
    this.appear_time = jsonobj.appear_time;
    this.rescue;
    this.rad = (-cam_z) * jsonobj.rad;
    this.jsonrad = HALF_PI * jsonobj.rad;
    this.origin = createVector(cam_x + (this.rad) * sin(radians(jsonobj.pan)), cam_y + (this.rad) * sin(radians(jsonobj.tilt)), cam_z + (this.rad) * cos(radians(jsonobj.pan)) * cos(radians(jsonobj.tilt)));
    this.pos = createVector(cam_x + (this.rad) * sin(radians(jsonobj.pan)), cam_y + (this.rad) * sin(radians(jsonobj.tilt)), cam_z + (this.rad) * cos(radians(jsonobj.pan)) * cos(radians(jsonobj.tilt)) + 500);
    this.characterpos = createVector(cam_x + (this.rad) * sin(radians(jsonobj.pan)), cam_y + (this.rad) * sin(radians(jsonobj.tilt))-25, cam_z + (this.rad) * cos(radians(jsonobj.pan)) * cos(radians(jsonobj.tilt)));
    this.pos1 = createVector(cam_x + (this.rad) * sin(radians(jsonobj.pan)), cam_y + (this.rad) * sin(radians(jsonobj.tilt)), cam_z + (this.rad) * cos(radians(jsonobj.pan)) * cos(radians(jsonobj.tilt)));
    this.pos2 = createVector(cam_x + (this.rad) * sin(radians(jsonobj.pan)), cam_y + (this.rad) * sin(radians(jsonobj.tilt)), cam_z + (this.rad) * cos(radians(jsonobj.pan)) * cos(radians(jsonobj.tilt)));
    this.pos3 = createVector(cam_x + (this.rad) * sin(radians(jsonobj.pan)), cam_y + (this.rad) * sin(radians(jsonobj.tilt)), cam_z + (this.rad) * cos(radians(jsonobj.pan)) * cos(radians(jsonobj.tilt)));
    this.pos4 = createVector(cam_x + (this.rad) * sin(radians(jsonobj.pan)), cam_y + (this.rad) * sin(radians(jsonobj.tilt)), cam_z + (this.rad) * cos(radians(jsonobj.pan)) * cos(radians(jsonobj.tilt)));
    this.characterrot = 0;
    this.rotx1 = random(radians(10));
    this.roty1 = random(radians(10));
    this.rotz1 = random(radians(10));
    this.rotx2 = random(radians(10));
    this.roty2 = random(radians(10));
    this.rotz2 = random(radians(10));
    this.rotx3 = random(radians(10));
    this.roty3 = random(radians(10));
    this.rotz3 = random(radians(10));
    this.rotx4 = random(radians(10));
    this.roty4 = random(radians(10));
    this.rotz4 = random(radians(10));
    this.charactercolor = random(360);
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
    this.scale = 1;

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
      this.scale -= 0.03;
      if(this.scale >= 0){
        push();
        tint(0, 255, 0);
        texture(peopletexture[this.texture]);
        translate(this.pos1);
        this.pos1.x-=3;
        this.pos1.y+=3;
        rotateX(this.rotx1);
        rotateX(this.roty1);
        rotateX(this.rotz1);
        this.rotx1-=radians(3);
        this.roty1+=radians(3);
        this.rotz1+=radians(3);
        scale(this.scale);
        box(25, 25, 25);
        pop();

        push();
        tint(0, 255, 0);
        texture(peopletexture[this.texture]);
        translate(this.pos2);
        this.pos2.x+=3;
        this.pos2.y+=3;
        rotateX(this.rotx2);
        rotateX(this.roty2);
        rotateX(this.rotz2);
        this.rotx2+=radians(3);
        this.roty2+=radians(3);
        this.rotz2+=radians(3);
        scale(this.scale);
        box(25, 25, 25);
        pop();

        push();
        tint(0, 255, 0);
        texture(peopletexture[this.texture]);
        translate(this.pos3);
        this.pos3.x-=3;
        this.pos3.y-=3;
        rotateX(this.rotx3);
        rotateX(this.roty3);
        rotateX(this.rotz3);
        this.rotx3-=radians(3);
        this.roty3-=radians(3);
        this.rotz3-=radians(3);
        scale(this.scale);
        box(25, 25, 25);

        pop();

        push();
        tint(0, 255, 0);
        texture(peopletexture[this.texture]);
        this.pos4.x+=3;
        this.pos4.y-=3;
        translate(this.pos4);
        rotateX(this.rotx4);
        rotateX(this.roty4);
        rotateX(this.rotz4);
        this.rotx4+=radians(3);
        this.roty4-=radians(3);
        this.rotz4-=radians(3);
        scale(this.scale);
        box(25, 25, 25);
        pop();
      }
      if(this.characterrot <= 2){
        push();
        translate(this.characterpos);
        scale(3);
        noStroke();
        colorMode(HSB,360,100,100,1);
        fill(this.charactercolor,60,100, 1-this.characterrot*0.5);
        this.characterpos.y+=this.characterrot;
        rotateY(this.characterrot);
        this.characterrot+=0.1;
        model(character);
        pop();
      }
    }
  }

  detected() {
    if (this.detect == false && this.isrendering == true) {
      if (pan + (1.75 + 10 * cos(this.jsonrad)) * aim_tipangle <= this.rightangle && pan - (1.75 + 10 * cos(this.jsonrad)) * aim_tipangle >= this.leftangle &&
        tilt + (1.75 + 10 * cos(this.jsonrad)) * aim_tipangle <= this.upangle && tilt - (1.75 + 10 * cos(this.jsonrad)) * aim_tipangle >= this.downangle) {
        this.detect = true;

        //sound effects
        soundeffect[int(random(4)) + 1].play();
        setTimeout(function() {
          anime[int(random(4)) + 1].play();
        }, 50);

        //bad/good/great
        if(song.currentTime() >= this.appear_time-0.1 && song.currentTime() < this.appear_time+0.1){ //great
          score+=great;
        }
        else if(song.currentTime() >= this.appear_time-0.3 && song.currentTime() < this.appear_time+0.3){ //good
          score+=good;
        }
        else if(song.currentTime() >= this.appear_time-0.6 && song.currentTime() < this.appear_time+0.6){ //bad
          score+=bad;
        }

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

class Asteroid{
  constructor(){
    this.x = random(10,15);
    this.y = random(10,15);
    this.z = random(10,15);

    this.hue = random(360);
    this.saturation = random(5,13);
    this.brightness = random(90,100);
    this.alpha = random(0.1, 0.3);
    this.leftright = random(1);
    this.updown = random(1);
    this.velocity = random(5, 100);
    this.isgone;

    if(this.leftright < 0.5){ //left
      this.posx = random(-windowWidth, -50);
    }
    else{ //right
      this.posx = random(50, windowWidth);
    }
    if(this.updown < 0.5){ //down
      this.posy = random(-windowHeight, -50);
    }
    else{ //up
      this.posy = random(50, windowHeight);
    }
    this.posz = 1000;
  }

  render(){
    if(this.posz >= (-(windowHeight/2/ tan(PI*30.0 / 180.0)))*3){
      push();
      colorMode(HSB,360,100,100,1);
      fill(this.hue, this.saturation, this.brightness, this.alpha);
      translate(this.posx, this.posy, this.posz);
      noStroke();
      ellipsoid(this.x, this.y, this.z, 12,8);
      this.posz -= this.velocity;
      pop();
      this.isgone = false;
    }
    else{
      this.isgone = true;
    }
  }

  newconstruct(){
    if(this.isgone == true){
      this.x = random(10,15);
      this.y = random(10,15);
      this.z = random(10,15);
      this.hue = random(360);
      this.saturation = random(5,13);
      this.brightness = random(90,100);
      this.alpha = random(0.1, 0.3);
      this.leftright = random(1);
      this.updown = random(1);
      this.velocity = random(5, 100);

      if(this.leftright < 0.5){ //left
        this.posx = random(-windowWidth, -50);
      }
      else{ //right
        this.posx = random(50, windowWidth);
      }
      if(this.updown < 0.5){ //down
        this.posy = random(-windowHeight, -50);
      }
      else{ //up
        this.posy = random(50, windowHeight);
      }
      this.posz = 1000;
            this.isgone = false;
    }
  }
}

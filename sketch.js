let object;
let people = [];
let peopletexture = [];
let soundeffect = [];
let anime = [];
let cam_x, cam_y, cam_z;
let cam_dx, cam_dy, cam_dz;
let cam_cx, cam_cy, cam_cz;
let aim_rad, aim_x, aim_y, aim_z, aim_tipangle;
let aimcolor = [];
let aimsituation;
let pan, tilt;
let song;
let sensitivity;
let start;
let font;
let currentpeople;
let detection;

function preload(){
object = loadJSON("object.json");
song = loadSound('assets/song.mp3');
for(let i = 1; i<=4; i++){
  soundeffect[i] = loadSound("assets/soundeffect/effect"+i+".wav") ;
  anime[i] = loadSound("assets/soundeffect/anime"+i+".mp3") ;
}
font = loadFont('assets/NotoSansKR-Black.otf');
  for(let i = 1; i<=6; i++){
    peopletexture[i] = loadImage("assets/slime/"+i+".png") ;
  }
}

function setup(){
  frameRate(50);


  //camera set-up
  cam_x = 0;
  cam_y = 0;
  cam_z = -(windowHeight/2/ tan(PI*30.0 / 180.0));
  cam_dx = 0;
  cam_dy = 0;
  cam_dz = 0;
  pan = 0;
  tilt = 0;
  sensitivity = 8;
  aim_rad = (-cam_z)/10;

  start = false;
  currentpeople=0;

  for(let i = 0; i<Object.keys(object).length; i++){
          people[i] = new People(object[i]);
          people[i].detect = false;
  }

  aimcolor[0]=color(255,255,255); //normal
  aimcolor[1]=color(0,200,0); // targeted
  aimcolor[2]=color(200,0,0); // no or wrong target
  aimsituation = 0;
  detection = 0;

  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw(){
  background(0);


  if(start == false){
    push();
    fill(255);
    textFont(font);
    textAlign(CENTER, CENTER);
    textSize(60);
    text("PLAY", 0,0);
    pop();
  }


  if (start == true){
    //camera set-up
    updateCamCenter();
    camera(cam_x, cam_y, cam_z,cam_cx, cam_cy, cam_cz,0,-1,0);
    pan += radians(movedX)/sensitivity;
    tilt -= radians(movedY)/sensitivity;


    //load people data from JSON file
    for(let i = 0; i<Object.keys(object).length; i++){
      people[i].rescued();
      people[i].shadow();
      people[i].render();
    }

    //set aiming point
    push();
    translate(aim_x, aim_y, aim_z);
    fill(aimcolor[aimsituation]);
    noStroke();
    sphere(0.5,4,4);
    pop();
  }
}

function mousePressed(){
  if (start == false){
    clear();
    start = true;
    song.play();
  }

  else{
    //hit-box detecton
    for(let i = currentpeople; i<Object.keys(object).length; i++){
      people[i].detected();
      if(people[i].detect == true){
      aimsituation = 1;
      detection = 1;
      }
    }
    if(detection == 0){
      aimsituation = 2;
    }

  }
  requestPointerLock();
}


function mouseReleased(){
  for(let i = currentpeople; i<Object.keys(object).length; i++){
    if(people[i].detect == true){
      currentpeople += 1;
    }
  }
  setTimeout(function(){aimsituation = 0; detection = 0},5);
}


function updateCamCenter(){
  cam_dz = cos(pan)*cos(tilt);
  cam_dx = sin(pan);
  cam_dy = sin(tilt);

  // compute scene center position
  cam_cx = cam_x + cam_dx*(-cam_z);
  cam_cy = cam_y + cam_dy*(-cam_z);
  cam_cz = cam_z + (cam_dz)*(-cam_z);

  //compute aiming point position
  aim_x = cam_x + cam_dx*aim_rad;
  aim_y = cam_y + cam_dy*aim_rad;
  aim_z = cam_z + (cam_dz)*aim_rad;
  aim_tipangle = asin(0.25/sqrt(sq(aim_x-cam_x)+sq(aim_z-cam_z)));
}

let object;
let people = [];
let rescuedpeople = [];
let peopletexture = [];
let soundeffect = [];
let asteroid = [];
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
let score = 0;
let great = 300;
let good = 200;
let bad = 100;
let bg;
let perfect;
let A;
let B;
let C;
let character;


function preload() {
  object = loadJSON("object.json");
  song = loadSound('assets/song.mp3');
  bg = loadImage('assets/space/space6.jpg');
  for (let i = 1; i <= 4; i++) {
    soundeffect[i] = loadSound("assets/soundeffect/effect" + i + ".wav");
    anime[i] = loadSound("assets/soundeffect/anime" + i + ".mp3");
  }
  font = loadFont('assets/NotoSansKR-Black.otf');
  for (let i = 1; i <= 6; i++) {
    peopletexture[i] = loadImage("assets/slime/" + i + ".png");
  }
  A = loadModel('assets/abc/modelA.obj');
  B = loadModel('assets/abc/modelB.obj');
  C = loadModel('assets/abc/modelC.obj');
  character = loadModel('assets/character.obj');
}

function setup() {
  frameRate(50);
  //camera set-up
  cam_x = 0;
  cam_y = 0;
  cam_z = -(windowHeight / 2 / tan(PI * 30.0 / 180.0));
  cam_dx = 0;
  cam_dy = 0;
  cam_dz = 0;
  pan = 0;
  tilt = 0;
  sensitivity = 8;
  aim_rad = (-cam_z) / 10;
  score = 0;

  start = false;
  currentpeople = 0;

  for (let i = 0; i < Object.keys(object).length; i++) {
    people[i] = new People(object[i]);
    people[i].detect = false;
    rescuedpeople[i] = false;
  }
  for (let i = 0; i < 5; i++) {
    asteroid[i] = new Asteroid();
    asteroid[i].isgone = false;
  }

  aimcolor[0] = color(255, 255, 255); //normal
  aimcolor[1] = color(50,255, 255); // targeted
  aimcolor[2] = color(200, 0, 0); // no or wrong target
  aimsituation = 0;
  detection = 0;

  createCanvas(windowWidth, windowHeight, WEBGL);
  bg.height = windowHeight;
  bg.width = windowWidth;


  scorediv = createDiv("score:"+score);
  scorediv.position(10,10);
  scorediv.style('color', '#ffffff');
  scorediv.style('font-size', 15+'px');
  scorediv.style('text-align', 'left');

  perfect = (Object.keys(object).length-1)*300;
}

function draw() {
  background(0);




  if (start == false) { // play button
    push();
    fill(255);
    textFont(font);
    textAlign(CENTER, CENTER);
    textSize(60);
    text("PLAY", 0, 0);
    pop();
  }

  if (start == true) { //game start

    ambientLight(255,255,255);
    directionalLight(255,255,255,0,1,0);


    //background box
    push();
    translate(0, 0, 5 * (-cam_z));
    texture(bg);
    box(bg.width * windowWidth / 100, bg.height * windowHeight / 100, 1);
    pop();

    push();
    rotateY(HALF_PI);
    translate(0, 0, 5 * (-cam_z));
    texture(bg);
    box(bg.width * windowWidth / 100, bg.height * windowHeight / 100, 1);
    pop();

    push();
    rotateY(HALF_PI * 2);
    translate(0, 0, 5 * (-cam_z));
    texture(bg);
    box(bg.width * windowWidth / 100, bg.height * windowHeight / 100, 1);
    pop();

    push();
    rotateY(HALF_PI * 3);
    translate(0, 0, 5 * (-cam_z));
    texture(bg);
    box(bg.width * windowWidth / 100, bg.height * windowHeight / 100, 1);
    pop();


    //camera set-up
    updateCamCenter();
    camera(cam_x, cam_y, cam_z, cam_cx, cam_cy, cam_cz, 0, -1, 0);
    pan += radians(movedX) / sensitivity;
    tilt -= radians(movedY) / sensitivity;


    //load people data from JSON file
    for (let i = 0; i < Object.keys(object).length; i++) {
      people[i].rescued();
      people[i].shadow();
      people[i].render();
    }
    for (let i = 0; i < 5; i++) {
      asteroid[i].render();
      asteroid[i].newconstruct();
    }

    //set aiming point
    push();
    translate(aim_x, aim_y, aim_z);
    fill(aimcolor[aimsituation]);
    noStroke();
    sphere(0.5, 4, 4);
    pop();
  }

  if(song.currentTime() >= 67){
    song.pause();
    exitPointerLock();
  }
  if(song.isPaused()){
    exitPointerLock();
    if(score >= perfect * 0.8){
      push();
      translate(0,0, aim_z/2);
      scale(100);
      noStroke();
      fill(255,0,0);
      model(A);
      pop();
    }
    else if(score >= perfect * 0.5){
      push();
      translate(0,0, aim_z/2);
      scale(100);
      noStroke();
      fill(0,255,0);
      model(B);
      pop();
    }
    else{
      push();
      translate(0,0, aim_z/2);
      scale(100);
      noStroke();
      fill(0,0,255);
      model(C);
      pop();
    }
  }


}

function mousePressed() {
  if (start == false) {
    clear();
    start = true;
    song.play();
  } else {
    //hit-box detecton
    for (let i = 0; i < Object.keys(object).length; i++) {
      if (rescuedpeople[i] == false) {
        people[i].detected();
        if (people[i].detect == true) {
          aimsituation = 1;
          detection = 1;
          rescuedpeople[i] = true;
        }
      }
      if (detection == 0) {
        aimsituation = 2;
      }
    }
  }
  requestPointerLock();
  removeElements();
}


function mouseReleased() {
  aimsituation = 0;
  detection = 0;

  //update score
  scorediv = createDiv("score:"+score);
  scorediv.position(10,10);
  scorediv.style('color', '#ffffff');
  scorediv.style('font-size', 15+'px');
  scorediv.style('text-align', 'left');
}


function updateCamCenter() {
  cam_dz = cos(pan) * cos(tilt);
  cam_dx = sin(pan);
  cam_dy = sin(tilt);

  // compute scene center position
  cam_cx = cam_x + cam_dx * (-cam_z);
  cam_cy = cam_y + cam_dy * (-cam_z);
  cam_cz = cam_z + (cam_dz) * (-cam_z);

  //compute aiming point position
  aim_x = cam_x + cam_dx * aim_rad;
  aim_y = cam_y + cam_dy * aim_rad;
  aim_z = cam_z + (cam_dz) * aim_rad;
  aim_tipangle = asin(0.25 / sqrt(sq(aim_x - cam_x) + sq(aim_z - cam_z)));
}

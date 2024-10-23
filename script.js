class Raster {
  constructor(r, k) {
    this.aantalRijen = r;
    this.aantalKolommen = k;
    this.celGrootte = null;
  }

  berekenCelGrootte() {
    this.celGrootte = canvas.width / this.aantalKolommen;
  }

  teken() {
    push();
    noFill();
    stroke('grey');
    for (var rij = 0; rij < this.aantalRijen; rij++) {
      for (var kolom = 0; kolom < this.aantalKolommen; kolom++) {
        rect(kolom * this.celGrootte, rij * this.celGrootte, this.celGrootte, this.celGrootte);
      }
    }
    pop();
  }
}

class Jos {
  constructor() {
    this.x = 400;
    this.y = 300;
    this.animatie = [];
    this.frameNummer = 3;
    this.stapGrootte = null;
    this.gehaald = false;
    this.levens = 3;
  }

  beweeg() {
    if (keyIsDown(65)) {
      this.x -= this.stapGrootte;
      this.frameNummer = 2;
    }
    if (keyIsDown(68)) {
      this.x += this.stapGrootte;
      this.frameNummer = 1;
    }
    if (keyIsDown(87)) {
      this.y -= this.stapGrootte;
      this.frameNummer = 4;
    }
    if (keyIsDown(83)) {
      this.y += this.stapGrootte;
      this.frameNummer = 5;
    }

    this.x = constrain(this.x, 0, canvas.width);
    this.y = constrain(this.y, 0, canvas.height - raster.celGrootte);

    if (this.x == canvas.width) {
      this.gehaald = true;
    }
  }
  eet(appel1) {
    if (this.x == appel1.x && this.y == appel1.y) {
      return true;
    }
    else {
      return false;
    }
  }
  wordtGeraakt(vijand) {
     if (this.x == vijand.x && this.y == vijand.y) {
       return true;
         }
         else {
           return false;
         }
       }

  
  toon() {
    image(this.animatie[this.frameNummer], this.x, this.y, raster.celGrootte, raster.celGrootte);
  }
}

class Appel1 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.snelheidx = raster.celGrootte;
    this.snelheidy = raster.celGrootte;
    this.sprite = null;
    this.stapGrootte = null;
    this.gegeten = null;
  }


  beweeg() {
    this.x += this.snelheidx;
    this.y += this.snelheidy;

    
    if (this.x <= 0 || this.x >= canvas.width - raster.celGrootte) {
      this.snelheidx *= -1;  
    }
    if (this.y <= 0 || this.y >= canvas.height - raster.celGrootte) {
      this.snelheidy *= -1;  

    this.x = constrain(this.x, 0, canvas.width - raster.celGrootte);
    this.y = constrain(this.y, 0, canvas.height - raster.celGrootte);

    }
  }
  toon() {
    image(this.sprite, this.x, this.y, raster.celGrootte, raster.celGrootte);
  }
}

class Appel2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = null;
    this.gegeten = null;
    
  }
  toon() {
    image(this.sprite, this.x, this.y, raster.celGrootte, raster.celGrootte);
  }
}

class Vijand {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = null;
    this.stapGrootte = null;
  }

  beweeg() {
    this.x += floor(random(-1,2))*this.stapGrootte;
    this.y += floor(random(-1,2))*this.stapGrootte;

    this.x = constrain(this.x,0,canvas.width - raster.celGrootte);
    this.y = constrain(this.y,0,canvas.height - raster.celGrootte);
  }

  toon() {
    image(this.sprite,this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
}

function preload() {
}

function setup() {
  canvas = createCanvas(900, 600);
  canvas.parent();
  frameRate(10);
  textFont("Verdana");
  textSize(20);

  raster = new Raster(12, 18);

  raster.berekenCelGrootte();

  eve = new Jos();
  eve.stapGrootte = 1 * raster.celGrootte;
  for (var b = 0; b < 6; b++) {
    frameEve = loadImage("images/sprites/Eve100px/Eve_" + b + ".png");
    eve.animatie.push(frameEve);
  }
  appel1x = floor(random(0, 18)) * raster.celGrootte;
  appel1y = floor(random(0, 12)) * raster.celGrootte;
  appel1 = new Appel1(appel1x, appel1y);
  appel1.sprite = loadImage("images/sprites/appel_1.png");
  appel1.gegeten = false;

  appel2x = floor(random(0, 18)) * raster.celGrootte;
  appel2y = floor(random(0, 12)) * raster.celGrootte;
  appel2 = new Appel2(appel2x, appel2y);
  appel2.sprite = loadImage("images/sprites/appel_2.png");
  appel2.gegeten = false;
  
  alice = new Vijand(700,200);
  alice.stapGrootte = 1*eve.stapGrootte;
  alice.sprite = loadImage("images/sprites/Alice100px/Alice.png");

  bob = new Vijand(600,400);
  bob.stapGrootte = 1*eve.stapGrootte;
  bob.sprite = loadImage("images/sprites/Bob100px/Bob.png");  
}

function draw() {
  background('white');
  fill('orange')
  
  rect(0,0,raster.celGrootte,raster.aantalRijen * raster.celGrootte);
  rect(0,0,raster.aantalKolommen * raster.celGrootte,raster.celGrootte);
  if (mouseX <= raster.celGroote && mouseY <= raster.celGrootte){
    eve.levens += 1
  }
  
  raster.teken();
  eve.beweeg();
  eve.toon();
  alice.toon();
  alice.beweeg();
  bob.toon();
  bob.beweeg();
  
  if (appel1.gegeten == false){
  appel1.beweeg();
  appel1.toon();
  }
  if (appel2.gegeten == false){
  appel2.toon();
 }
 
  fill('black')
  text("Levens: " + eve.levens, 0, 30);
  
  if (eve.eet(appel1)) {
    eve.levens += 1;
    appel1.gegeten = true;
    appel1.x = -raster.celGrootte;
    appel1.y = -raster.celGrootte;
  }
  if (eve.eet(appel2)) {
    eve.levens += 1;
    appel2.gegeten = true;
    appel2.x = -raster.celGrootte;
    appel2.y = -raster.celGrootte;
  }
  if (eve.wordtGeraakt(alice) || eve.wordtGeraakt(bob)) {
    eve.levens -= 1;
  }
  if (eve.levens == 0) {
    textSize(90);
    background('red');
    fill('white');
    text("Je hebt verloren!", 30, 300)
    noLoop();
  }

  if (eve.gehaald) {
    textSize(90);
    background('green');
    fill('white');
    text("Je hebt gewonnen!", 30, 300);
    noLoop();
  }
}

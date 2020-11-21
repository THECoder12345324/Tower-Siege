const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var lives = 5;
var level = 1;
var score = 0;

var polyIMG;

var check = 0;
var gamestate = "play";

var section = "main";

function preload() {
  polyIMG = loadImage("polygon.png");
}

function setup() {
  createCanvas(1600,850);
  
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(800, 830, width, 30);
  rightwall = new Ground(1600, height / 2, 1, height);
  //leftwall= new Ground(0, height / 2, 1, height);

  stand1 = new Ground(3 * 350, 2 * (height / 3), width / 5, 20);

  pyramid = new Pyramid(1050, 2 * (height / 3) - 80, 40, 60);

  

  //The Polygon
  var polyOP = {
    density: 0.5,
    friction: 0.5
  }
  polygon = Bodies.polygon(200, height / 2, 6, 30, polyOP);
  World.add(world, polygon);

  //The Slingshot
  slingshot = new Slingshot(polygon, {x: 250, y: height / 2}, 0.02, 10);

  shopb = createButton("SHOP");
}

function draw() {
  background(173, 216, 230);
  if (section === "main") {
    Engine.update(engine);
  }

  if (section === "main") {
    fill("red");
    shopb.position(30, height - 100);
    shopb.size(100, 40);
    shopb.mousePressed(activate)

    push();
    strokeWeight(1);
    textSize(25);
    fill("black");
    text("Drag the mouse the launch the hexagon, and knock down as many as you can before your lives run out!", 330, 30);
    text("Press space to bring the hexagon back to starting position. You will lost a life every time you launch.", 330, 70);
    
    textSize(35);
    text("Lives: " + lives, 20, 40);

    text("Level: " + level, 160, 40);

    text("Money: " + score, 20, 80);
    pop();

    ground.display();
    stand1.display();

    if (!pyramid.destroyed()) {
      pyramid.display();
    }
    if (pyramid.destroyed()) {
      gamestate = "moveOn";
    }
    
    if (gamestate == "moveOn") {
      textSize(20);
      text("Press enter to move on to the next level", 100, 200);
      if (level == 1) {
        stand1.destroy();
      }
      if (level == 2) {
        stand2.destroy();
      }
      if (level == 3) {
        stand3.destroy();
        stand4.destroy();
      }
    }
    if (gamestate == "WIN") {
      textSize(40);
      text("YOU WIN!!!", width / 2 - 100, height / 2);
      stand5.destroy();
      stand6.destroy();
    }
    if (level == 2) {
      pyramid2.display();
      stand2.display();
      if (pyramid2.destroyed()) {
        gamestate = "moveOn";
      }
    }
    if (level == 3) {
      pyramid3.display();
      stand3.display();
      pyramid4.display();
      stand4.display();
      if (pyramid3.destroyed()) {
        check += 1;
      }
      if (pyramid4.destroyed()) {
        check += 1;
      }
      if (check == 2) {
        gamestate = "moveOn";
      }
    }
    if (level == 4) {
      pyramid5.display();
      pyramid6.display();
      pyramid7.display();
      pyramid8.display();
      stand5.display();
      stand6.display();
      if (pyramid5.destroyed()) {
        check += 1;
      }
      if (pyramid6.destroyed()) {
        check += 1;
      }
      if (pyramid7.destroyed()) {
        check += 1;
      }
      if (pyramid8.destroyed()) {
        check += 1;
      }
      if (check == 6) {
        gamestate = "WIN";
        leftwall= new Ground(0, height / 2, 1, height);
      }
    }

    //Display Polygon
    var angle = polygon.angle;
      
    push();
    translate(polygon.position.x, polygon.position.y);
    rotate(angle);
    imageMode(CENTER);
    image(polyIMG, 0, 0, 60, 60);
    pop();

    //Display Slingshot
    slingshot.display();
  }

  if (section === "shop") {
    textSize(50);
    fill("black");
    text("SHOP", width / 2 - 70, 80);
  }
}

function mouseDragged() {
  if (mouseX < (polygon.position.x + 50)) {
    if ((polygon.position.y - 250) < mouseY && (polygon.position.y + 250) > mouseY) {
      if (lives > 0) {
        if (slingshot.move == true) {
          Matter.Body.setPosition(polygon, {x: mouseX, y: mouseY})
        }
      }
    }
  }
}

function mouseReleased() {
  if (lives > 0) {
    if (slingshot.move == true) {
      slingshot.fly();
      lives -= 1;
    }
  }
}

function keyPressed() {
  if (keyCode == 32) {
    if (lives > 0) {
      Matter.Body.setPosition(polygon, {x: 200, y: height / 2})
      slingshot.attach();
    }
  }
  if (keyCode == 13) {
    if (gamestate == "moveOn") {
      if (level == 1) {
        pyramid2 = new Pyramid(700, 330, 20, 40);
        stand2 = new Ground(700, 350, 200, 10);
        lives = 4;
      }
      if (level == 2) {
        pyramid3 = new Pyramid(700, 650, 30, 50);
        pyramid4 = new Pyramid(1300, 400, 50, 70);

        stand3 = new Ground(700, 690, 250, 10);
        stand4 = new Ground(1300, 450, 300, 15);
        lives = 3;
      }
      if (level == 3) {
        pyramid5 = new Pyramid(1200, 220, 25, 40);
        pyramid6 = new Pyramid(1200, 840, 130, 150);
        pyramid7 = new Pyramid(800, 400, 25, 40);
        pyramid8 = new Pyramid(600, 700, 25, 40);

        stand5 = new Ground(800, 420, 200, 15);
        stand6 = new Ground(600, 720, 200, 15);
        lives = 7;
      }
      level += 1;
      gamestate = "play";
      Matter.Body.setPosition(polygon, {x: 200, y: height / 2})
      polygon.speed = 0;
      slingshot.attach();
    }
  }
}

function activate() {
  shopb.hide();
  section = "shop";
}
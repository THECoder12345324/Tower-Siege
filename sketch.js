const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var INFINITEAMOUNT = 400;
var POLYGONAMOUNT = 200;

var lives = 5;
var level = 1;
var score = 300;

var polyIMG, infinIMG;

var check = 0;
var gamestate = "play";

var section = "main";

var ball = "polygon1";

var purchase = "none";
var purchase2 = "none";
var infinlife = false;

function preload() {
  polyIMG = loadImage("polygon.png");
  infinIMG = loadImage("infinity.png");
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

  var polyOP2 = {
    density: 0.9,
    friction: 0.8,
  }
  polygon2 = Bodies.polygon(200, height / 2, 6, 70, polyOP2);

  //The Slingshot
  slingshot = new Slingshot(polygon, {x: 250, y: height / 2}, 0.02, 10);
  slingshot2 = new Slingshot(polygon2, {x: 250, y: height / 2}, 0.02, 7);

  shopb = createButton("SHOP");
  exitb = createButton("Exit To Game");
  exitb.hide();

  polygon2buy = createButton("BUY");
  polygon2buy.hide();

  infinbutton = createButton("BUY");
  infinbutton.hide();
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
    shopb.mousePressed(activate);
    polygon2buy.hide();

    push();
    strokeWeight(1);
    textSize(25);
    fill("black");
    text("Drag the mouse the launch the hexagon, and knock down as many as you can before your lives run out!", 330, 30);
    text("Press space to bring the hexagon back to starting position. You will lost a life every time you launch.", 330, 70);
    
    textSize(35);
    if (infinlife === false) {
      text("Lives: " + lives, 20, 40);
    }
    else {
      text("Lives: ", 20, 40);
      image(infinIMG, 110, 15, 50, 30);
    }

    text("Level: " + level, 170, 40);

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
    if (ball === "polygon1") {
      var angle = polygon.angle;
        
      push();
      translate(polygon.position.x, polygon.position.y);
      rotate(angle);
      imageMode(CENTER);
      image(polyIMG, 0, 0, 60, 60);
      pop();
    }
    else if (ball === "polygon2") {
      var angle = polygon2.angle;
        
      push();
      translate(polygon2.position.x, polygon2.position.y);
      rotate(angle);
      imageMode(CENTER);
      image(polyIMG, 0, 0, 140, 140);
      pop();
    }

    //Display Slingshot
    if (ball === "polygon1") {
      slingshot.display();
    }
    if (ball === "polygon2") {
      slingshot2.display();
    }
  }

  if (section === "shop") {

    //Show the title and amount of money
    textSize(50);
    fill("black");
    text("Shop", width / 2 - 10, 80);
    text("Money: " + score, 20, 80);

    //Display what the purchase is
    image(polyIMG, width / 2 - 8, height / 2 - 120, 140, 140)
    textSize(20);
    fill('black');
    text("Bigger and more destructive polygon: $150", width / 2 - 120, height / 2 + 60);

    //Setting exit button options
    exitb.position(width - 140, height - 100);
    exitb.size(100, 60);
    exitb.mousePressed(activate2);

    //Setting buying big polygon button options
    if (score > POLYGONAMOUNT && purchase != "big") {
      polygon2buy.show();
      polygon2buy.position(width / 2, (height / 5) * 3);
      polygon2buy.size(120, 60);
      polygon2buy.mousePressed(purchasepoly);
    }
    if (score < POLYGONAMOUNT && purchase != "big") {
      textSize(15);
      polygon2buy.hide();
      text("Not enough money", width / 2 - 10, (height / 8) * 5)
    }
    if (purchase === "big") {
      polygon2buy.hide();
      textSize(18);
      fill("black");
      text("Purchased", width / 2 + 10, (height / 8)  * 5)
    }

    /*




    To easily see the next item in the shop




    */
    image(infinIMG, width / 2 + 420, height / 2 - 120, 240, 120);
    textSize(20);
    text("Infinite Lives: $300", (width / 2) + 450, (height / 2) + 60);
    if (score > INFINITEAMOUNT && purchase2 != "big") {
      infinbutton.show();
      infinbutton.position(width / 2 + 428, (height / 5) * 3);
      infinbutton.size(120, 60);
      infinbutton.mousePressed(purchaselife);
    }
    if (score < INFINITEAMOUNT && purchase2 != "big") {
      textSize(15);
      infinbutton.hide();
      text("Not enough money", width / 2 + 480, (height / 8) * 5)
    }
    if (purchase2 === "big") {
      infinbutton.hide();
      textSize(18);
      fill("black");
      text("Purchased", width / 2 + 438, (height / 8)  * 5)
    }
  }
}

function mouseDragged() {
  
  if (lives > 0 && infinlife === false) {
    if (ball === "polygon1") {
      if (slingshot.move == true) {
        Matter.Body.setPosition(polygon, {x: mouseX / 2, y: mouseY})
      }
    }
    if (ball === "polygon2") {
      if (slingshot2.move == true) {
        Matter.Body.setPosition(polygon2, {x: mouseX / 2, y: mouseY})
      }
    }
  }
  if (infinlife === true) {
    if (ball === "polygon1") {
      if (slingshot.move == true) {
        Matter.Body.setPosition(polygon, {x: mouseX / 2, y: mouseY})
      }
    }
    if (ball === "polygon2") {
      if (slingshot2.move == true) {
        Matter.Body.setPosition(polygon2, {x: mouseX / 2, y: mouseY})
      }
    }
  }
}

function mouseReleased() {
  if (lives > 0 && infinlife === false) {
    if (section === "main") {
      if (ball === "polygon1") {
        if (slingshot.move == true) {
          slingshot.fly();
          lives -= 1;
        }
      }
      if (ball === "polygon2") {
        if (slingshot2.move == true) {
          slingshot2.fly();
          lives -= 1;
        }
      }
    }
  }

  if (infinlife === true) {
    if (section === "main") {
      if (ball === "polygon1") {
        if (slingshot.move == true) {
          slingshot.fly();
        }
      }
      if (ball === "polygon2") {
        if (slingshot2.move == true) {
          slingshot2.fly();
        }
      }
    }
  }
}

function keyPressed() {
  if (keyCode == 32) {
    if (lives > 0 && infinlife === false) {
      if (ball === "polygon1") {
        Matter.Body.setPosition(polygon, {x: 200, y: height / 2})
        slingshot.attach();
      }
      if (ball === "polygon2") {
        Matter.Body.setPosition(polygon2, {x: 200, y: height / 2})
        slingshot2.attach();
      }
    }
    if (infinlife === true) {
      if (ball === "polygon1") {
        Matter.Body.setPosition(polygon, {x: 200, y: height / 2})
        slingshot.attach();
      }
      if (ball === "polygon2") {
        Matter.Body.setPosition(polygon2, {x: 200, y: height / 2})
        slingshot2.attach();
      }
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
      if (ball === "polygon1") {
        Matter.Body.setPosition(polygon, {x: 200, y: height / 2})
        polygon.speed = 0;
        slingshot.attach();
      }
      if (ball === "polygon2") {
        Matter.Body.setPosition(polygon2, {x: 200, y: height / 2})
        polygon2.speed = 0;
        slingshot2.attach();
      }
    }
  }
}

function activate() {
  shopb.hide();
  section = "shop";
  exitb.show();
}

function activate2() {
  exitb.hide();
  shopb.show();
  section = "main"
}

function purchasepoly() {

  //Changing to the bigger polygon
  ball = "polygon2";
  World.add(world, polygon2);
  polygon2.speed = 0;
  Matter.Body.setPosition(polygon2, {x: 200, y: height / 2})
  slingshot2.attach();
  World.remove(world, polygon);

  //Remaking the shop screen
  purchase = "big"

  //Subtracting money
  score -= POLYGONAMOUNT;
}

function purchaselife() {

  //Changing to infinity lives
  lives = -1;
  infinlife = true;

  //Remaking the shop screen
  purchase2 = "big";

  //Subtracting the money
  score -= INFINITEAMOUNT;
}
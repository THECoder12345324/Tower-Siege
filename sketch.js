const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var lives = 3;

var polyIMG;

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

  //Bottom Layer
  box1 = new Box(1050, 2 * (height / 3) - 80, 40, 60);
  box2 = new Box(1010, 2 * (height / 3) - 80, 40, 60);
  box3 = new Box(1090, 2 * (height / 3) - 80, 40, 60);
  box4 = new Box(970, 2 * (height / 3) - 80, 40, 60);
  box5 = new Box(1130, 2 * (height / 3) - 80, 40, 60);

  //Second Layer
  box6 = new Box(1030, 2 * (height / 3) - 140, 40, 60);
  box7 = new Box(1070, 2 * (height / 3) - 140, 40, 60);
  box8 = new Box(990, 2 * (height / 3) - 140, 40, 60);
  box9 = new Box(1110, 2 * (height / 3) - 140, 40, 60);

  //Third Layer
  box10 = new Box(1050, 2 * (height / 3) - 200, 40, 60);
  box11 = new Box(1010, 2 * (height / 3) - 200, 40, 60);
  box12 = new Box(1090, 2 * (height / 3) - 200, 40, 60);

  //Fourth Layer
  box13 = new Box(1030, 2 * (height / 3) - 260, 40, 60);
  box14 = new Box(1070, 2 * (height / 3) - 260, 40, 60);

  //Top Layer
  box15 = new Box(1050, 2 * (height / 3) - 320, 40, 60);


  //The Polygon
  var polyOP = {
    density: 0.5,
    friction: 0.5
  }
  polygon = Bodies.polygon(200, height / 2, 6, 30, polyOP);
  World.add(world, polygon);

  //The Slingshot
  slingshot = new Slingshot(polygon, {x: 250, y: height / 2}, 0.02, 10);
}

function draw() {
  background(173, 216, 230);
  strokeWeight(5);
  Engine.update(engine);

  push();
  strokeWeight(1);
  textSize(25);
  fill("black");
  text("Drag the mouse the launch the hexagon, and knock down as many as you can before your lives run out!", 200, 70);
  text("Press space to bring the hexagon back to starting position. You will lost a life every time you launch.", 200, 120);
  
  textSize(35);
  text("Lives: " + lives, 20, 40);
  pop();

  ground.display();
  stand1.display();

  //Display Bottom Layer
  box1.display();
  box2.display();
  box3.display();
  box4.display();
  box5.display();

  //Display Second Layer
  box6.display();
  box7.display();
  box8.display();
  box9.display();

  //Display Third Layer
  box10.display();
  box11.display();
  box12.display();

  //Display Fourth Layer
  box13.display();
  box14.display();

  //Display Top Layer
  box15.display();


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

function mouseDragged() {
  var time = 60
  if (time > 0) {
    Matter.Body.setPosition(polygon, {x: mouseX, y: mouseY})
  }
}

function mouseReleased() {
  slingshot.fly();
  lives -= 1;
}

function keyPressed() {
  if (keyCode == 32) {
    if (lives > 0) {
      slingshot.attach();
    }
  }
}
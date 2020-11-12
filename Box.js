class Box{
    constructor(x, y, w, h) {
        var options = {
          'density':0.5,
          'friction': 0.7,
          'restitution':0.5
        };
        this.body = Bodies.rectangle(x, y, w, h, options);
        this.width = w;
        this.height = h;
        
        this.red = random(0, 255);
        this.green = random(0, 255);
        this.blue = random(0, 255)

        World.add(world, this.body);
    }
    display(){
        var angle = this.body.angle;
    
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(angle);
        rectMode(CENTER);
        fill(this.red, this.green, this.blue)
        rect(0, 0, this.width, this.height);
        pop();
      }
}
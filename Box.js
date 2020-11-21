class Box{
    constructor(x, y, w, h, death = true) {
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
        this.blue = random(0, 255);
        this.tick = 0;
        this.time = 60;
        this.Visibility = 255;
        this.death = death;
        this.weight = 5;
        this.exist = true;
        World.add(world, this.body);
    }
    display(){
      this.time -= 1;
      if (this.time < 0) {
        if (this.body.speed < 4) {
            var angle = this.body.angle;
        
            push();
            translate(this.body.position.x, this.body.position.y);
            rotate(angle);
            rectMode(CENTER);
            fill(this.red, this.green, this.blue);
            strokeWeight(5);
            rect(0, 0, this.width, this.height);
            pop();
        }
        else {
          if (this.death == true) {
            push();
            this.weight -= 0;
            World.remove(world, this.body);
            this.tick = 1;
            fill(this.red, this.green, this.blue, this.Visibility);
            strokeWeight(0);
            rect(this.body.position.x, this.body.position.y, this.width, this.height);
            this.exist = false;
            pop();
          }
        }
        if (this.tick == 1) {
          this.Visibility -= 5;
        }
        if (this.Visibility < 50 && this.Visibility > 0) {
          score += 1;
        }

      }
      else{
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
}
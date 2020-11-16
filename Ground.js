class Ground {
    constructor(x,y,width,height) {
      var options = {
          isStatic: true
      }
      this.body = Bodies.rectangle(x,y,width,height,options);
      this.width = width;
      this.height = height;
      this.exist = true;
      World.add(world, this.body);
    }
    display(){
      var pos =this.body.position;
      rectMode(CENTER);
      fill(165, 42, 42);
      if (this.exist == true) {
        rect(pos.x, pos.y, this.width, this.height);
      }
    }
    destroy() {
      this.exist = false;
      World.remove(world, this.body)
    }
  };
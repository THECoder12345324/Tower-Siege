class Slingshot{
    constructor(body1, point2, stiffness1, length1) {
        var options = {
            bodyA: body1,
            pointB: point2,
            stiffness: stiffness1,
            length: length1
        }
        this.pointB = point2
        this.body1 = body1
        this.chain = Constraint.create(options);
        this.move = true;
        World.add(world, this.chain);
    }
    display() {
        push();
        imageMode(CENTER);
        pop();
        if (this.chain.bodyA) {
            var pointA = this.chain.bodyA.position
            var pointB = this.pointB
            push();
            if (pointA.x < 200) {
                strokeWeight(7);
                line(pointA.x, pointA.y, pointB.x, pointB.y);
            }
            else if (pointA.x > 600) {
                strokeWeight(7);
                line(pointA.x, pointA.y, pointB.x, pointB.y);
            }
            else {
                strokeWeight(5);
                line(pointA.x, pointA.y, pointB.x, pointB.y);
            }
            pop();
            stroke(48, 22, 8);
            
            
            //line(pointA.x, pointA.y, pointB.x, pointB.y);

        }
    }
    fly() {
        this.chain.bodyA = null;
        this.move = false;
    }
    attach() {
        this.chain.bodyA = this.body1;
        this.move = true;
    }
}
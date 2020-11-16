class Pyramid{
    constructor(x, y, w, h) {
        this.box1 = new Box(x, y, w, h);
        this.box2 = new Box(x - w, y, w, h);
        this.box3 = new Box(x + w, y, w, h);
        this.box4 = new Box(x - (w * 2), y, w, h);
        this.box5 = new Box(x + (w * 2), y, w, h);

        //Second Layer
        this.box6 = new Box(x - (w / 2), y - h, w, h);
        this.box7 = new Box(x + (w / 2), y - h, w, h);
        this.box8 = new Box(x - (3 * (w / 2)), y - h, w, h);
        this.box9 = new Box(x + (3 * (w / 2)), y - h, w, h);

        //Third Layer
        this.box10 = new Box(x, y - (h * 2), w, h);
        this.box11 = new Box(x - w, y - (h * 2), w, h);
        this.box12 = new Box(x + w, y - (h * 2), w, h);

        //Fourth Layer
        this.box13 = new Box(x - (w / 2), y - (h * 3), w, h);
        this.box14 = new Box(x + (w / 2), y - (h * 3), w, h);

        //Top Layer
        this.box15 = new Box(x, y - (h * 4), w, h);

        this.executed = false;
    }
    display() {
        this.box1.display();
        this.box2.display();
        this.box3.display();
        this.box4.display();
        this.box5.display();

        //Display Second Layer
        this.box6.display();
        this.box7.display();
        this.box8.display();
        this.box9.display();

        //Display Third Layer
        this.box10.display();
        this.box11.display();
        this.box12.display();

        //Display Fourth Layer
        this.box13.display();
        this.box14.display();

        //Display Top Layer
        this.box15.display();
    }
    destroyed() {
        if (!this.executed) {
            
            if (this.box1.exist == false && this.box2.exist == false && 
                this.box3.exist == false && this.box4.exist == false &&
                this.box5.exist == false && this.box6.exist == false &&
                this.box7.exist == false && this.box8.exist == false && 
                this.box9.exist == false && this.box10.exist == false && 
                this.box11.exist == false && this.box12.exist == false && 
                this.box13.exist == false && this.box14.exist == false &&
                this.box15.exist == false) {
                    this.executed = true;
                    return true;
                    
            }
            return false;
        }
    }
}
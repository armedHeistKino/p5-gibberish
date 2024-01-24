var beziershape = null;
var polygon = null;

/*
    50 px == 1 m
     1 px == 1/50 m
 */

function setup() {
    createCanvas(600, 600);
    /*    
    beziershape = new BezierPolygon(
        new Point(300, 300),
        // new Point(450, 300),
        new Point(400, 400),
        new Point(300, 450),
        new Point(250, 400)
    );
    beziershape.set_color(palette['light_green']);

    polygon = new BezierPolygon(
        new Point(100, 100),
        new Point(320, 150),
        new Point(270, 200),
        new Point(200, 170),
        new Point(150, 130)
    );
    polygon.set_color(palette['light_aquamarine']);
    */

    var a = 100;

    polygon = new Polygonal(12, 
        new Point(2*a/2*Math.cos(Math.PI/3), 0),
        new Point(-a/2*Math.cos(Math.PI/3), a/2*Math.sin(Math.PI/3)),
        new Point(-a/2*Math.cos(Math.PI/3), -a/2*Math.sin(Math.PI/3))
    );
    polygon.set_color(palette['light_aquamarine']);

}

function draw() {
    background(220);
    polygon.linear.x = 300;
    polygon.linear.y = 300;
    polygon.display();
}

setup();
draw();
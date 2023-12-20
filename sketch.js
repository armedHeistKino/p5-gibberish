var beziershape = null;

function setup() {
    createCanvas(600, 600);
    
    beziershape = new BezierPolygon(
        new Point(300, 300),
        // new Point(450, 300),
        new Point(400, 400),
        new Point(300, 450),
        new Point(250, 400)
    );
}

function draw() {
    background(220);
    beziershape.display();
}

setup();
draw();
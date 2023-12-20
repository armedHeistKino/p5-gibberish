class Point {
    constructor(x, y) {
        console.assert(typeof(x) == "number", "parameter 'x' must be a number");
        console.assert(typeof(y) == "number", "parameter 'y' must be a number");
        this.x = x;
        this.y = y;
    }
}

function sum_point(a, b) {
    console.assert(a instanceof Point, "parameter 'a' must be a 'Point'");
    console.assert(b instanceof Point, "parameter 'b' must be a 'Point'");

    return new Point(a.x + b.x, a.y + b.y);
}

function mult_point(a, k) {
    console.assert(a instanceof Point, "parameter 'a' must be a 'Point'");
    console.assert(typeof(k) == "number", "parameter 'k' must be a 'number'");

    return new Point(a.x * k, a.y * k);
}

function mid_point(a, b) {
    console.assert(a instanceof Point, "parameter 'a' must be a 'Point'");
    console.assert(b instanceof Point, "parameter 'b' must be a 'Point'");

    return new Point((a.x + b.x) * 0.5, (a.y + b.y) * 0.5);
}
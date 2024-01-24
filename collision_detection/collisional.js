class vector {
    constuctor(x, y) {
        console.assert(typeof(x) == "number");
        console.aasert(typeof(x) == "number");

        this.x = x;
        this.y = y;
    }

    add(other) {
        console.assert(other instanceof vector); 
        return new vector(this.x + other.x, this.y + other.y);
    }
    sub(other) {
        console.assert(other instanceof vector);
        return new vector(other.x - this.x, other.y - this.y);
    }
    prod(k) {
        console.assert(typeof(k) == "number");
        return new vector(this.x * k, this.y * k);
    }
    normalize() {
        let mag = Math.sqrt(this.x * this.x + this.y * this.y);
        return new vector(this.x / mag, this.y / mag); 
    }
}

function get_axis(p1, p2) {
    console.assert(p1 instanceof Point);
    console.assert(p2 instanceof Point);

    return new vector(p1.y - p2.y, p2.x - p1.x);
}

function dot_mult(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
}

function SAT(a, b) {
    console.assert(a instanceof Polygon);
    console.assert(b instanceof Polygon);
    
    a.points.forEach((p, i, arr) => {
        var np = arr[(i+1) % arr.length];
        var axis = get_axis(p, np);
        

    }); 
}
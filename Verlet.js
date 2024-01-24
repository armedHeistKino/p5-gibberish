class VerletCoordinate2D {
    constructor(x, y, inertia) {
        console.assert(typeof(x) == "number");
        console.assert(typeof(y) == "number");
        
        // post coordinate
        this.prex = x;
        this.prey = y;
        
        // current coordinate
        this.x = x;
        this.y = y;

        this.inertia = inertia;

        this.netforcex = 0.0;
        this.netforcey = 0.0;
    }

    apply_force(forcex, forcey, intensity = 1) {
        this.netforcex += forcex * this.inertia ** intensity;
        this.netforcey += forcey * this.inertia ** intensity;
    }

    update(dt) {
        var motionx = this.netforcex / this.inertia;
        var motiony = this.netforcey / this.inertia;

        var postx = 2*this.x - this.prex + motionx * dt * dt;
        var posty = 2*this.y - this.prey + motiony * dt * dt;

        // swap and update
        this.prex = this.x;
        this.prey = this.y;
        this.x = postx;
        this.y = posty;

        this.netforcex = 0;
        this.netforcey = 0;
    };

    to_string() {
        return format("({0}, {1})", this.x, this.y);
    }
}

class VerletBody2D {
    constructor(
        mass,
        momentOfInertia
    ) {
        this.linear = new VerletCoordinate2D(0.0, 0.0, mass);
        this.angular = new VerletCoordinate2D(0.0, 0.0, momentOfInertia);

        // We use x-axis variable as a z value in angular coordinate. 
    }

    apply_force(forcex, forcey, intensity = 1) {
        this.linear.apply_force(forcex, forcey, intensity);
    }

    // We assume that force and contact point both are origin-oriented. 
    apply_torque(forcex, forcey, contactx, contacty) {
        var torque = contactx * forcey - contacty * forcex;
        this.angular.apply_torque(torque, 0);
    }

    update(dt) {
        this.linear.update(dt);
        
        this.angular += this.netorque;
        this.netorque = 0;
    }
}

class Polygonal extends VerletBody2D {
    constructor(
        mass, 
        ...points
    ) {
        console.assert(Array.isArray(points), "parameter 'point' must be an array");
        console.assert(points.filter((p) => !(p instanceof Point)).length == 0, "parameter 'point' must include only 'Point' class");
        console.assert(points.length >= 3, "parameter 'point' must at least have 3 elements");

        /*
            m SUM(|cross_prod(Pn+1, Pn)|*(inner_prod(Pn+1, Pn+1) + inner_prod(Pn, Pn+1) + inner_prod(Pn, Pn)))
            - ----------------
            6  SUM(|cross_prod(Pn+1, Pn)|)
         */
            // Calculate centroid
        /*
        var centroidx = 0.0;
        var centroidy = 0.0;

        points.forEach((p) => {
            centroidx += p.x;
            centroidy += p.y;
        });
        
        centroidx /= points.length;
        centroidy /= points.length;

        for (var i = 0; i < points.length; i++) {
            points[i].x -= centroidx;
            points[i].y -= centroidy;
        }
        */

            // Calculate moment of inertia
        var fract_over = 0.0;
        var fract_under = 0.0;
        
        for (var i = 0; i < points.length-1; i++) {
            var p = points[i];
            var s = points[i+1];

            var oprod = (a, b) => { return a.x*b.y - a.y*b.x; }
            var iprod = (a, b) => { return a.x*b.x + a.y*b.y; }

            var oprod_res = oprod(s,p);

            var cross_prod = Math.sqrt(oprod_res * oprod_res)
            var inner_prod = iprod(p, p) + iprod(p, s) + iprod(s, s); 

            fract_over += cross_prod * inner_prod; 
            fract_under += cross_prod;
        }

        super(mass, (fract_over * mass) / (6*fract_under));

        this.points = points;

        this.border = "rgb(127, 127, 127)"
        this.filler = "rgb(242, 242, 242)"

        console.log(this.angular.inertia);
        console.log(1/12 * mass * 100*100);
    }

    set_color(config) {
        console.assert(config instanceof ShapeColor, "parameter 'config' must be a 'ShapeColor' class");
        this.border = config.border.parse();
        this.filler = config.filler.parse();
    }

    display() {
        stroke(this.border);
        fill(this.filler);
        strokeWeight(1);
        beginShape();

        var tx = this.linear.x;
        var ty = this.linear.y;

        this.points.forEach((p) => {
            vertex(tx + p.x, ty + p.y);
        });
        endShape(CLOSE);
    }

    display_points() {
        stroke(this.border);
        strokeWeight(3);
        this.points.forEach((p) => point(p.x, p.y));
    }

    display_text() {
        stroke(this.border);
        fill(this.filler);
        strokeWeight(1);
        this.points.forEach((p, i) => {
            text(i, p.x, p.y);
        });
    }
}

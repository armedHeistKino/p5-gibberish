class Polygon {
    constructor(...points) {
        console.assert(Array.isArray(points), "parameter 'point' must be an array");
        console.assert(points.filter((p) => !(p instanceof Point)).length == 0, "parameter 'point' must include only 'Point' class");
        console.assert(points.length >= 3, "parameter 'point' must at least have 3 elements");
        
        // 모든 원소가 Point 형이며, 
        // 세 개 이상 (다각형의 최소 정의 점)의 Point를 가진
        // 배열
        this.points = points;

        this.border = "rgb(127, 127, 127)"
        this.filler = "rgb(242, 242, 242)"
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
        this.points.forEach((p) => {
            vertex(p.x, p.y);
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
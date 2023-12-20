/*
    주어진 점을 순서대로 
*/

class BezierPolygon {
    constructor(...points) {
        console.assert(Array.isArray(points), "parameter 'point' must be an array");
        console.assert(points.filter((p) => !(p instanceof Point)).length == 0, "parameter 'point' must include only 'Point' class");
        console.assert(points.length >= 3, "parameter 'point' must at least have 3 elements");
        
        // 모든 원소가 Point 형이며, 
        // 세 개 이상 (다각형의 최소 정의 점)의 Point를 가진
        // 배열
        this.points = points;
        this.fixed_points = [];

        // get control_points for every pair of points
        this.points.forEach((point, i, arr) => {
            var next_point = arr[(i+1) % arr.length];
            this.fixed_points.push(mid_point(point, next_point));
        });
    }
    
    display() {
        this.points.forEach((p, i) => {
            stroke(32, 78, 207);
            fill(200, 233, 251);
            strokeWeight(1);
        })

        stroke(255, 101, 101);
        strokeWeight(1);
        fill(255, 201, 201);
        this.fixed_points.forEach((p, i) => {
            var np = this.fixed_points[(i+1) % this.fixed_points.length];
            var cp = this.points[(i+1) % this.points.length];

            bezier(
                p.x, p.y,
                cp.x, cp.y,
                cp.x, cp.y,
                np.x, np.y
            )
        });

        noStroke();
        fill(255, 201, 201);
        beginShape();
        this.fixed_points.forEach((p) => {
            vertex(p.x, p.y);
        });
        endShape(CLOSE);
    }

    fixed_point() {
        stroke(255, 101, 101);
        strokeWeight(3);
        this.fixed_points.forEach((p) => point(p.x, p.y));
    }

    control_points() {
        stroke(32, 78, 207);
        strokeWeight(3);
        this.points.forEach((p) => point(p.x, p.y));
    }

    display_text() {
        stroke(32, 78, 207);
        fill(200, 233, 251);
        strokeWeight(1);
        this.points.forEach((p, i) => {
            text(i, p.x, p.y);
        });

        stroke(255, 101, 101);
        strokeWeight(1);
        fill(255, 201, 201);
        this.fixed_points.forEach((p, i) => {
            text(i, p.x, p.y);
        });
    }
}
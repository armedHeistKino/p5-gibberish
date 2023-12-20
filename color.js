class Color {
    constructor(r, g, b) {
        console.assert(typeof(r) == "number", "parameter 'r' must be a number");
        console.assert(typeof(g) == "number", "parameter 'g' must be a number");
        console.assert(typeof(b) == "number", "parameter 'b' must be a number");

        console.assert(is_valid_byte(r), "parameter 'r' must be between 0 and 255");
        console.assert(is_valid_byte(g), "parameter 'g' must be between 0 and 255");
        console.assert(is_valid_byte(b), "parameter 'b' must be between 0 and 255");

        this.r = r;
        this.g = g;
        this.b = b;
    }

    parse() {
        return format("rgb({0}, {1}, {2})", this.r, this.g, this.b);
    }
}

function is_valid_byte(number) {
    return 0 <= number && number < 256;
}

class ShapeColor {
    constructor(border, filler) {
        console.assert(border instanceof Color, "");
        console.assert(filler instanceof Color, "");

        this.border = border;
        this.filler = filler;
    }

    get_border() {
        return this.border.parse();
    }

    get_filler() {
        return this.filler.parse();
    }
}

let palette = {};
palette['light_red'] = new ShapeColor(
    new Color(255, 101, 101),
    new Color(255, 201, 201)
); 

palette['light_aquamarine'] = new ShapeColor(
    new Color(50, 214, 155),
    new Color(191, 242, 224)
); 
palette['light_blue'] = new ShapeColor(
    new Color(32, 78, 207),
    new Color(200, 233, 251)
); 
palette['light_purple'] = new ShapeColor(
    new Color(168, 64, 232),
    new Color(230, 210, 242)
); 
palette['light_grey'] = new ShapeColor(
    new Color(127, 127, 127),
    new Color(242, 242, 242)
); 
palette['yellow'] = new ShapeColor(
    new Color(255, 217, 102),
    new Color(255, 242, 204)
); 
palette['light_orange'] = new ShapeColor(
    new Color(244, 177, 131),
    new Color(251, 229, 214)
); 
palette['light_green'] = new ShapeColor(
    new Color(169, 209, 142),
    new Color(226, 240, 217)
); 
palette['dark_blue'] = new ShapeColor(
    new Color(131, 152, 176),
    new Color(214, 220, 219)
); 
palette['dark_grey'] = new ShapeColor(
    new Color(64, 64, 64),
    new Color(127, 127, 127)
);
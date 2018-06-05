class Point {
    constructor(x, y, rad) {
        this.X = x;
        this.Y = y;
        this.angle = rad;
    }
    
    subtract(p) {
        return new Point(this.X - p.X, this.Y - p.Y);
    }
    
    add(p) {
        return new Point(this.X + p.X, this.Y + p.Y);
    }
}

export default Point;
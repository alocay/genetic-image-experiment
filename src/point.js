class Point {
    constructor(x, y) {
        this.X = x;
        this.Y = y;
    }
    
    subtract(p) {
        return new Point(this.X - p.X, this.Y - p.Y);
    }
    
    add(p) {
        return new Point(this.X + p.X, this.Y + p.Y);
    }
}

export default Point;
'use strict'
 
class Polygon {
    constructor(canvasWidth, canvasHeight) {
        this.vertices = [];
        this.color = [];
        this.center = center;
        this.numOfSides = Helpers.GetRandomIntFromInterval(3, 10);
        this.radius = new Point(canvasWidth / 2, canvasHeight / 2);
    }
    
    _randomize() {
        this._generateVertices();
        this.color[0] = Helpers.GetRandomFromInterval(0, 255);
        this.color[1] = Helpers.GetRandomFromInterval(0, 255);
        this.color[2] = Helpers.GetRandomFromInterval(0, 255);
        this.color[3] = Helpers.GetRandomFromInterval(0, 1);
    }
    
    _generateVertices() {
        const TwoPI = Math.PI * 2;
        let angles = [];        
        let points = [];
        
        for(var i = 0; i < this.numOfSides; i++) {
            angles.push(Helpers.GetRandomFromInterval(0, TwoPI));
        }
        
        angles.sort();
        
        for (var i = 0; i < this.numOfSides; i++) {
            const x = this.center.X + (this.radius.X * Math.cos(angles[i]));
            const y = this.center.Y + (this.radius.Y * Math.sin(angles[i]));

            this.vertices.push(new Point(x, y));
        }
    }
    
    _getBoundingBox() {
        let minX = Number.MAX_VALUE;
        let minY = Number.MAX_VALUE;
        let maxX = Number.MIN_VALUE;
        let maxY = Number.MIN_VALUE;
        
        for (var i = 0; i < this.vertices.length; i+=2) {
            minX = Math.min(minX, this.vertices[i].X);
            maxX = Math.max(maxX, this.vertices[i].X);
            minY = Math.min(minY, this.vertices[i].Y);
            maxY = Math.max(maxY, this.vertices[i].Y);
        }
        
        const width = Math.ceil(maxX) - Math.ceil(minX);
        const height = Math.ceil(maxY) - Math.ceil(minY);
        return [new Point(minX, minY), Math.max(width, MinBoundingBoxDimension), Math.max(height, MinBoundingBoxDimension)];
    }
}
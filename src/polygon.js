import Point from './Point.js'
import Helpers from './helpers.js'

const MinRadius = 25;

class Polygon {
    constructor(numOfSides, maxWidth, maxHeight) {
        this.vertices = [];
        this.boundingBox = [];
        this.numOfSides = numOfSides;
        this.radius = new Point(Helpers.RandomNumber(MinRadius, (maxWidth / 2)), Helpers.RandomNumber(MinRadius, (maxHeight / 2));
        this.center = new Point(0, 0);
        
        this._randomize();
    }
    
    mutate() {
    }
    
    _randomize() {
        this.vertices = this._createRandomVertices();
        this.boundingBox = this._getBoundingBox();
    }
    
    _createRandomVertices() {
        const TwoPI = Math.PI * 2;
        let angles = [];
        let verts = [];
        
        for (var i = 0; i < this.numOfSides; i++) {
            angles.push(Helpers.RandomNumber(0, TwoPI));
        }
        
        angles.sort();
        
        for(var i =0; i < angles.length; i++) {
            const x = this.center.X + (this.radius.X * Math.cos(angles[i]));
            const y = this.center.Y + (this.radius.Y * Math.sin(angles[i]));
            
            verts.push(new Point(x, y));
        }
        
        return verts;
    }
    
    _getBoundingBox() {
        let xMin = Number.MAX_VALUE;
        let xMax = Number.MIN_VALUE;
        let yMin = Number.MAX_VALUE;
        let yMax = Number.MIN_VALUE;
        
        for(var i =0; i < this.vertices.length; i++) {
            const p = this.vertices[i];
            
            xMin = Math.min(p.X, xMin);
            xMax = Math.max(p.X, xMax);
            yMin = Math.min(p.Y, yMin);
            yMax = Math.max(p.Y, yMax);
        }
        
        const width = xMax - xMin;
        const height = yMax - yMin;
        
        return [new Point(xMin, yMin), width, height];
    }
}
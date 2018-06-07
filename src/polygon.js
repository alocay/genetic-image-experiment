import Point from './point.js'
import Helpers from './helpers.js'

const MinRadius = 5;
const ColorMutationChance = 0.15;
const AlphaMutationChance = 0.2; 
const VertexMutationChance = 0.8;
const AddVertexChance = 1;
const RemoveVertexChance = 1;
//const PolyMoveChance = 0.7;

const RedMutationChance = 0.33; 
const GreenMutationChance = 0.66;
const VerticesMutationStep = 5;
const ColorMutationStep = 5;
const AlphaMutationStep = 0.1;
const MaxColor = 255;
const MaxAlpha = 1;

class Polygon {
    constructor(options) {
        this.maxWidth = options.maxWidth;
        this.maxHeight = options.maxHeight;
        
        if (options.vertices) {
            this.vertices = options.vertices;
            this.color = options.color;
            this.center = options.center;
            this.radius = options.radius;
        } else {
            this.vertices = [];
            this.color = [];
            this.boundingBox = [];
            this.numOfSides = options.numOfSides;
            this.radius = new Point(Helpers.RandomNumber(MinRadius, (this.maxWidth / 2)), Helpers.RandomNumber(MinRadius, (this.maxHeight / 2)));
            this.center = this._getRandomCenterPoint(this.maxWidth, this.maxHeight);
        
            this._randomize();
        }
    }
    
	getFillStyle() {
		return 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ',' + this.color[3] + ')';
	}
	
    tryMutate() {
        const chance = Math.random();
        
        if (chance < ColorMutationChance) {
            const cr = Math.random();
            if (cr < RedMutationChance) {
                this.changeColor(0);
            } else if (cr < GreenMutationChance) {
                this.changeColor(1);
            } else {
                this.changeColor(2);
            }
        } else if (chance < AlphaMutationChance) {
            this.changeAlpha();
        } else if (chance < VertexMutationChance) {
            this.moveRandomVertex(Math.random() < 0.5);
        } 
        
        /*else if (chance < AddVertexChance) {
            this.addRandomVertex();
        } else if (chance < RemoveVertexChance) {
            this.removeRandomVertex();
        }*/
    }
    
    changeColor(index) {
        this.color[index] += Math.random() < 0.5 ? ColorMutationStep : -ColorMutationStep;
        this.color[index] = Helpers.Clamp(this.color[index], 0, 255);
    }
    
    changeAlpha() {
        this.color[3] += Math.random() < 0.5 ? AlphaMutationStep : -AlphaMutationStep;
        this.color[3] = Helpers.Clamp(this.color[3], 0, 1);
    }
    
    moveRandomVertex(moveX) {
        const index = Helpers.RandomInteger(0, this.vertices.length - 1);
        this.moveVertex(index, moveX);
    }
    
    moveVertex(index, moveX) {
        if (moveX) {
            this.vertices[index].X += Math.random() < 0.5  ? VerticesMutationStep : -VerticesMutationStep;
            this.vertices[index].X = Helpers.Clamp(this.vertices[index].X, 0, this.maxWidth);
        } else {
            this.vertices[index].Y += Math.random() < 0.5  ? VerticesMutationStep : -VerticesMutationStep;
            this.vertices[index].Y = Helpers.Clamp(this.vertices[index].Y, 0, this.maxHeight);
        }
    }
    
    addRandomVertex() {
        const angle = Helpers.RandomNumber(0, (2 * Math.PI));
        const x = this.center.X + (this.radius.X * Math.cos(angle));
        const y = this.center.Y + (this.radius.Y * Math.sin(angle));
        this.addVertex(new Point(x, y, angle));
    }
    
    addVertex(point) {
        if (point.angle === null || point.angle === undefined) {
            point.angle = Math.acos((point.X - this.center.X) / this.radius.X);
        }
        
        this.vertices.push(point);
        this.vertices.sort(this._compareAngles);
    }
    
    removeRandomVertex() {
        this.removeVertex(Helpers.RandomInteger(0, this.vertices.length - 1));
    }
    
    removeVertex(index) {
        if (this.vertices.length > 3) {
            this.vertices = this.vertices.splice(index, 1);
        }
    }
    
    clone() {
        let options = {
            maxWidth: this.maxWidth,
            maxHeight: this.maxHeight,
            color: this.color.slice(0),
            center: new Point(this.center.X, this.center.Y),
            radius: new Point(this.radius.X, this.radius.Y),
            vertices: []
        };
            
        for (var i = 0; i < this.vertices.length; i++) {
            const v = this.vertices[i]
            options.vertices.push(new Point(v.X, v.Y, v.angle))
        }
        
        return new Polygon(options);
    }
    
    _randomize() {
        this.vertices = this._createRandomVertices();
		this.color = this._createStartingColor(100);
        this.boundingBox = this._getBoundingBox();
    }
    
    _getRandomCenterPoint(width, height) {
        const minx = 0 + this.radius.X;
        const maxx = width - this.radius.X;
        const miny = 0 + this.radius.Y;
        const maxy = height - this.radius.Y;
        const x = Helpers.RandomNumber(minx, maxx);
        const y = Helpers.RandomNumber(miny, maxy);        
        
        return new Point(x, y);
    }
    
    _createStartingColor(co) {
        let c = [];
        c[0] = 255;
        c[1] = 0;
        c[2] = 0;
        c[3] = Helpers.RandomNumber(0.5, 0.5);
        return c;
    }
    
	_createRandomColor() {
        let c = [];
		c[0] = Helpers.RandomInteger(0, 255);
        c[1] = Helpers.RandomInteger(0, 255);
        c[2] = Helpers.RandomInteger(0, 255);
        c[3] = Helpers.RandomNumber(0, 1);
        return c;
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
            
            verts.push(new Point(x, y, angles[i]));
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
    
    _compareAngles(a, b) {
        return a.angle - b.angle;
    }
}

export default Polygon;
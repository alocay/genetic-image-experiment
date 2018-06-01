import Point from './point.js'
import Helpers from './helpers.js'

const MinRadius = 25;
const MutationChance = 0.05; //0.07
const VerticesMutationStep = 1; //5
const ColorMutationStep = 5; //15
const AlphaMutationStep = 0.1; //0.3
const MaxColor = 255;
const MaxAlpha = 1;

class Polygon {
    constructor(numOfSides, maxWidth, maxHeight) {
        this.vertices = [];
		this.color = [];
        this.boundingBox = [];
        this.numOfSides = numOfSides;
        this.radius = new Point(Helpers.RandomNumber(MinRadius, (maxWidth / 2)), Helpers.RandomNumber(MinRadius, (maxHeight / 2)));
        this.center = this._getRandomCenterPoint(maxWidth, maxHeight);
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        
        this._randomize();
    }
    
	getFillStyle() {
		return 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ',' + this.color[3] + ')';
	}
	
    tryMutate() {
		for(var i = 0; i < this.vertices.length; i++) {
            if (Math.random() < MutationChance) {
				if (Math.random() < 0.5) {
					this.vertices[i].X += Math.random() < 0.5 ? VerticesMutationStep : -VerticesMutationStep;
                    this.vertices[i].X = Helpers.Clamp(this.vertices[i].X, MinRadius, this.maxWidth);
				} else {
					this.vertices[i].Y += Math.random() < 0.5 ? VerticesMutationStep : -VerticesMutationStep;
                    this.vertices[i].Y = Helpers.Clamp(this.vertices[i].Y, MinRadius, this.maxHeight);
				}
			}
        }
		
		for (var i = 0; i < this.color.length - 1; i++) {
			if (Math.random() < MutationChance) {
				this.color[i] += Math.random() < 0.5 ? ColorMutationStep : -ColorMutationStep;
                this.color[i] = Helpers.Clamp(this.color[i], 0, 255);
			}
		}
		
		if (Math.random() < MutationChance) {
			this.color[3] += Math.random() < 0.5 ? AlphaMutationStep : -AlphaMutationStep;
            this.color[3] = Helpers.Clamp(this.color[3], 0, 1);
		}
    }
    
    _randomize() {
        this.vertices = this._createRandomVertices();
		this.color = this._createRandomColor(100);
        this.boundingBox = this._getBoundingBox();
    }
    
    _getRandomCenterPoint(width, height) {
        const center = new Point(width/2, height/2);
        const minx = 0 + this.radius.X;
        const maxx = width - this.radius.X;
        const miny = 0 + this.radius.Y;
        const maxy = height - this.radius.Y;
        const x = Helpers.RandomInteger(minx, maxx);
        const y = Helpers.RandomInteger(miny, maxy);        
        
        return new Point(x, y);
    }
    
    _createRandomColor(co) {
        let c = [];
        c[0] = co;
        c[1] = co;
        c[2] = co;
        c[3] = Helpers.RandomNumber(0.5, 0.5);
        return c;
    }
    
	_createRandomColor2() {
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

export default Polygon;
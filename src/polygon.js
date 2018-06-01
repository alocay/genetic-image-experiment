import Point from './Point.js'
import Helpers from './helpers.js'

const MinRadius = 25;
const MutationChance = 0.07;
const VerticesMutationStep = 5;
const ColorMutationStep = 15;
const AlphaMutationStep = 0.3;

class Polygon {
    constructor(numOfSides, maxWidth, maxHeight) {
        this.vertices = [];
		this.color = [];
        this.boundingBox = [];
        this.numOfSides = numOfSides;
        this.radius = new Point(Helpers.RandomNumber(MinRadius, (maxWidth / 2)), Helpers.RandomNumber(MinRadius, (maxHeight / 2));
        this.center = new Point(0, 0);
        
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
				} else {
					this.vertices[i].Y += Math.random() < 0.5 ? VerticesMutationStep : -VerticesMutationStep;
				}
			}
        }
		
		for (var i = 0; i < this.color.length - 1; i++) {
			if (Math.random() < MutationChance) {
				this.color[i] += Math.random() < 0.5 ? ColorMutationStep : -ColorMutationStep;
			}
		}
		
		if (Math.random() < MutationChance) {
			this.color[3] += Math.random() < 0.5 ? AlphaMutationStep : -AlphaMutationStep;
		}
    }
    
    _randomize() {
        this.vertices = this._createRandomVertices();
		this.color = this._createRandomColor();
        this.boundingBox = this._getBoundingBox();
    }
    
	_createRandomColor() {
		this.color[0] = Helpers.RandomInteger(0, 255);
        this.color[1] = Helpers.RandomInteger(0, 255);
        this.color[2] = Helpers.RandomInteger(0, 255);
        this.color[3] = Helpers.RandomNumber(0, 1);
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
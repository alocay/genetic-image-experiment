import Point from './point.js'
import Helpers from './helpers.js'
import Config from './config.js';


const MinRadius = 5;
/*const ColorMutationChance = 0.15;
const AlphaMutationChance = 0.2; 
const VertexMutationChance = 0.8;
const AddVertexChance = 1;
const RemoveVertexChance = 1;

const RedMutationChance = 0.33; 
const GreenMutationChance = 0.66;
const VerticesMutationStep = 5;
const ColorMutationStep = 5;
const AlphaMutationStep = 0.1;
const MaxColor = 255;
const MaxAlpha = 1;*/

class Polygon {
    constructor(options) {        
        if (options.vertices) {
            this.vertices = options.vertices;
            this.color = options.color;
            this.center = options.center;
            this.radius = options.radius;
        } else {
            this.vertices = [];
            this.color = [];
            this.boundingBox = [];
            this.radius = new Point(Helpers.RandomNumber(MinRadius, (Config.Width / 2)), Helpers.RandomNumber(MinRadius, (Config.Height / 2)));
            this.center = this._getRandomCenterPoint(Config.Width, Config.Height);
        
            this._randomize();
        }
    }
    
	getFillStyle() {
		return 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ',' + this.color[3] + ')';
	}
	
    tryMutate() {
        const chance = Math.random();
        const typeProbs = this._createMutationTypeProbabilityBuckets();
        
        if (chance < typeProbs[0].prob) {
            typeProbs[0].action();            
        } else if (chance < typeProbs[1].prob) {
            typeProbs[1].action();
        } else if (chance < typeProbs[2].prob) {
            typeProbs[2].action();
        }
        
        /*
        if (chance < Config.ColorMutationChance) {
            const cr = Math.random();
            if (cr < Config.RedMutationChance) {
                this.changeColor(0);
            } else if (cr < Config.GreenMutationChance) {
                this.changeColor(1);
            } else {
                this.changeColor(2);
            }
        } else if (chance < Config.AlphaMutationChance) {
            this.changeAlpha();
        } else if (chance < Config.VertexMutationChance) {
            this.moveRandomVertex(Math.random() < 0.5);
        } else if (
        
        if (Config.VertexMutationChance) {            
            if (Config.AddVertexChance < Config.RemoveVertexChance) {
                if (chance < Config.AddVertexChance) {
                    this.addRandomVertex();
                } else if (chance < Config.RemoveVertexChance) {
                    this.removeRandomVertex();
                }
            } else if Config.RemoveVertexChance < Config.AddVertexChance) {
                if (chance < Config.RemoveVertexChance) {
                    this.removeRandomVertex();
                } else if (chance < Config.AddVertexChance) {
                    this.addRandomVertex();
                }
            } else if (Config.RemoveVertexChance === Config.AddVertexChance) {
                if (chance < Config.RemoveVertexChance) {
                    if (Math.random() < 0.5) {
                        this.addRandomVertex();
                    } else {
                        this.removeRandomVertex();
                    }
                }
            }
        }*/
        
        /*else if (chance < Config.AddVertexChance) {
            this.addRandomVertex();
        } else if (chance < Config.RemoveVertexChance) {
            this.removeRandomVertex();
        }*/
    }
    
    changeColor(index) {
        this.color[index] += Math.random() < 0.5 ? Config.ColorMutationStep : -Config.ColorMutationStep;
        this.color[index] = Helpers.Clamp(this.color[index], 0, 255);
    }
    
    changeAlpha() {
        this.color[3] += Math.random() < 0.5 ? Config.AlphaMutationStep : -Config.AlphaMutationStep;
        this.color[3] = Helpers.Clamp(this.color[3], 0, 1);
    }
    
    moveRandomVertex(moveX) {
        const index = Helpers.RandomInteger(0, this.vertices.length - 1);
        this.moveVertex(index, moveX);
    }
    
    moveVertex(index, moveX) {
        if (moveX) {
            this.vertices[index].X += Math.random() < 0.5  ? Config.VertexMutationStep : -Config.VertexMutationStep;
            this.vertices[index].X = Helpers.Clamp(this.vertices[index].X, 0, Config.Width);
        } else {
            this.vertices[index].Y += Math.random() < 0.5  ? Config.VertexMutationStep : -Config.VertexMutationStep;
            this.vertices[index].Y = Helpers.Clamp(this.vertices[index].Y, 0, Config.Height);
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
            width: Config.width,
            height: Config.height,
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
        
        console.log('colors', Config.UseRandomColors);
        
        if (Config.UseRandomColors) {
            this.color = this._createRandomColor();
        } else {
            this.color = Config.StartingColor;
        }
        
        this.boundingBox = this._getBoundingBox();
    }
    
    _getRandomCenterPoint() {
        const minx = 0 + this.radius.X;
        const maxx = Config.Width - this.radius.X;
        const miny = 0 + this.radius.Y;
        const maxy = Config.Height - this.radius.Y;
        const x = Helpers.RandomNumber(minx, maxx);
        const y = Helpers.RandomNumber(miny, maxy);        
        
        return new Point(x, y);
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
        
        for (var i = 0; i < Config.InitialNumOfSides; i++) {
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
    
    _mutateColor() {
        const cr = Math.random();
        const colorProbs = this._createColorProbabilityBuckets();
        
        if (cr < colorProbs[0].prob) {
            colorProbs[0].action(colorProbs[0].arg);
        } else if (cr < colorProbs[1].prob) {
            colorProbs[1].action(colorProbs[1].arg);
        } else if (cr < colorProbs[2].prob) {
            colorProbs[2].action(colorProbs[2].arg);
        } else {
            colorProbs[3].action(colorProbs[3].arg);
        }
    }
    
    _mutateVertices() {
        this.moveRandomVertex(Math.random() < 0.5);
    }
    
    _addOrRemoveVertices(adding) {
        if (adding) {
            this.addRandomVertex();
        } else {
            this.removeRandomVertex();
        }
    }
    
    _createMutationTypeProbabilityBuckets() {
        let probs = [
            { prob: Config.ColorMutationChance, action: this._mutateColor.bind(this) },
            { prob: Config.VertexMutationChance, action: this._mutateVertices.bind(this) },
            { prob: Config.AddOrRemoveVertexChance, action: this._addOrRemoveVertices.bind(this) }
        ];
        
        probs = this._shuffle(probs);
        probs.sort((a, b) => a.prob - b.prob);
        
        return probs;
    }
    
    _createColorProbabilityBuckets() {
        let probs = [
            { prob: Config.RedMutationChance, action: this.changeColor.bind(this), arg: 0 },
            { prob: Config.GreenMutationChance, action: this.changeColor.bind(this), arg: 1 },
            { prob: Config.BlueMutationChance, action: this.changeColor.bind(this), arg: 2 },
            { prob: Config.AlphaMutationChance, action: this.changeColor.bind(this), arg: 3 }
        ];
          
        probs = this._shuffle(probs);  
        probs.sort((a, b) => a.prob - b.prob);
        
        return probs;
    }
    
    _createAddOrRemoveVertexProbabilityBuckets() {
        let probs = [
            { prob: Config.AddVertexChance, action: this._addOrRemoveVertices.bind(this), arg: true },
            { prob: Config.RemoveVertexChance, action: this._addOrRemoveVertices.bind(this), arg: false }
        ];
        
        probs = this._shuffle(probs);
        probs.sort((a, b) => a.prob - b.prob);
        
        return probs;
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
    
    _shuffle(a) {
        let j, x;
        for (var i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        
        return a;
    }
}

export default Polygon;
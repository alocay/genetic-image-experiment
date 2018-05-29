'use strict';

const DefaultNumOfSides = 6;
const MinRadius = 10;
const MinBoundingBoxDimension = 1;

class Genotype {
    constructor(options) {
        this.NumOfColorValues = 4;
        
        if (options.genotype) {
            const colorValueStartIndex = options.genotype.length - this.NumOfColorValues;
            this.points = options.genotype.slice(0, colorValueStartIndex);
            this.color = options.genotype.slice(colorValueStartIndex);
            this.numOfSides = this.points.length / 2;
            this.boundingBox = this._getBoundingBox();
            this.width = options.width;
            this.height = options.height;
        } else {
            this.numOfSides = options.numOfSides || DefaultNumOfSides;
            this.width = options.width;
            this.height = options.height;
            this.points = [];
            this.color = [];
            this.boundingBox = [];
            this.randomize();
        }
    }

    randomize() {
        this.points = this._computeSidePoints();
        this.boundingBox = this._getBoundingBox();

        this.color[0] = Helpers.GetRandomFromInterval(0, 255);
        this.color[1] = Helpers.GetRandomFromInterval(0, 255);
        this.color[2] = Helpers.GetRandomFromInterval(0, 255);
        this.color[3] = Helpers.GetRandomFromInterval(0, 1);
    }
    
    getGenotypeLength() {
        return (this.points.length + this.color.length);
    }
    
    getGenotype() {
        let genotype = [];
        genotype.push.apply(genotype, this.points);
        genotype.push.apply(genotype, this.color);
        return genotype;
    }

    getFillStyle() {
        return 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ',' + this.color[3] + ')';
    }

    _computeSidePoints() {
        const TwoPI = Math.PI * 2;
        const radiusX = Helpers.GetRandomFromInterval(MinRadius, this.width / 2);
        const radiusY = Helpers.GetRandomFromInterval(MinRadius, this.height / 2);
        const centerXLimit = this.width - (radiusX * 2);
        /*const centerYLimit = this.height - (radiusY * 2);
        const midX = this.width / 2;
        const midY = this.height / 2;
        const centerX = Helpers.GetRandomFromInterval((midX - centerXLimit), (midX + centerXLimit))
        const centerY = Helpers.GetRandomFromInterval((midY - centerYLimit), (midY + centerXLimit))*/
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        let angles = [];        
        let points = [];
        
        for(var i = 0; i < this.numOfSides; i++) {
            angles.push(Helpers.GetRandomFromInterval(0, TwoPI));
        }
        
        angles.sort();
        
        for (var i = 0; i < this.numOfSides; i++) {
            const x = centerX + (radiusX * Math.cos(angles[i]));
            const y = centerY + (radiusY * Math.sin(angles[i]));
            //angle = Math.min(TwoPI, Helpers.GetRandomFromInterval(angle, maxAngleLimit));

            points.push(x);
            points.push(y);
        }

        return points;
    }
    
    _getBoundingBox() {
        let minX = Number.MAX_VALUE;
        let minY = Number.MAX_VALUE;
        let maxX = Number.MIN_VALUE;
        let maxY = Number.MIN_VALUE;
        
        for (var i = 0; i < this.points.length; i+=2) {
            const x = this.points[i];
            const y = this.points[i+1];
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
        }
        
        const width = Math.ceil(maxX) - Math.ceil(minX);
        const height = Math.ceil(maxY) - Math.ceil(minY);
        return [minX, minY, Math.max(width, MinBoundingBoxDimension), Math.max(height, MinBoundingBoxDimension)];
    }
}
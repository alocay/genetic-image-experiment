'use strict' 

class Helpers {
	static Apply(ctx, polygon) {
        ctx.fillStyle = polygon.getFillStyle();
        ctx.beginPath();
        
        ctx.moveTo(polygon.vertices[0].X, polygon.vertices[0].Y);
        
        for(var i = 2; i < (polygon.vertices.length); i+=2) {
            ctx.lineTo(polygon.vertices[i].X, polygon.vertices[i].Y);
        }
        
        ctx.closePath();
        ctx.fill();
    }
    
    static Revert(ctx, previousImgData) {
        ctx.putImageData(previousImgData, 0, 0);
    }
    
    static ApplyPhenotype(ctx, phenotype) {
        ctx.clearRect(0, 0, phenotype.width, phenotype.height);
        
        for(var i = 0; i < phenotype.genotype.length; i++) {
			const p = phenotype.genotype[i];
			this.Apply(ctx, p);
		}
    }
    
    static ApplyAndCompare(goalCtx, workingCtx, phenotype) {
        const previousWorkingImageData = workingCtx.getImageData(0, 0, phenotype.width, phenotype.height);
        
		for(var i = 0; i < phenotype.genotype.length; i++) {
			const p = phenotype.genotype[i];
			this.Apply(workingCtx, p);
		}
        
        const subsetGoalImageData = goalCtx.getImageData(0, 0, phenotype.width, phenotype.height);
        const subsetWorkingImageData = workingCtx.getImageData(0, 0, phenotype.width, phenotype.height);
        
        let totalError = 0;
        for (var i = 0; i < subsetGoalImageData.data.length; i++) {
            const error = Math.abs(subsetGoalImageData.data[i] - subsetWorkingImageData.data[i]);
            totalError += error;
        }
        
        this.Revert(workingCtx, previousWorkingImageData);
        
        return totalError;
    }
	
    static RandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    static RandomInteger(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    static Clone(o) {
        if (o === null) return null
        var out = Array.isArray(o) ? [] : Object.create(o);
        
        for (var key in o) {
            var v = o[key];
            out[key] = (typeof v === "object") ? this.Clone(v) : v;
        }
        
        return out;
    }
}

export default Helpers;
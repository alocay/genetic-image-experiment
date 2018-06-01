'use strict'

class Helpers {
    static Apply(ctx, phenotype) {
        ctx.fillStyle = phenotype.getFillStyle();
        ctx.beginPath();
        
        ctx.moveTo(phenotype.points[0], genotype.points[1]);
        
        for(var i = 2; i < (phenotype.points.length); i+=2) {
            ctx.lineTo(phenotype.points[i], phenotype.points[i+1]);
        }
        
        ctx.closePath();
        ctx.fill();
    }
    
    static Revert(ctx, previousImgData) {
        ctx.putImageData(previousImgData, 0, 0);
    }
    
    static ApplyAndCompare(goalCtx, workingCtx, phenotype) {
        const previousWorkingImageData = workingCtx.getImageData(0, 0, phenotype.width, phenotype.height);
        
        this.Apply(workingCtx, phenotype);
        
        const subsetGoalImageData = goalCtx.getImageData(phenotype.boundingBox[0], phenotype.boundingBox[1], phenotype.boundingBox[2], phenotype.boundingBox[3]);
        const subsetWorkingImageData = workingCtx.getImageData(phenotype.boundingBox[0], phenotype.boundingBox[1], phenotype.boundingBox[2], phenotype.boundingBox[3]);
        
        let totalError = 0;
        for (var i = 0; i < subsetGoalImageData.data.length; i++) {
            const error = Math.abs(subsetGoalImageData.data[i] - subsetWorkingImageData.data[i]);
            totalError += error;
        }
        
        this.Revert(workingCtx, previousWorkingImageData);
        
        return totalError;
    }
    
    static GetRandomIntFromInterval(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    static GetRandomFromInterval(min, max) {
        return (Math.random() * (max - min) + min);
    }
}
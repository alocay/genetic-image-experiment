'use strict'

class Helpers {
    static Apply(ctx, genotype) {
        ctx.fillStyle = genotype.getFillStyle();
        ctx.beginPath();
        
        ctx.moveTo(genotype.points[0], genotype.points[1]);
        
        for(var i = 2; i < (genotype.points.length); i+=2) {
            ctx.lineTo(genotype.points[i], genotype.points[i+1]);
        }
        
        ctx.closePath();
        ctx.fill();
    }
    
    static Revert(ctx, previousImgData) {
        ctx.putImageData(previousImgData, 0, 0);
    }
    
    static ApplyAndCompare(goalCtx, workingCtx, genotype) {
        const previousWorkingImageData = workingCtx.getImageData(0, 0, genotype.width, genotype.height);
        
        this.Apply(workingCtx, genotype);
        
        const subsetGoalImageData = goalCtx.getImageData(genotype.boundingBox[0], genotype.boundingBox[1], genotype.boundingBox[2], genotype.boundingBox[3]);
        const subsetWorkingImageData = workingCtx.getImageData(genotype.boundingBox[0], genotype.boundingBox[1], genotype.boundingBox[2], genotype.boundingBox[3]);
        
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
'use strict' 

import Config from './config.js';

class Helpers {
	static Apply(ctx, polygon) {
        ctx.fillStyle = polygon.getFillStyle();
        ctx.beginPath();
        
        ctx.moveTo(polygon.vertices[0].X, polygon.vertices[0].Y);
        
        for(var i = 1; i < (polygon.vertices.length); i++) {
            ctx.lineTo(polygon.vertices[i].X, polygon.vertices[i].Y);
        }
        
        ctx.closePath();
        ctx.fill();
    }
    
    static Revert(ctx, previousImgData) {
        ctx.putImageData(previousImgData, 0, 0);
    }
    
    static ApplyPhenotype(ctx, phenotype) {
        this.Clear(ctx, Config.Width, Config.Height);
        
        for(var i = 0; i < phenotype.genotype.length; i++) {
			const p = phenotype.genotype[i];
			this.Apply(ctx, p);
		}
    }
    
    static Clear(ctx, width, height) {
        ctx.clearRect(0, 0, width, height);
    }
    
    static Clamp(value, min, max) {
        return Math.max(Math.min(value, max), min);
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
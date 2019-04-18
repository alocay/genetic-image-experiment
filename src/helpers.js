'use strict' 

import Config from './config.js';

const markers = [];
const perfMeasures = [[],[]];
let currentPerfCounter = 1;
let gathered = {};

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
    
    static PerfStart(name, id) {
        const m = id ? name + id : name;
        performance.mark(m + ' start');
        
        if (!markers.includes(name)) {
            markers.push(name);
        }
    }
    
    static PerfEnd(name, id) {
        const m = id ? name + id : name;
        performance.mark(m + ' end');
        performance.measure(m, m + ' start', m + ' end');
        const measures = performance.getEntriesByName(m);
        
        if (measures.length > 0) {
            const measure = measures[0];
            perfMeasures[currentPerfCounter].push({ name: m, duration: measure.duration });
        }
    }
    
    static PerfClear() {
        performance.clearMarks();
        performance.clearMeasures();
        currentPerfCounter++;
        perfMeasures[currentPerfCounter] = [];
    }
    
    static GatherPerf() {
        const measures = perfMeasures[currentPerfCounter];
            
        for (var j = 0; j < measures.length; j++) {
            const measure = measures[j];
            for (var k = 0; k < markers.length; k++) {
                if (measure.name.includes(markers[k])) {
                    if (!gathered[markers[k]] ) {
                        gathered[markers[k]] = { name: markers[k], duration: measure.duration, avg: measure.duration, count: 1 };
                    } else {
                        let data = gathered[markers[k]];
                        data.duration += measure.duration;
                        data.count++;
                        data.avg = data.duration / data.count;
                    }
                    
                    break;
                }
            }
        }
        
        return gathered;
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
    
    static GenerateHistograms(ctx) {
        const histograms = { 
            red: [0, 0, 0, 0],
            green: [0, 0, 0, 0],
            blue: [0, 0, 0, 0],
            redNorm: [0, 0, 0, 0],
            greenNorm: [0, 0, 0, 0],
            blueNorm: [0, 0, 0, 0],
            direction: null,
            scale: null
        };
        
        const totalPixels = Config.Width * Config.Height;
        const ctxData = ctx.getImageData(0, 0, Config.Width, Config.Height);
        
        for(var i = 0; i < ctxData.data.length; i+=4) {
            const rval = ctxData.data[i];
            const gval = ctxData.data[i+1];
            const bval = ctxData.data[i+2];
            const ri = this.CalculateBucketIndex(rval);
            const gi = this.CalculateBucketIndex(gval);
            const bi = this.CalculateBucketIndex(bval);
            
            histograms.red[ri]++;
            histograms.green[gi]++;
            histograms.blue[bi]++;
        }
        
        for (var i = 0; i < 4; i++) {
            histograms.redNorm[i] = histograms.red[i] / totalPixels;
            histograms.greenNorm[i] = histograms.green[i] / totalPixels;
            histograms.blueNorm[i] = histograms.blue[i] / totalPixels;
        }
        
        return histograms;
    }
    
    static CalculateBucketIndex(value) {
        if (value < 64) {
            return 0;
        } else if (value < 128) {
            return 1;
        } else if (value < 192) {
            return 2;
        } else {
            return 3;
        }
    }
}

export default Helpers;
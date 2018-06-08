import Helpers from './helpers.js';
import Population from './population.js';
import Polygon from './polygon.js';
import Config from './config.js';

class GenAlgo {
    constructor(width, height, workingCtx, fittestCtx) {
        this.options = {
            width: width,
            height: height,
            reset: this.reset.bind(this)
        };
        
        this.workingCtx = workingCtx;
        this.fittestCtx = fittestCtx;
        this.initialized = false;
       
        Config.Init(this.options);
        Config.CreateDatGui();
        
        this.population = new Population(this.options);
    }
    
    isRunning() {
        return Config.IsRunning;
    }
    
    getCurrentGeneration() {
        return this.population ? this.population.generation : "";
    }
    
    reset() {       
        Config.Stop();
        
        Helpers.Clear(this.workingCtx, Config.Width, Config.Height);
        Helpers.Clear(this.fittestCtx, Config.Width, Config.Height);
        
        this.population = new Population(this.options);
    }
    
    runOnce(goalCtx) {
        this.population.scoreAll(goalCtx, this.workingCtx);
        
        const fittest = this.population.getFittest();
        Helpers.ApplyPhenotype(this.fittestCtx, fittest);
        
        let newGen = [];
        for(var i = 0; i < Config.PopSize; i+=2) {
            const p1 = this.population.selectRoulette();
            const p2 = this.population.selectRoulette(p1.id);
            
            const children = p1.breed(p2);
            
            newGen.push(children[0]);
            newGen.push(children[1]);
        }
        
        this.population.nextGeneration(newGen);
        console.log(fittest);
        return [this.population.getNumOfPolygons(), fittest.score];
    }
}

export function NewGenAlgo(w, h, wctx, fctx) {
    return new GenAlgo(w, h, wctx, fctx);
};
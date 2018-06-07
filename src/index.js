import Helpers from './helpers.js';
import Population from './population.js';
import Polygon from './polygon.js';

class GenAlgo {
    constructor(size, width, height) {
        this.size = size;
        this.options = {
                numOfSides: 6,
                width: width,
                height: height,
                minRadius : 5,
                mutationChance: 0.05,
                verticesMutationStep: 1,
                colorMutationStep: 1,
                alphaMutationStep: 0.05
        };
        
        this.prevFittest = null;
        this.population = new Population(size, this.options);
        this.log = false;
    }
    
    testPoly(ctx) {
        Helpers.Clear(ctx, 120, 120);
        const p1 = new Polygon(3, 120, 120);
        Helpers.Apply(ctx, p1);
    }
    
    getCurrentGeneration() {
        return this.population.generation;
    }
    
    runOnce(goalCtx, workingCtx, fittestCtx) {
        this.population.scoreAll(goalCtx, workingCtx);
        
        
        const fittest = this.population.getFittest();
        Helpers.ApplyPhenotype(fittestCtx, fittest);
        
        if (this.prevFittest && this.log) {
            console.log('Fittest delta: ' + (this.prevFittest - fittest.score));
        }
        
        this.prevFittest = fittest.score;
        
        let newGen = [];
        for(var i = 0; i < this.size; i+=2) {
            const p1 = this.population.selectRoulette();
            const p2 = this.population.selectRoulette(p1.id);
            
            const children = p1.breed(p2);
            
            newGen.push(children[0]);
            newGen.push(children[1]);
        }
        
        this.population.nextGeneration(newGen);
        return this.population.getNumOfPolygons();
    }
}

export function NewGenAlgo(s, w, h) {
    return new GenAlgo(s, w, h);
};
import Helpers from './helpers.js';
import Population from './population.js';

class GenAlgo {
    constructor(size, width, height) {
        this.size = size;
        this.population = new Population(size, {
            numOfSides: 6,
            width: width,
            height: height
        });
    }
    
    getCurrentGeneration() {
        return this.population.generation;
    }
    
    runOnce(goalCtx, workingCtx, fittestCtx) {
        this.population.scoreAll(goalCtx, workingCtx);
        
        const fittest = this.population.getFittest();
        console.log(fittest.genotype);
        Helpers.ApplyPhenotype(fittestCtx, fittest);
        
        let newGen = [];
        for(var i = 0; i < this.size; i+=2) {
            const p1 = this.population.selectRandScores();
            const p2 = this.population.selectRandScores(p1.id);
            
            const children = p1.breed(p2, fittest);
            
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
import Phenotype from './phenotype.js';

class Population {
    constructor(size, phenotypeOptions) {
        this.size = size;
        this.population = [];
		this.generation = 1;
        this._generate(phenotypeOptions || {});
    }
    
    scoreAll(goalCtx, workingCtx) {
        for(var i = 0; i < this.size; i++) {
            this.population[i].computeFitness(goalCtx, workingCtx);
        }
    }
    
	selectRoulette() {
	}
	
    selectRandScores(excludedId) {
		let weightedScores = [];
        
        for(var i = 0; i < this.population.length; i++) {
            var rand = Math.random();
            weightedScores[i] = rand * this.population[i].score;
        }
        
        let best = null;
        let bestScore = Number.MAX_VALUE;
        for(var j = 0; j < weightedScores.length; j++) {
            if (weightedScores[j] < bestScore && excludedId !== this.population[j].id) {
                best = this.population[j];
                bestScore = weightedScores[j];
            }
        }
        
        return best;
    }
    
    getFittest() {
		this.population.sort(this._compareForFittest);
        
		return this.population[0];
    }
    
    nextGeneration(gen) {
        this.population = gen;
		this.generation++;
    }
    
    getNumOfPolygons() {
        return this.population[0].genotype.length;
    }
    
	_compareForFittest(a, b) {
		if (a.score > b.score) return 1;
		if (a.score < b.score) return -1;
		return 0;
	}
	
    _generate(options) {
        for(var i = 0; i < this.size; i++) {
			options.index = i;
			options.generation = this.generation;
            options.numOfPolygons = 50;
            this.population.push(new Phenotype(options));
        }
    }    
}

export default Population;
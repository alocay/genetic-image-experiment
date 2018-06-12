import Phenotype from './phenotype.js';
import Helpers from './helpers.js';
import Config from './config.js';

class Population {
    constructor(options) {
        this.population = [];
		this.generation = 1;
		this.probabilitiesCalced = false;
        this._generate(options);
    }
    
    scoreAll(goalCtx, workingCtx) {
        Helpers.PerfStart('population-scoreAll');
        
        for(var i = 0; i < this.population.length; i++) {
            this.population[i].computeFitness(goalCtx, workingCtx);
        }
        
        Helpers.PerfEnd('population-scoreAll');
    }
    
	selectRoulette(excludedId) {
        Helpers.PerfStart('population-select-roulette');
        
		this._calculateRouletteProbabilities();
		
		const prob = Math.random();
		for(var i = 0; i < this.population.length; i++) {
			if ((i+1) === this.population.length) {
				return this.population[i];
			}
			
			if (prob > this.population[i].probability && prob < this.population[i+1].probability) {
				if (this.population[i].id === excludedId) {
					return this.population[i+1];
				} else {
					return this.population[i];
				}
			}
		}
        
        Helpers.PerfEnd('population-select-roulette');
	}
	
    selectRandScores(excludedId) {
        Helpers.PerfStart('population-select-rand');
        
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
        
        Helpers.PerfEnd('population-select-rand');
        
        return best;
    }
    
    getFittest() {
        Helpers.PerfStart('population-get-fittest');
        
		this.population.sort(this._compareForFittest);
		return this.population[0];
        
        Helpers.PerfStart('population-get-fittest');
    }
    
    nextGeneration(gen) {
        this.population = gen;
		this.probabilitiesCalced = false;
		this.generation++;
    }
    
    getNumOfPolygons() {
        return this.population[0].genotype.length;
    }
    
	_calculateRouletteProbabilities() {
		if (!this.probabilitiesCalced) {
			let scoreSum = 0;
			let probabilitySum = 0;
			for(var i = 0; i < this.population.length; i++) {
				scoreSum += this.population[i].score;
			}
			
			for(var i = 0; i < this.population.length; i++) {
				const probability = probabilitySum + (this.population[i].score / scoreSum);
				probabilitySum += probability;
				this.population[i].probability = probability;
			}
			
			this.population.sort(this._compareForProbability);
			this.probabilitiesCalced = true;
		}
	}
	
	_compareForProbability(a, b) {
		if (a.probability < b.probability) return 1;
		if (a.probability > b.probability) return -1;
		return 0;
	}
	
	_compareForFittest(a, b) {
        return a.score - b.score;
	}
	
    _generate(options) {
        for(var i = 0; i < Config.PopSize; i++) {
			options.index = i;
			options.generation = this.generation;
            this.population.push(new Phenotype(options));
        }
    }    
}

export default Population;
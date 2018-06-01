class Population {
    constructor(size, phenotypeOptions) {
        this.size = size;
        this.population = [];
		this.generation = 1;
		this.goalCtx = goalCtx;
		this.workingCtx = workingCtx;
        this._generate(phenotypeOptions || {});
    }
    
    scoreAll() {
        for(var i = 0; i < this.size; i++) {
            this.population[i].score(goalCtx workingCtx);
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
    
	_compareForFittest(a, b) {
		if (a.score < b.score) return 1;
		if (a.score > b.score) return -1;
		return 0;
	}
	
    _generate(options) {
        for(var i = 0; i < this.size; i++) {
			options.index = i;
			options.generation = this.generation;
            this.population.push(new Phenotype(options));
        }
    }    
}
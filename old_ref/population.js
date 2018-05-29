'use strict'

class Population {
    constructor(size, options) {
        this.population = [];
        
        if (options && options.generate) {
            this._generateRandomPopulation(size, options);
        }
    }
    
    size() {
        return this.population.length;
    }
    
    selectIndividuals(exclusionIndex) {
        //var r = Math.random();
        let weightedScores = [];
        
        for(var i = 0; i < this.population.length; i++) {
            var rand = Math.random();
            weightedScores[i] = rand * this.population[i].score;
        }
        
        let bestIndex = null;
        let bestScore = Number.MAX_VALUE;
        for(var j = 0; j < weightedScores.length; j++) {
            if (weightedScores[j] < bestScore && exclusionIndex !== j) {
                bestIndex = j;
                bestScore = weightedScores[j];
            }
        }
        
        return bestIndex;
    }
    
    getFittest() {
        let fittest = null;
        let bestScore = Number.MAX_VALUE;
        
        for(var i = 0; i < this.population.length; i++) {
            if (this.population[i].score < bestScore) {
                fittest = this.population[i];
                bestScore = this.population[i].score;
            }
        }
        
        return fittest;
    }
    
    getIndividual(index) {
        return this.population[index];
    }
    
    addIndividual(ind) {
        this.population.push(ind);
    }
    
    scoreAll(goalContext, workingContext) {
        for(var i = 0; i < this.population.length; i++) {
            this.population[i].computeFitness(goalContext, workingContext);
        }
    }
    
    _generateRandomPopulation(size, options) {
        for(var i = 0; i < size; i++) {
            this.population.push(new Individual(options));
        }
    }
}
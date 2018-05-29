'use strict'

class Individual {
    constructor(options) {
        this.genotype = new Genotype(options);
        this.score = null;
        this.mutationChance = 0.4;
        this.mutationStep = 50;
        this.mutationStepAlpha = 0.3;
    }
    
    computeFitness(goalContext, workingContext) {
        this.score = Helpers.ApplyAndCompare(goalContext, workingContext, this.genotype);
    }
    
    breed(other) {
        const numOfGenes = this.genotype.getGenotypeLength();
        const crossover = Helpers.GetRandomIntFromInterval(0, (numOfGenes - 1));
        
        let child1geno = this.genotype.getGenotype();
        let child2geno = other.genotype.getGenotype();
        
        for(var i = 0; i < crossover; i++) {
            var tempC1 = child1geno[i];
            child1geno[i] = child2geno[i];
            child2geno[i] = tempC1;
        }
        
        for(var i = 0; i < numOfGenes; i++) {
            if (Math.random() <= this.mutationChance) {
                this._mutateGene(child1geno[i], i < (numOfGenes - this.genotype.NumOfColorValues), (i % 2), (i === (numOfGenes - 1)));
            }
        }
        
        for(var i = 0; i < numOfGenes; i++) {
            if (Math.random() <= this.mutationChance) {
                this._mutateGene(child2geno[i], i < (numOfGenes - this.genotype.NumOfColorValues), (i % 2), (i === (numOfGenes - 1)));
            }
        }
        
        const child1 = new Individual({ genotype: child1geno, width: this.genotype.width, height: this.genotype.height });
        const child2 = new Individual({ genotype: child2geno, width: this.genotype.width, height: this.genotype.height });
        return [child1, child2];
    }
    
    _mutateGene(gene, isPoint, isX, isAlpha) {        
        let newGene = isAlpha ? (gene + this.mutationStepAlpha) : (gene + this.mutationStep);
        if (Math.random() < 0.5) {
            newGene = isAlpha  ? (gene - this.mutationStepAlpha) : (gene - this.mutationStep);
        }
        
        if (isPoint) {
            if (isX) {
                newGene = Math.max(this.genotype.width, Math.min(0, newGene));
            } else {
                newGene = Math.max(this.genotype.height, Math.min(0, newGene));
            }
        }
        else {
            if (isAlpha) {
                newGene = Math.max(0, Math.min(1, newGene));
            } else {
                newGene = Math.max(0, Math.min(255, newGene));
            }
        }
        
        return newGene
    }
}
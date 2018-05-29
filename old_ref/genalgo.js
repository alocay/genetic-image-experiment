'use strict'

class GeneticAlgo {
    constructor(size, goalContext, workingContext, numOfSides = 6, width, height) {
        this.stop = false;
        this.goalContext = goalContext;
        this.workingContext = workingContext;
        this.population = new Population(size, { generate: true, width: width, height: height, numOfSides: numOfSides });
        this.generation = 0;
    }
    
    runOnce() {
        this.generation++;
        
        this.population.scoreAll(this.goalContext, this.workingContext);
        //console.log(this.population);
        
        // Get fittest and apply it to the canvas
        const fittest = this.population.getFittest();
        //console.log(fittest);
        Helpers.Apply(this.workingContext, fittest.genotype);
        
        let newGeneration = new Population();
        
        // Progress by 2 since 2 children are added at a time
        for(var i = 0; i < this.population.size(); i+=2) {
            var parent1Index = this.population.selectIndividuals();
            var parent2Index = this.population.selectIndividuals(parent1Index);
            
            var parent1 = this.population.getIndividual(parent1Index);
            var parent2 = this.population.getIndividual(parent2Index);
            
            var children = parent1.breed(parent2);
            newGeneration.addIndividual(children[0]);
            newGeneration.addIndividual(children[1]);
        }
        
        this.population = newGeneration;
        return this.generation;
    }
    
    runForever() {        
        do {
            this.runOnce();
        } while (this.stop !== false);
    }
}
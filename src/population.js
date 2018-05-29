class Population {
    constructor(size, phenotypeOptions) {
        this.size = size;
        this.population = [];
        this._generate(phenotypeOptions);
    }
    
    scoreAll() {
        for(var i = 0; i < this.size; i++) {
            this.population[i].score();
        }
    }
    
    select() {
    }
    
    getFittest() {
    }
    
    nextGeneration(gen) {
        this.population = gen;
    }
    
    _generate(options) {
        for(var i = 0; i < this.size; i++) {
            this.population.push(new Phenotype(options));
        }
    }    
}
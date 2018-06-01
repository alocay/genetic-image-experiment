class GenAlgo {
    constructor(size, width, height) {
        this.size = size;
        this.population = new Population(size, {
            numOfSides: 6,
            width: width,
            height: height
        });
    }
    
    runOnce() {
        this.population.scoreAll();
        
        const fittest = this.population.getFittest();
        
        let newGen = [];
        for(var i = 0; i < this.size; i+=2) {
            const p1 = this.population.select();
            const p2 = this.population.select(p1.id);
            
            const children = p1.breed(p2, fittest);
            
            newGen.push(children[0]);
            newGen.push(children[1]);
        }
        
        this.population.nextGeneration(newGen);
    }
}
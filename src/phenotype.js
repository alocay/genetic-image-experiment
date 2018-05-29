import Polygon from './polygon.js'

const MaxNumOfSides = 10;
const MutationChance = 0.07;

class Phenotype {
    constructor(options) {
        this.score = null;
        
        if (options.genotype) {
            this.genotype = options.genotype;
        } else {
            this.genotype = [];
            
            if (options.randSides)
                this.numOfSides = RandomNumber(3, MaxNumOfSides);
            else 
                this.numOfSides = options.numOfSides ? options.numOfSides : MaxNumOfSides;
            
            this.width = options.width;
            this.height = options.height;
            
            this._generate();
        }
    }
    
    score() {
    }
    
    breed(other, fittest) {
        // experimenting with using most fit genotype in children
        // Note: This may lead to homogenous population very quickly!
        let child1geno = Helpers.clone(fittest.concat(this.genotype));
        let child2geno = Helpers.clone(fittest.concat(other.genotype));
        const crossoverIndex = Helpers.RandomInteger(0, child1geno.length);
        
        // Swap the polygons
        for(var i = 0; i < crossoverIndex; i++) {
            const tempC1 = Helpers.clone(child1geno[i]);
            child1geno[i] = Helpers.clone(child2geno[i]);
            child2geno[i] = tempC1;
        }
        
        for(var i = 0; i < child1geno.length; i++) {
            if (Math.random() < MutationChance) child1geno[i].mutate();
            if (Math.random() < MutationChance) child2geno[i].mutate();
        }
        
        const child1 = new Phenotype({ genotype: child1geno });
        const child2 = new Phenotype({ genotype: child2geno });
        
        return [child1, child2]
    }
    
    cloneGenotype() {
        let clonedGeno = [];
        
        for(var i = 0; i < this.genotype.length; i++) {
            const g = this.genotype[i];
            clonedGeno.push(new Point(g.X, g.Y));
        }
        
        return clonedGeno;
    }
    
    _generate() {
        this.genotype = [new Polygon(this.numOfSides, this.width, this.height)];
    }
}
import Polygon from './polygon.js';
import Helpers from './helpers.js';

const MaxNumOfSides = 10;
const MutationChance = 0.07;

class Phenotype {
    constructor(options) {
        this.score = null;
		this.generation = options.generation;
		this.index = options.index;
		this.id = Helpers.RandomInteger(1, 10000) + "_" + this.generation + "_" + this.index;
        this.width = options.width;
        this.height = options.height;
        
        if (options.genotype) {
            this.genotype = options.genotype;
        } else {
            this.genotype = [];
            
            if (options.randSides)
                this.numOfSides = RandomNumber(3, MaxNumOfSides);
            else 
                this.numOfSides = options.numOfSides ? options.numOfSides : MaxNumOfSides;
            
            this._generate();
        }
    }
    
    computeFitness(goalCtx, workingCtx) {
		const previousWorkingImageData = workingCtx.getImageData(0, 0, this.width, this.height);
        
		for(var i = 0; i < this.genotype.length; i++) {
			const p = this.genotype[i];
			Helpers.Apply(workingCtx, p);
		}
        
        const subsetGoalImageData = goalCtx.getImageData(0, 0, this.width, this.height);
        const subsetWorkingImageData = workingCtx.getImageData(0, 0, this.width, this.height);
        
        let totalError = 0;
        for (var i = 0; i < subsetGoalImageData.data.length; i++) {
            const error = Math.abs(subsetGoalImageData.data[i] - subsetWorkingImageData.data[i]);
            totalError += error;
        }
        
        Helpers.Revert(workingCtx, previousWorkingImageData);
        
        this.score = totalError;
    }
    
    breed(other, fittest) {
        // experimenting with using most fit genotype in children
        // Note: This may lead to homogenous population very quickly!
        
        console.log('this genotype');
        console.log(this.genotype);
        
        console.log('concat');
        console.log(fittest.genotype.concat(this.genotype));
        
        let child1geno = Helpers.Clone(fittest.genotype.concat(this.genotype));
        let child2geno = Helpers.Clone(fittest.genotype.concat(other.genotype));
        const crossoverIndex = Helpers.RandomInteger(0, child1geno.length);
        
        console.log('child1geno');        
        console.log(child1geno);
        
        // Swap the polygons
        for(var i = 0; i < crossoverIndex; i++) {
            const tempC1 = Helpers.Clone(child1geno[i]);
            child1geno[i] = Helpers.Clone(child2geno[i]);
            child2geno[i] = tempC1;
        }
        
        for(var i = 0; i < child1geno.length; i++) {
            child1geno[i].tryMutate();
			child2geno[i].tryMutate();
        }
        
        console.log('child1geno end');   
        console.log(child1geno);
        
        const child1 = new Phenotype({ index: this.index, generation: (this.generation + 1), width: this.width, height: this.height, genotype: child1geno });
        const child2 = new Phenotype({ index: other.index, generation: (other.generation + 1), width: this.width, height: this.height, genotype: child2geno });
        
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

export default Phenotype;
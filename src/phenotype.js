import Polygon from './polygon.js';
import Helpers from './helpers.js';

const MaxNumOfSides = 10;

class Phenotype {
    constructor(options) {
        this.score = null;
		this.probability = 0;
		this.generation = options.generation;
		this.index = options.index;
		this.id = Helpers.RandomInteger(1, 10000) + "_" + this.generation + "_" + this.index;
        this.width = options.width;
        this.height = options.height;
        this.mutationChance = 0.001;
        
        if (options.genotype) {
            this.genotype = options.genotype;
        } else {
            this.genotype = [];
            
            if (options.randSides)
                this.numOfSides = RandomNumber(3, MaxNumOfSides);
            else 
                this.numOfSides = options.numOfSides ? options.numOfSides : MaxNumOfSides;
            
            this._generate(options.numOfPolygons);
        }
    }
    
    computeFitness(goalCtx, workingCtx) {
        Helpers.ApplyPhenotype(workingCtx, this);
        
        const subsetGoalImageData = goalCtx.getImageData(0, 0, this.width, this.height);
        const subsetWorkingImageData = workingCtx.getImageData(0, 0, this.width, this.height);
        
        let totalError = 0;
        for (var i = 0; i < subsetGoalImageData.data.length; i+=4) {
            const g_offset = i + 1;
            const b_offset = i + 2;
            totalError += Math.abs(subsetGoalImageData.data[i] - subsetWorkingImageData.data[i]) + 
                Math.abs(subsetGoalImageData.data[g_offset] - subsetWorkingImageData.data[g_offset]) + 
                Math.abs(subsetGoalImageData.data[b_offset] - subsetWorkingImageData.data[b_offset]);
        }
        
        Helpers.Clear(workingCtx, this.width, this.height);
        this.score = totalError;
    }
    
    breed(other) {
        let child1geno = this.genotype;
        let child2geno = other.genotype;
        const crossoverIndex = Helpers.RandomInteger(0, child1geno.length);
		
        // Swap the polygons
        for(var i = 0; i < crossoverIndex; i++) {
            const tempC1 = child1geno[i];
            child1geno[i] = child2geno[i];
            child2geno[i] = tempC1;
        }
        
        if (Math.random() > this.mutationChance) {
            const childToMutate = Helpers.RandomInteger(0, (child1geno.length - 1));
            child1geno[childToMutate].tryMutate();
        }
        
        if (Math.random() > this.mutationChance) {
            const childToMutate = Helpers.RandomInteger(0, (child2geno.length - 1));
            child2geno[childToMutate].tryMutate();
        }
        
        /*for(var i = 0; i < child1geno.length; i++) {
            child1geno[i].tryMutate();
			child2geno[i].tryMutate();
        }*/
		
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
    
    _generate(numOfPolygons) {
        for (var i = 0; i < numOfPolygons; i++) {        
            this.genotype.push(new Polygon(this.numOfSides, this.width, this.height));
        }
    }
}

export default Phenotype;
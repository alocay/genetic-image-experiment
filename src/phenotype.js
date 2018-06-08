import Polygon from './polygon.js';
import Helpers from './helpers.js';
import Config from './config.js';


class Phenotype {
    constructor(options) {
        this.score = null;
		this.probability = 0;
		this.generation = options.generation;
		this.index = options.index;
		this.id = Helpers.RandomInteger(1, 10000) + "_" + this.generation + "_" + this.index;
        this.mutationChance = Config.MutationChance;
        
        if (options.genotype) {
            this.genotype = options.genotype;
        } else {
            this.genotype = [];
            this._generate(options);
        }
    }
    
    computeFitness(goalCtx, workingCtx) {
        Helpers.ApplyPhenotype(workingCtx, this);
        
        const subsetGoalImageData = goalCtx.getImageData(0, 0, Config.Width, Config.Height);
        const subsetWorkingImageData = workingCtx.getImageData(0, 0, Config.Width, Config.Height);
        
        let totalError = 0;
        for (var i = 0; i < subsetGoalImageData.data.length; i+=4) {
            const g_offset = i + 1;
            const b_offset = i + 2;
            const a_offset = i + 3;
            
            totalError += Math.abs(subsetGoalImageData.data[i] - subsetWorkingImageData.data[i]) + 
                Math.abs(subsetGoalImageData.data[g_offset] - subsetWorkingImageData.data[g_offset]) + 
                Math.abs(subsetGoalImageData.data[b_offset] - subsetWorkingImageData.data[b_offset]) + 
                Math.abs(subsetGoalImageData.data[a_offset] - subsetWorkingImageData.data[a_offset]);
        }
        
        Helpers.Clear(workingCtx, Config.Width, Config.Height);
        this.score = totalError;
    }
    
    breed(other) {
        let child1geno = this.cloneGenotype();
        let child2geno = other.cloneGenotype();
        const crossoverIndex = Helpers.RandomInteger(0, child1geno.length);
        
        // Swap the polygons
        for(var i = 0; i < crossoverIndex; i++) {
            const tempC1 = child1geno[i].clone();
            child1geno[i] = child2geno[i].clone();
            child2geno[i] = tempC1;
        }
        
        if (Math.random() < Config.MutationChance) {
            const childToMutate = Helpers.RandomInteger(0, (child1geno.length - 1));
            child1geno[childToMutate].tryMutate();
        }
        
        if (Math.random() < Config.MutationChance) {
            const childToMutate = Helpers.RandomInteger(0, (child2geno.length - 1));
            child2geno[childToMutate].tryMutate();
        }
		
        const child1 = new Phenotype({ index: this.index, generation: (this.generation + 1), genotype: child1geno });
        const child2 = new Phenotype({ index: other.index, generation: (other.generation + 1), genotype: child2geno });
        
        return [child1, child2]
    }
    
    cloneGenotype() {
        let clonedGeno = [];
        
        for(var i = 0; i < this.genotype.length; i++) {
            clonedGeno[i] = this.genotype[i].clone();
        }
        
        return clonedGeno;
    }
    
    _generate(options) {
        for (var i = 0; i < Config.NumOfPolygons; i++) {
            this.genotype.push(new Polygon(options));
        }
    }
}

export default Phenotype;
import Polygon from './polygon.js';
import Helpers from './helpers.js';
import Config from './config.js';
import GPU, { input } from 'gpu.js';

const gpu = new GPU();

class Phenotype {
    constructor(options) {
        this.score = null;
		this.probability = 0;
		this.generation = options.generation;
		this.index = options.index;
		this.id = Helpers.RandomInteger(1, 10000) + "_" + this.generation + "_" + this.index;
        this.mutationChance = Config.MutationChance;
        this.deltaKernel = null;
        this.initKernel();
        
        if (options.genotype) {
            this.genotype = options.genotype;
        } else {
            this.genotype = [];
            this._generate(options);
        }
    }
    
    initKernel() {
        const total = Config.Width * Config.Height * 4;
        this.deltaKernel = gpu.createKernel(function(a, b) {
            return a[this.thread.x] - b[this.thread.x];
        }).setOutput([total]);
    }
    
    computeFitness(goalCtx, workingCtx) {
        Helpers.PerfStart('phenotype-fitness', this.id);
        
        Helpers.ApplyPhenotype(workingCtx, this);
        
        const subsetGoalImageData = goalCtx.getImageData(0, 0, Config.Width, Config.Height);
        const subsetWorkingImageData = workingCtx.getImageData(0, 0, Config.Width, Config.Height);
        
        let totalError = 0;
        
        Helpers.PerfStart('fitness-loop', this.id);
        for (var i = 0; i < subsetGoalImageData.data.length; i+=4) {
            const g_offset = i + 1;
            const b_offset = i + 2;
            const a_offset = i + 3;
            
            totalError += Math.abs(subsetGoalImageData.data[i] - subsetWorkingImageData.data[i]) + 
                Math.abs(subsetGoalImageData.data[g_offset] - subsetWorkingImageData.data[g_offset]) + 
                Math.abs(subsetGoalImageData.data[b_offset] - subsetWorkingImageData.data[b_offset]) + 
                Math.abs(subsetGoalImageData.data[a_offset] - subsetWorkingImageData.data[a_offset]);
        }
        Helpers.PerfEnd('fitness-loop', this.id);
        
        Helpers.Clear(workingCtx, Config.Width, Config.Height);        
        Helpers.PerfEnd('phenotype-fitness', this.id);
        
        this.score = totalError;
    }
    
    computeFitnessGpu(goalCtx, workingCtx) {
        Helpers.PerfStart('phenotype-fitness-gpu', this.id);
        
        Helpers.ApplyPhenotype(workingCtx, this);
        
        const subsetGoalImageData = goalCtx.getImageData(0, 0, Config.Width, Config.Height);
        const subsetWorkingImageData = workingCtx.getImageData(0, 0, Config.Width, Config.Height);
        
        const deltaMatrix = this.deltaKernel(subsetGoalImageData.data, subsetWorkingImageData.data);
        const totalError = deltaMatrix.reduce((a, c) => a + c);
        
        Helpers.Clear(workingCtx, Config.Width, Config.Height);        
        Helpers.PerfEnd('phenotype-fitness-gpu', this.id);
        
        this.score = totalError;
    }
    
    computeFitnessHisto(goalCtx, workingCtx, goalHisto) {
        Helpers.PerfStart('phenotype-fitness-histo', this.id);
        
        Helpers.ApplyPhenotype(workingCtx, this);
        
        const workHisto = Helpers.GenerateHistograms(workingCtx);
        
        let totalError = 0;
        for (var i = 0; i < goalHisto.redNorm.length; i++) { 
            totalError += Math.abs(goalHisto.redNorm[i] - workHisto.redNorm[i]) + Math.abs(goalHisto.greenNorm[i] - workHisto.greenNorm[i]) + Math.abs(goalHisto.blueNorm[i] - workHisto.blueNorm[i]);
        }
        
        Helpers.Clear(workingCtx, Config.Width, Config.Height);
        this.score = totalError;
        
        Helpers.PerfEnd('phenotype-fitness-histo', this.id);
    }
    
    breed(other) {
        Helpers.PerfStart('phenotype-breed', this.id);
        
        let child1geno = this.cloneGenotype();
        let child2geno = other.cloneGenotype();
        const crossoverIndex = Helpers.RandomInteger(0, child1geno.length);
        
        // Swap the polygons
        for(var i = 0; i < crossoverIndex; i++) {
            const tempC1 = child1geno[i].clone(this.id + '-' + i + '-' + Helpers.RandomInteger(0,10000));
            child1geno[i] = child2geno[i].clone(this.id + '-' + i + '-' + Helpers.RandomInteger(0,10000));
            child2geno[i] = tempC1;
        }
        
        if (Math.random() < Config.MutationChance) {
            const childToMutate = Helpers.RandomInteger(0, (child1geno.length - 1));
            const cid = this.id + '-' + childToMutate + '-' + Helpers.RandomInteger(0, 10000);
            child1geno[childToMutate].tryMutate(cid);
        }
        
        if (Math.random() < Config.MutationChance) {
            const childToMutate = Helpers.RandomInteger(0, (child2geno.length - 1));
            const cid = this.id + '-' + childToMutate + '-' + Helpers.RandomInteger(0, 10000);
            child2geno[childToMutate].tryMutate(cid);
        }
		
        const child1 = new Phenotype({ index: this.index, generation: (this.generation + 1), genotype: child1geno });
        const child2 = new Phenotype({ index: other.index, generation: (other.generation + 1), genotype: child2geno });
        
        Helpers.PerfEnd('phenotype-breed', this.id);
        
        return [child1, child2]
    }
    
    cloneGenotype() {
        Helpers.PerfStart('phenotype-clonegeno', this.id);
        
        let clonedGeno = [];
        
        for(var i = 0; i < this.genotype.length; i++) {
            const cid = this.id + '-' + i + '-' + Helpers.RandomInteger(0, 10000);
            clonedGeno[i] = this.genotype[i].clone(cid);
        }
        
        Helpers.PerfEnd('phenotype-clonegeno', this.id);
        
        return clonedGeno;
    }
    
    _generate(options) {
        Helpers.PerfStart('phenotype-generate', this.id);
        
        for (var i = 0; i < Config.NumOfPolygons; i++) {
            this.genotype.push(new Polygon(options));
        }
        
        Helpers.PerfEnd('phenotype-generate', this.id);
    }
}

export default Phenotype;
'use strict' 

import * as dat from 'dat.gui';
import Helpers from './helpers.js';

/*let _size = 100;
let _numOfPolygons = 50;
let _numOfSides = 6;
let _width = 0;
let _height = 0;
let _mutationChance = 0.05;
let _colorMutationChance = 0.15;
let _redMutationChance = 0.15;
let _greenMutationChance = 0.15;
let _blueMutationChance = 0.15;
let _alphaMutationChance = 0.2;
let _vertexMutationChance = 0.8;
let _addVertexChance = 1;
let _removeVertexChance = 1;
let _vertexMutationStep = 1;
let _colorMutationStep = 1;
let _alphaMutationStep = 0.05;
let _addAndRemoveVertices = false;
let _toggleRun = () => {};
let _gui = null;*/

const MinNumOfSides = 3;
const MaxNumOfSides = 10;
const MinColor = 0;
const MaxColor = 255;
const MinAlpha = 0;
const MaxAlpha = 1;

class Config { 
    static Init(options) {
        this._width = options.width;
        this._height = options.height;
        this._toggleRun = options.toggleRun;
        this._reset = options.reset;
        this._size = 100;
        this._randomColors = false;
        this._startingColor = [ 255, 0, 0, 1 ];
        this._numOfPolygons = 50;
        this._numOfSides = 6;
        this._mutationChance = 0.05;
        this._colorMutationChance = 0.45;
        this._redMutationChance = 0.33;
        this._greenMutationChance = 0.66;
        this._blueMutationChance = 0.9;
        this._alphaMutationChance = 0.1;
        this._vertexMutationChance = 0.8;
        this._addOrRemoveVertexChance = 0.01;
        this._addVertexChance = 0.5;
        this._removeVertexChance = 0.5;
        this._vertexMutationStep = 5;
        this._colorMutationStep = 5;
        this._alphaMutationStep = 0.1;
        this._running = false;
        this._gui = null;
    }
    
    static get PopSize() {
        return this._size;
    }
    
    static set PopSize(size) {
        this._size = size;
    }
    
    static get Width() {
        return this._width;
    }
    
    static set Width(w) {
        this._width = w;
    }
    
    static get Height() {
        return this._height;
    }
    
    static set Height(h) {
        this._height = h;
    }
    
    static get NumOfPolygons() {
        return this._numOfPolygons;
    }
    
    static set NumOfPolygons(polys) {
        this._numOfPolygons = polys;
    }
    
    static get InitialNumOfSides() {
        return this._numOfSides;
    }
    
    static set InitialNumOfSides(sides) {
        if (sides === 0) {
            this._numOfSides = Helpers.RandomInteger(MinNumOfSides, MaxNumOfSides);
        } else {
            this._numOfSides = sides;
        }
    }
    
    static get UseRandomColors() {
        return this._randomColors;
    }
    
    static set UseRandomColors(randomColors) {
        this._randomColors = randomColors;
    }
    
    static get StartingColor() {
        return this._startingColor;
    }
    
    static set StartingColor(color) {
        this._startingColor = color;
    }
    
    static get MutationChance() {
        return this._mutationChance;
    }
    
    static set MutationChance(chance) {
        this._mutationChance = chance;
    }
    
    static get ColorMutationChance() {
        return this._colorMutationChance;
    }
    
    static set ColorMutationChance(chance) {
        this._colorMutationChance = chance;
    }
    
    static get RedMutationChance() {
        return this._redMutationChance;
    }
    
    static set RedMutationChance(chance) {
        this._redMutationChance = chance;
    }
    
    static get GreenMutationChance() {
        return this._greenMutationChance;
    }
    
    static set GreenMutationChance(chance) {
        this._greenMutationChance = chance;
    }

    static get BlueMutationChance() {
        return this._blueMutationChance;
    }
    
    static set BlueMutationChance(chance) {
        this._blueMutationChance = chance;
    }    
    
    static get AlphaMutationChance() {
        return this._alphaMutationChance;
    }
    
    static set AlphaMutationChance(chance) {
        this._alphaMutationChance = chance;
    }
    
    static get VertexMutationChance() {
        return this._vertexMutationChance;
    }
    
    static set VertexMutationChance(chance) {
        this._vertexMutationChance = chance;
    }
    
    static get AddOrRemoveVertexChance() {
        return this._addOrRemoveVertexChance;
    }
    
    static set AddOrRemoveVertexChance(chance) {
        this._addOrRemoveVertexChance = chance;
    }
    
    static get AddVertexChance() {
        return this._addVertexChance;
    }
    
    static set AddVertexChance(chance) {
        this._addVertexChance = chance;
    }
    
    static get RemoveVertexChance() {
        return this._removeVertexChance;
    }
    
    static set RemoveVertexChance(chance) {
        this._removeVertexChance = chance;
    }
    
    static get VertexMutationStep() {
        return this._vertexMutationStep;
    }
    
    static set VertexMutationStep(step) {
        this._vertexMutationStep = step;
    }
    
    static get ColorMutationStep() {
        return this._colorMutationStep;
    }
    
    static set ColorMutationStep(step) {
        this._colorMutationStep = step;
    }
    
    static get AlphaMutationStep() {
        return this._alphaMutationStep;
    }
    
    static set AlphaMutationStep(step) {
        this._alphaMutationStep = step;
    }
    
    static get IsRunning() {
        return this._running;
    }
    
    static Run() {
        this._running = !this._running;
    }
    
    static Stop() {
        this._running = false;
    }
    
    static get Reset() {
        return this._reset;
    }
    
    static _stopRunning() {
        if (this._running) {
            this._running = false;
            this._reset();
        }
    }
    
    static CreateDatGui() {
        this._gui = new dat.GUI();
          
        this._gui.add(this, 'MutationChance', 0, 1).step(0.01);
        this._gui.add(this, 'Run');
        this._gui.add(this, 'Reset');
        
        const initGui = this._gui.addFolder('Init (will reset if started)');
        initGui.add(this, 'PopSize').step(2).onChange(this._stopRunning.bind(this));
        initGui.add(this, 'NumOfPolygons').onChange(this._stopRunning.bind(this));
        initGui.add(this, 'InitialNumOfSides', [0,3,4,5,6,7,8,9,10]).onChange(this._stopRunning.bind(this));
        initGui.add(this, 'UseRandomColors').onChange(this._stopRunning.bind(this));
        initGui.addColor(this, 'StartingColor').onChange(this._stopRunning.bind(this));
        initGui.open();
        
        const mutations = this._gui.addFolder('Mutation Chances (Cumalative max <= 1)');
        mutations.add(this, 'VertexMutationChance', 0, 1).step(0.01);
        mutations.add(this, 'AddOrRemoveVertexChance', 0, 1).step(0.01);
        mutations.add(this, 'ColorMutationChance', 0, 1).step(0.01);
        mutations.open();
        
        const vertexMutations = this._gui.addFolder('Vertex Mutation Chances (Cumalative max <= 1)');
        vertexMutations.add(this, 'AddVertexChance', 0, 1).step(0.01);
        vertexMutations.add(this, 'RemoveVertexChance', 0, 1).step(0.01);
        vertexMutations.add(this, 'VertexMutationStep', 1, this._width/2).step(0.5);
        
        const mutationColorsGui = this._gui.addFolder('Color Mutation Chances (Cumalative max <= 1)');
        mutationColorsGui.add(this, 'RedMutationChance', 0, 1).step(0.01);
        mutationColorsGui.add(this, 'GreenMutationChance', 0, 1).step(0.01);
        mutationColorsGui.add(this, 'BlueMutationChance', 0, 1).step(0.01);
        mutationColorsGui.add(this, 'AlphaMutationChance', 0, 1).step(0.01);
        mutationColorsGui.add(this, 'ColorMutationStep', MinColor, MaxColor).step(1);
        mutationColorsGui.add(this, 'AlphaMutationStep', MinAlpha, MaxAlpha).step(0.1);
    }
}

export default Config;
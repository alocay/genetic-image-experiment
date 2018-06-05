var GenAlgo =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Helpers = function () {\n    function Helpers() {\n        _classCallCheck(this, Helpers);\n    }\n\n    _createClass(Helpers, null, [{\n        key: \"Apply\",\n        value: function Apply(ctx, polygon) {\n            ctx.fillStyle = polygon.getFillStyle();\n            ctx.beginPath();\n\n            ctx.moveTo(polygon.vertices[0].X, polygon.vertices[0].Y);\n\n            for (var i = 2; i < polygon.vertices.length; i += 2) {\n                ctx.lineTo(polygon.vertices[i].X, polygon.vertices[i].Y);\n            }\n\n            ctx.closePath();\n            ctx.fill();\n        }\n    }, {\n        key: \"Revert\",\n        value: function Revert(ctx, previousImgData) {\n            ctx.putImageData(previousImgData, 0, 0);\n        }\n    }, {\n        key: \"ApplyPhenotype\",\n        value: function ApplyPhenotype(ctx, phenotype) {\n            this.Clear(ctx, phenotype.width, phenotype.height);\n\n            for (var i = 0; i < phenotype.genotype.length; i++) {\n                var p = phenotype.genotype[i];\n                this.Apply(ctx, p);\n            }\n        }\n    }, {\n        key: \"Clear\",\n        value: function Clear(ctx, width, height) {\n            ctx.clearRect(0, 0, width, height);\n        }\n    }, {\n        key: \"ApplyAndCompare\",\n        value: function ApplyAndCompare(goalCtx, workingCtx, phenotype) {\n            var previousWorkingImageData = workingCtx.getImageData(0, 0, phenotype.width, phenotype.height);\n\n            this.ApplyPhenotype(workingCtx, phenotype);\n\n            var subsetGoalImageData = goalCtx.getImageData(0, 0, phenotype.width, phenotype.height);\n            var subsetWorkingImageData = workingCtx.getImageData(0, 0, phenotype.width, phenotype.height);\n\n            var totalError = 0;\n            for (var i = 0; i < subsetGoalImageData.data.length; i++) {\n                var error = Math.abs(subsetGoalImageData.data[i] - subsetWorkingImageData.data[i]);\n                totalError += error;\n            }\n\n            this.Revert(workingCtx, previousWorkingImageData);\n\n            return totalError;\n        }\n    }, {\n        key: \"Clamp\",\n        value: function Clamp(value, min, max) {\n            return Math.max(Math.min(value, max), min);\n        }\n    }, {\n        key: \"RandomNumber\",\n        value: function RandomNumber(min, max) {\n            return Math.random() * (max - min) + min;\n        }\n    }, {\n        key: \"RandomInteger\",\n        value: function RandomInteger(min, max) {\n            min = Math.ceil(min);\n            max = Math.floor(max);\n            return Math.floor(Math.random() * (max - min + 1)) + min;\n        }\n    }, {\n        key: \"Clone\",\n        value: function Clone(o) {\n            if (o === null) return null;\n            var out = Array.isArray(o) ? [] : Object.create(o);\n\n            for (var key in o) {\n                var v = o[key];\n                out[key] = (typeof v === \"undefined\" ? \"undefined\" : _typeof(v)) === \"object\" ? this.Clone(v) : v;\n            }\n\n            return out;\n        }\n    }]);\n\n    return Helpers;\n}();\n\nexports.default = Helpers;\n\n//# sourceURL=webpack://GenAlgo/./src/helpers.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nexports.NewGenAlgo = NewGenAlgo;\n\nvar _helpers = __webpack_require__(/*! ./helpers.js */ \"./src/helpers.js\");\n\nvar _helpers2 = _interopRequireDefault(_helpers);\n\nvar _population = __webpack_require__(/*! ./population.js */ \"./src/population.js\");\n\nvar _population2 = _interopRequireDefault(_population);\n\nvar _polygon = __webpack_require__(/*! ./polygon.js */ \"./src/polygon.js\");\n\nvar _polygon2 = _interopRequireDefault(_polygon);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar GenAlgo = function () {\n    function GenAlgo(size, width, height) {\n        _classCallCheck(this, GenAlgo);\n\n        this.size = size;\n        this.population = new _population2.default(size, {\n            numOfSides: 6,\n            width: width,\n            height: height\n        });\n    }\n\n    _createClass(GenAlgo, [{\n        key: 'testPoly',\n        value: function testPoly(ctx) {\n            _helpers2.default.Clear(ctx, 120, 120);\n            var p1 = new _polygon2.default(3, 120, 120);\n            _helpers2.default.Apply(ctx, p1);\n        }\n    }, {\n        key: 'getCurrentGeneration',\n        value: function getCurrentGeneration() {\n            return this.population.generation;\n        }\n    }, {\n        key: 'runOnce',\n        value: function runOnce(goalCtx, workingCtx, fittestCtx) {\n            this.population.scoreAll(goalCtx, workingCtx);\n\n            var fittest = this.population.getFittest();\n            _helpers2.default.ApplyPhenotype(fittestCtx, fittest);\n\n            var newGen = [];\n            for (var i = 0; i < this.size; i += 2) {\n                var p1 = this.population.selectRandScores();\n                var p2 = this.population.selectRandScores(p1.id);\n\n                var children = p1.breed(p2);\n\n                newGen.push(children[0]);\n                newGen.push(children[1]);\n            }\n\n            this.population.nextGeneration(newGen);\n            return this.population.getNumOfPolygons();\n        }\n    }]);\n\n    return GenAlgo;\n}();\n\nfunction NewGenAlgo(s, w, h) {\n    return new GenAlgo(s, w, h);\n};\n\n//# sourceURL=webpack://GenAlgo/./src/index.js?");

/***/ }),

/***/ "./src/phenotype.js":
/*!**************************!*\
  !*** ./src/phenotype.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _polygon = __webpack_require__(/*! ./polygon.js */ \"./src/polygon.js\");\n\nvar _polygon2 = _interopRequireDefault(_polygon);\n\nvar _helpers = __webpack_require__(/*! ./helpers.js */ \"./src/helpers.js\");\n\nvar _helpers2 = _interopRequireDefault(_helpers);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar MaxNumOfSides = 10;\nvar MutationChance = 0.07;\n\nvar Phenotype = function () {\n    function Phenotype(options) {\n        _classCallCheck(this, Phenotype);\n\n        this.score = null;\n        this.probability = 0;\n        this.generation = options.generation;\n        this.index = options.index;\n        this.id = _helpers2.default.RandomInteger(1, 10000) + \"_\" + this.generation + \"_\" + this.index;\n        this.width = options.width;\n        this.height = options.height;\n\n        if (options.genotype) {\n            this.genotype = options.genotype;\n        } else {\n            this.genotype = [];\n\n            if (options.randSides) this.numOfSides = RandomNumber(3, MaxNumOfSides);else this.numOfSides = options.numOfSides ? options.numOfSides : MaxNumOfSides;\n\n            this._generate(options.numOfPolygons);\n        }\n    }\n\n    _createClass(Phenotype, [{\n        key: 'computeFitness',\n        value: function computeFitness(goalCtx, workingCtx) {\n            _helpers2.default.ApplyPhenotype(workingCtx, this);\n\n            var subsetGoalImageData = goalCtx.getImageData(0, 0, this.width, this.height);\n            var subsetWorkingImageData = workingCtx.getImageData(0, 0, this.width, this.height);\n\n            var totalError = 0;\n            for (var i = 0; i < subsetGoalImageData.data.length; i++) {\n                var error = Math.abs(subsetGoalImageData.data[i] - subsetWorkingImageData.data[i]);\n                totalError += error;\n            }\n\n            _helpers2.default.Clear(workingCtx, this.width, this.height);\n\n            this.score = totalError > 0 ? 1 / totalError : Number.MAX_VALUE;\n        }\n    }, {\n        key: 'breed',\n        value: function breed(other) {\n            var child1geno = this.genotype;\n            var child2geno = other.genotype;\n            var crossoverIndex = _helpers2.default.RandomInteger(0, child1geno.length);\n\n            // Swap the polygons\n            for (var i = 0; i < crossoverIndex; i++) {\n                var tempC1 = child1geno[i];\n                child1geno[i] = child2geno[i];\n                child2geno[i] = tempC1;\n            }\n\n            for (var i = 0; i < child1geno.length; i++) {\n                child1geno[i].tryMutate();\n                child2geno[i].tryMutate();\n            }\n\n            var child1 = new Phenotype({ index: this.index, generation: this.generation + 1, width: this.width, height: this.height, genotype: child1geno });\n            var child2 = new Phenotype({ index: other.index, generation: other.generation + 1, width: this.width, height: this.height, genotype: child2geno });\n\n            return [child1, child2];\n        }\n    }, {\n        key: 'cloneGenotype',\n        value: function cloneGenotype() {\n            var clonedGeno = [];\n\n            for (var i = 0; i < this.genotype.length; i++) {\n                var g = this.genotype[i];\n                clonedGeno.push(new Point(g.X, g.Y));\n            }\n\n            return clonedGeno;\n        }\n    }, {\n        key: '_generate',\n        value: function _generate(numOfPolygons) {\n            for (var i = 0; i < numOfPolygons; i++) {\n                this.genotype.push(new _polygon2.default(this.numOfSides, this.width, this.height));\n            }\n        }\n    }]);\n\n    return Phenotype;\n}();\n\nexports.default = Phenotype;\n\n//# sourceURL=webpack://GenAlgo/./src/phenotype.js?");

/***/ }),

/***/ "./src/point.js":
/*!**********************!*\
  !*** ./src/point.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Point = function () {\n    function Point(x, y) {\n        _classCallCheck(this, Point);\n\n        this.X = x;\n        this.Y = y;\n    }\n\n    _createClass(Point, [{\n        key: \"subtract\",\n        value: function subtract(p) {\n            return new Point(this.X - p.X, this.Y - p.Y);\n        }\n    }, {\n        key: \"add\",\n        value: function add(p) {\n            return new Point(this.X + p.X, this.Y + p.Y);\n        }\n    }]);\n\n    return Point;\n}();\n\nexports.default = Point;\n\n//# sourceURL=webpack://GenAlgo/./src/point.js?");

/***/ }),

/***/ "./src/polygon.js":
/*!************************!*\
  !*** ./src/polygon.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _point = __webpack_require__(/*! ./point.js */ \"./src/point.js\");\n\nvar _point2 = _interopRequireDefault(_point);\n\nvar _helpers = __webpack_require__(/*! ./helpers.js */ \"./src/helpers.js\");\n\nvar _helpers2 = _interopRequireDefault(_helpers);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar MinRadius = 5;\nvar MutationChance = 0.05; //0.07\nvar VerticesMutationStep = 1; //5\nvar ColorMutationStep = 5; //15\nvar AlphaMutationStep = 0.1; //0.3\nvar MaxColor = 255;\nvar MaxAlpha = 1;\n\nvar Polygon = function () {\n    function Polygon(numOfSides, maxWidth, maxHeight) {\n        _classCallCheck(this, Polygon);\n\n        this.vertices = [];\n        this.color = [];\n        this.boundingBox = [];\n        this.numOfSides = numOfSides;\n        this.radius = new _point2.default(_helpers2.default.RandomNumber(MinRadius, maxWidth / 2), _helpers2.default.RandomNumber(MinRadius, maxHeight / 2));\n        this.center = this._getRandomCenterPoint(maxWidth, maxHeight);\n        this.maxWidth = maxWidth;\n        this.maxHeight = maxHeight;\n\n        this._randomize();\n    }\n\n    _createClass(Polygon, [{\n        key: 'getFillStyle',\n        value: function getFillStyle() {\n            return 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ',' + this.color[3] + ')';\n        }\n    }, {\n        key: 'tryMutate',\n        value: function tryMutate() {\n            for (var i = 0; i < this.vertices.length; i++) {\n                if (Math.random() < MutationChance) {\n                    if (Math.random() < 0.5) {\n                        this.vertices[i].X += Math.random() < 0.5 ? VerticesMutationStep : -VerticesMutationStep;\n                        this.vertices[i].X = _helpers2.default.Clamp(this.vertices[i].X, MinRadius, this.maxWidth);\n                    } else {\n                        this.vertices[i].Y += Math.random() < 0.5 ? VerticesMutationStep : -VerticesMutationStep;\n                        this.vertices[i].Y = _helpers2.default.Clamp(this.vertices[i].Y, MinRadius, this.maxHeight);\n                    }\n                }\n            }\n\n            for (var i = 0; i < this.color.length - 1; i++) {\n                if (Math.random() < MutationChance) {\n                    this.color[i] += Math.random() < 0.5 ? ColorMutationStep : -ColorMutationStep;\n                    this.color[i] = _helpers2.default.Clamp(this.color[i], 0, 255);\n                }\n            }\n\n            if (Math.random() < MutationChance) {\n                this.color[3] += Math.random() < 0.5 ? AlphaMutationStep : -AlphaMutationStep;\n                this.color[3] = _helpers2.default.Clamp(this.color[3], 0, 1);\n            }\n        }\n    }, {\n        key: '_randomize',\n        value: function _randomize() {\n            this.vertices = this._createRandomVertices();\n            this.color = this._createRandomColor(100);\n            this.boundingBox = this._getBoundingBox();\n        }\n    }, {\n        key: '_getRandomCenterPoint',\n        value: function _getRandomCenterPoint(width, height) {\n            var minx = 0 + this.radius.X;\n            var maxx = width - this.radius.X;\n            var miny = 0 + this.radius.Y;\n            var maxy = height - this.radius.Y;\n            var x = _helpers2.default.RandomNumber(minx, maxx);\n            var y = _helpers2.default.RandomNumber(miny, maxy);\n\n            return new _point2.default(x, y);\n        }\n    }, {\n        key: '_createRandomColor',\n        value: function _createRandomColor(co) {\n            var c = [];\n            c[0] = co;\n            c[1] = co;\n            c[2] = co;\n            c[3] = _helpers2.default.RandomNumber(0.5, 0.5);\n            return c;\n        }\n    }, {\n        key: '_createRandomColor2',\n        value: function _createRandomColor2() {\n            var c = [];\n            c[0] = _helpers2.default.RandomInteger(0, 255);\n            c[1] = _helpers2.default.RandomInteger(0, 255);\n            c[2] = _helpers2.default.RandomInteger(0, 255);\n            c[3] = _helpers2.default.RandomNumber(0, 1);\n            return c;\n        }\n    }, {\n        key: '_createRandomVertices',\n        value: function _createRandomVertices() {\n            var TwoPI = Math.PI * 2;\n            var angles = [];\n            var verts = [];\n\n            for (var i = 0; i < this.numOfSides; i++) {\n                angles.push(_helpers2.default.RandomNumber(0, TwoPI));\n            }\n\n            angles.sort();\n\n            for (var i = 0; i < angles.length; i++) {\n                var x = this.center.X + this.radius.X * Math.cos(angles[i]);\n                var y = this.center.Y + this.radius.Y * Math.sin(angles[i]);\n\n                verts.push(new _point2.default(x, y));\n            }\n\n            return verts;\n        }\n    }, {\n        key: '_getBoundingBox',\n        value: function _getBoundingBox() {\n            var xMin = Number.MAX_VALUE;\n            var xMax = Number.MIN_VALUE;\n            var yMin = Number.MAX_VALUE;\n            var yMax = Number.MIN_VALUE;\n\n            for (var i = 0; i < this.vertices.length; i++) {\n                var p = this.vertices[i];\n\n                xMin = Math.min(p.X, xMin);\n                xMax = Math.max(p.X, xMax);\n                yMin = Math.min(p.Y, yMin);\n                yMax = Math.max(p.Y, yMax);\n            }\n\n            var width = xMax - xMin;\n            var height = yMax - yMin;\n\n            return [new _point2.default(xMin, yMin), width, height];\n        }\n    }]);\n\n    return Polygon;\n}();\n\nexports.default = Polygon;\n\n//# sourceURL=webpack://GenAlgo/./src/polygon.js?");

/***/ }),

/***/ "./src/population.js":
/*!***************************!*\
  !*** ./src/population.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _phenotype = __webpack_require__(/*! ./phenotype.js */ \"./src/phenotype.js\");\n\nvar _phenotype2 = _interopRequireDefault(_phenotype);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Population = function () {\n\tfunction Population(size, phenotypeOptions) {\n\t\t_classCallCheck(this, Population);\n\n\t\tthis.size = size;\n\t\tthis.population = [];\n\t\tthis.generation = 1;\n\t\tthis.probabilitiesCalced = false;\n\t\tthis._generate(phenotypeOptions || {});\n\t}\n\n\t_createClass(Population, [{\n\t\tkey: 'scoreAll',\n\t\tvalue: function scoreAll(goalCtx, workingCtx) {\n\t\t\tfor (var i = 0; i < this.size; i++) {\n\t\t\t\tthis.population[i].computeFitness(goalCtx, workingCtx);\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'selectRoulette',\n\t\tvalue: function selectRoulette(excludedId) {\n\t\t\tthis._calculateRouletteProbabilities();\n\n\t\t\tvar prob = Math.random();\n\t\t\tfor (var i = 0; i < this.population.length; i++) {\n\t\t\t\tif (i + 1 === this.population.length) {\n\t\t\t\t\treturn this.population[i];\n\t\t\t\t}\n\n\t\t\t\tif (prob > this.population[i].probability && prob < this.population[i + 1].probability) {\n\t\t\t\t\tif (this.population[i].id === excludedId) {\n\t\t\t\t\t\treturn this.population[i + 1];\n\t\t\t\t\t} else {\n\t\t\t\t\t\treturn this.population[i];\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'selectRandScores',\n\t\tvalue: function selectRandScores(excludedId) {\n\t\t\tvar weightedScores = [];\n\n\t\t\tfor (var i = 0; i < this.population.length; i++) {\n\t\t\t\tvar rand = Math.random();\n\t\t\t\tweightedScores[i] = rand * this.population[i].score;\n\t\t\t}\n\n\t\t\tvar best = null;\n\t\t\tvar bestScore = Number.MAX_VALUE;\n\t\t\tfor (var j = 0; j < weightedScores.length; j++) {\n\t\t\t\tif (weightedScores[j] < bestScore && excludedId !== this.population[j].id) {\n\t\t\t\t\tbest = this.population[j];\n\t\t\t\t\tbestScore = weightedScores[j];\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn best;\n\t\t}\n\t}, {\n\t\tkey: 'getFittest',\n\t\tvalue: function getFittest() {\n\t\t\tthis.population.sort(this._compareForFittest);\n\n\t\t\treturn this.population[0];\n\t\t}\n\t}, {\n\t\tkey: 'nextGeneration',\n\t\tvalue: function nextGeneration(gen) {\n\t\t\tthis.population = gen;\n\t\t\tthis.probabilitiesCalced = false;\n\t\t\tthis.generation++;\n\t\t}\n\t}, {\n\t\tkey: 'getNumOfPolygons',\n\t\tvalue: function getNumOfPolygons() {\n\t\t\treturn this.population[0].genotype.length;\n\t\t}\n\t}, {\n\t\tkey: '_calculateRouletteProbabilities',\n\t\tvalue: function _calculateRouletteProbabilities() {\n\t\t\tif (!this.probabilitiesCalced) {\n\t\t\t\tvar scoreSum = 0;\n\t\t\t\tvar probabilitySum = 0;\n\t\t\t\tfor (var i = 0; i < this.population.length; i++) {\n\t\t\t\t\tscoreSum += this.population[i].score;\n\t\t\t\t}\n\n\t\t\t\tfor (var i = 0; i < this.population.length; i++) {\n\t\t\t\t\tvar probability = probabilitySum + this.population[i].score / scoreSum;\n\t\t\t\t\tprobabilitySum += probability;\n\t\t\t\t\tthis.population[i].probability = probability;\n\t\t\t\t}\n\n\t\t\t\tthis.population.sort(this._compareForProbability);\n\t\t\t\tthis.probabilitiesCalced = true;\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: '_compareForProbability',\n\t\tvalue: function _compareForProbability(a, b) {\n\t\t\tif (a.probability < b.probability) return 1;\n\t\t\tif (a.probability > b.probability) return -1;\n\t\t\treturn 0;\n\t\t}\n\t}, {\n\t\tkey: '_compareForFittest',\n\t\tvalue: function _compareForFittest(a, b) {\n\t\t\tif (a.score > b.score) return 1;\n\t\t\tif (a.score < b.score) return -1;\n\t\t\treturn 0;\n\t\t}\n\t}, {\n\t\tkey: '_generate',\n\t\tvalue: function _generate(options) {\n\t\t\tfor (var i = 0; i < this.size; i++) {\n\t\t\t\toptions.index = i;\n\t\t\t\toptions.generation = this.generation;\n\t\t\t\toptions.numOfPolygons = 50;\n\t\t\t\tthis.population.push(new _phenotype2.default(options));\n\t\t\t}\n\t\t}\n\t}]);\n\n\treturn Population;\n}();\n\nexports.default = Population;\n\n//# sourceURL=webpack://GenAlgo/./src/population.js?");

/***/ })

/******/ });
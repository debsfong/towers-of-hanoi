/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	let HanoiGame = __webpack_require__(1);
	let HanoiView = __webpack_require__(2);

	$( () => {
	  const rootEl = $('.hanoi');
	  const game = new HanoiGame();
	  game.towers = [[], [], [3,2,1]];
	  new HanoiView(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[3, 2, 1], [], []];
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];

	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length == 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }

	  print() {
	      console.log(JSON.stringify(this.towers));
	  }

	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx)
	        });
	      });
	  }

	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }

	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class View {
	  constructor (game, $el) {
	    this.game = game;
	    this.$el = $el;
	    this.firstTower = undefined;
	    this.setUpTowers();
	    this.render();
	  }

	  setUpTowers() {
	    for (var i = 0; i < 3; i++) {
	      let $ul = $(`<ul id="${i}"></ul>`);
	      this.$el.append($ul);
	      this.bindEvents($ul);
	      for (var j = 0; j < 3; j++) {
	        let $li = $("<li>");
	        $ul.append($li);
	      }
	    }
	  }

	  bindEvents($ul) {
	    $ul.hover(() => {
	      $ul.css('border-color', 'blue');
	    }, () => {
	      $ul.css('border-color', '');
	    });
	    $ul.on("click", event => {
	      this.clickTower($ul);
	    });
	  }

	  clickTower($ul) {
	    //check for first tower
	    if (this.firstTower != undefined) {
	      //if first tower, make move with second tower and reset first tower
	      let secondTower = parseInt($ul.attr('id'));
	      $("ul").removeClass('selected');
	      if (!this.game.move(this.firstTower, secondTower)) {
	        alert('Invalid Move');
	        this.firstTower = undefined;
	      } else {
	        this.firstTower = undefined;
	        this.render();
	        if (this.game.isWon()) {
	          alert('You are so awesome!');
	        }
	      }
	    } else {
	      //else set first tower
	      this.firstTower = parseInt($ul.attr('id'));
	      $ul.addClass('selected');
	    }
	  }

	  render() {
	    // this.game.towers[tower_id][disk_id] add class${disk_id} to li
	    for (var i = 0; i < 3; i++) {
	      for (var j = 0; j < 3; j++) {
	        let disc_id = this.game.towers[i][j];
	        if (disc_id) {
	          let $ul = $(`#${i}`);
	          let children = $ul.children();
	          $(children[j]).addClass(`disk${disc_id}`);
	        } else {
	          let $ul = $(`#${i}`);
	          let children = $ul.children();
	          $(children[j]).removeClass();
	        }
	      }
	    }
	  }
	}

	module.exports = View;


/***/ }
/******/ ]);
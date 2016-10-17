let HanoiGame = require('./game.js');
let HanoiView = require('./view.js');

$( () => {
  const rootEl = $('.hanoi');
  const game = new HanoiGame();
  game.towers = [[], [], [3,2,1]];
  new HanoiView(game, rootEl);
});

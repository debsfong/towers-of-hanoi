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
      if (!this.game.move(this.firstTower, secondTower)) {
        alert('Invalid Move');
        this.firstTower = undefined;
      } else {
        this.firstTower = undefined;
        this.render();
      }
    } else {
      //else set first tower
      this.firstTower = parseInt($ul.attr('id'));
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
    if (this.game.isWon()) {
      alert('You are so awesome!');
    }
  }
}

module.exports = View;

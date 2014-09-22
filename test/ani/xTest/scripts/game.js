var Game = {};

Game.fps = 50;

Game.initialize = function() {
  console.log("game.init req");
  this.entities = [];
  this.context = document.getElementById("viewport").getContext("2d");
};

Game.draw = function() {
  console.log("draw req");
  this.context.clearRect(0, 0, 640, 480);

  for (var i=0; i < this.entities.length; i++) {
    this.entities[i].draw(this.context);
  }
};

Game.update = function() {
  console.log("update req");
  for (var i=0; i < this.entities.length; i++) {
    this.entities[i].update();
  }
};

Game.addRect = function() {
  Game.entities.push(new Rect());
};

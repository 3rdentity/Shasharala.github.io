//TODO Game.render and Game.update will be split into different types, depending on gametype. Create sideScroll & isometric update/render functions.
var Options = {
  sideScroll: {
    fps: 60,
    slowScale: 1,
    update: undefined,
    render: undefined
  },
  topDown: {
    fps: 60,
    slowScale: 1,
    update: Game.update,
    render: Game.render
  },
  isometric: {
    fps: 60,
    slowScale: 1,
    update: undefined,
    render: undefined
  }
  //fps?
};


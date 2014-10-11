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
  //will isometry work with this engine?
  isometric: {
    fps: 60,
    slowScale: 1,
    update: undefined,
    render: undefined
  },
  //will an fps work with this engine?
  fps: {
    fps: 60,
    slowScale: 1,
    update: undefined,
    render: undefined
  }
};


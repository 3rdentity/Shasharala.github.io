// Copyright 2013 William Malone (www.williammalone.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

(function () {

  var coin,
  coinImage,
  canvas;

  function gameLoop () {

  window.requestAnimationFrame(gameLoop);

  coin.update();
  coin.render();
  }

  function sprite (options) {

  var that = {},
    frameIndex = 0,
    tickCount = 0,
    ticksPerFrame = options.ticksPerFrame || 0,
    numberOfFrames = options.numberOfFrames || 1;

  that.context = options.context;
  that.width = options.width;
  that.height = options.height;
  that.image = options.image;

  that.update = function () {

      tickCount += 1;

      if (tickCount > ticksPerFrame) {

    tickCount = 0;

        // If the current frame index is in range
        if (frameIndex < numberOfFrames - 1) {
          // Go to the next frame
          frameIndex += 1;
        } else {
          frameIndex = 0;
        }
      }
    };

  that.render = function () {

    // Clear the canvas
    that.context.clearRect(0, 0, that.width*4, that.height*4);

    // Draw the animation
    that.context.drawImage(
    that.image,
    frameIndex * that.width / numberOfFrames,
    0,
    that.width / numberOfFrames,
    that.height,
    0,
    0,
    that.width / numberOfFrames * 4,
    that.height * 4);
  };

  return that;
  }

  // Get canvas
  canvas = document.getElementById("coinAnimation");
  canvas.width = 100;
  canvas.height = 100;

  // Create sprite sheet
  coinImage = new Image();

  // Create sprite
  coin = sprite({
  context: canvas.getContext("2d"),
  width: 234,
  height: 25,
  image: coinImage,
  numberOfFrames: 10,
  ticksPerFrame: 4
  });
  console.log(coin);

  // Load sprite sheet
  coinImage.addEventListener("load", gameLoop);
  coinImage.src = "images/rabbitLink.png";

} ());


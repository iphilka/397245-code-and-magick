'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_COLOUR = 'white';
var CLOUD_SHADOW_COLOUR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_SHADOW_GAP = 10;
var CLOUD_HEADER_TOP_MARGIN = 35;
var CLOUD_TEXT_GAP = 15;
var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;
var BAR_GAP = 50;
var BAR_BOTTOM_MARGIN = 40;
var BAR_TOP_MARGIN = 5;
var BAR_TEXT_BOTTOM_MARGIN = 25;

var renderCloud = function (ctx, x, y) {
  ctx.fillStyle = CLOUD_SHADOW_COLOUR;
  ctx.fillRect(x + CLOUD_SHADOW_GAP, y + CLOUD_SHADOW_GAP, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fillStyle = CLOUD_COLOUR;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fill();
  ctx.fillStyle = 'black';
  ctx.shadowColor = 'rgba(0, 0, 0, 0)';
  ctx.font = '16px PT Mono';
  ctx.textAlign = 'center';
  ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + CLOUD_HEADER_TOP_MARGIN);
  ctx.fillText('Список результатов:', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + CLOUD_HEADER_TOP_MARGIN + CLOUD_TEXT_GAP);
};

var getMaxElement = function (results) {
  var maxElement = results[0];
  for (var i = 0; i < results.length; i++) {
    if (results[i] > maxElement) {
      maxElement = results[i];
    }
  }
  return maxElement;
};

var getRandomColor = function () {
  var barColor = 'hsl(240,' + Math.round(Math.random() * 100) + '%,50%)';
  return barColor;
};

var renderBar = function (ctx, results, counter) {
  var maxTime = getMaxElement(results);
  var barHeight = BAR_MAX_HEIGHT * (results[counter] / maxTime);
  ctx.fillRect(CLOUD_X + BAR_GAP * (counter + 1) + BAR_WIDTH * counter, CLOUD_Y + CLOUD_HEIGHT - BAR_BOTTOM_MARGIN - barHeight, BAR_WIDTH, barHeight);

};

var renderBarText = function (ctx, players, results, counter, textColor) {
  ctx.fillStyle = textColor;
  var maxTime = getMaxElement(results);
  var barHeight = BAR_MAX_HEIGHT * (results[counter] / maxTime);
  ctx.fillText(players[counter], CLOUD_X + BAR_GAP * (counter + 1) + BAR_WIDTH * (counter + 0.5), CLOUD_Y + CLOUD_HEIGHT - BAR_TEXT_BOTTOM_MARGIN);
  ctx.fillText(Math.round(results[counter]), CLOUD_X + BAR_GAP * (counter + 1) + BAR_WIDTH * (counter + 0.5), CLOUD_Y + CLOUD_HEIGHT - BAR_BOTTOM_MARGIN - barHeight - BAR_TOP_MARGIN);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X, CLOUD_Y);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = getRandomColor();
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    renderBar(ctx, times, i);
    renderBarText(ctx, names, times, i, 'black');
  }
};

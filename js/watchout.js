// start slingin' some d3 here.

// create game board
var svg = d3.select('svg');

// game stats
var score = 0;
var bestScore = 0;

// handle score display
var updateScore = function(){
  d3.select('.cscore')
    .text(score.toString());
}

// handle high score display
var updateBestScore = function(){
  bestScore = _.max([score, bestScore]);
  d3.select('.hscore')
    .text(bestScore.toString());
};

// create player data
var createPlayer = function(){
  return [{
    id: 'player',
    x: 480,
    y: 287
  }];
};

// visualize player data
var renderPlayer = function(playerData){
  var player = svg.selectAll('rect')
    .data(playerData, function(player){ return player.id; });

  player.enter()
    .append('rect')
      .attr('class', 'player')
      .attr('x', function(px){ return px.x;})
      .attr('y', function(py){ return py.y;})
      .attr('width', 12)
      .attr('height', 12)
      .attr('fill', 'red');

  player.exit().remove();
};

// handle player movement
svg.on('mousemove', function(d){
  svg.select('rect')
    .attr('x', function(d){
      return d.x = d3.mouse(this)[0];
    })
    .attr('y', function(d){
      return d.y = d3.mouse(this)[1];
    });
});


// create enemy data
var createCircles = function(n){
  return _.range(0, n).map(function(i){
    return {
      id: i,
      x: Math.round(Math.random() * 955),
      y: Math.round(Math.random() * 570)
    };
  });
};

// visualize enemy data
var renderCircles = function(circleData){
  var circles = svg.selectAll('circle')
    .data(circleData, function(circle){ return circle.id; });

  circles.enter()
    .append('circle')
      .attr('class', 'enemy')
      .attr('cx', function(circle){ return circle.x; })
      .attr('cy', function(circle){ return circle.y; })
      .attr('r', 6)
      .attr('color', 'black');

  circles.exit().remove();
};

// create randomized enemy movement
var moveCircles = function(){
  // target all circles
  var circles = svg.selectAll('circle');

  // set new random position for each circle
  // transition animation between old position and new position
  circles.transition()
    .attr('cx', function(){ return Math.round(Math.random() * 955) })
    .attr('cy', function(){ return Math.round(Math.random() * 570) })
    .duration(2000);
};

// _.each(players, function(player) {
//   var radiusSum = parseFloat(enemy.attr('r')) + player.r;
//
//   var xDiff = parseFloat(enemy.attr('cx')) - player.x;
//   var yDiff = parseFloat(enemy.attr('cy')) - player.y;
//
//   var separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
//
//   if (separation < radiusSum) {
//     return collidedCallback(player, enemy);
//   }
// });
//
// detect player and enemy collisions
var onCollision = function(){
  updateBestScore();
  score = 0;
  updateScore();
};

var detectCollisions = function(enemyData, callback){
  var enemies = d3.selectAll('circle');

  var player_x = parseInt(d3.select('rect').x);
  var player_y = parseInt(d3.select('rect').y);

  _.each(enemies, function(enemy){
    var enemy_x = parseInt(enemy.cx);
    var enemy_y = parseInt(enemy.cy);

    var xDiff = enemy_x - player_x;
    var yDiff = enemy_y - player_y;

    var separation = Math.sqrt(Math.pow(xDiff, 2)+ Math.pow(yDiff, 2));

    if (separation < 12) {
      return callback();
    }
  })
};

// initialize game
var playGame = function(){
  var newCirclePositions = createCircles(25);
  renderCircles(newCirclePositions);
  setInterval(moveCircles, 2000);

  var newPlayer = createPlayer();
  renderPlayer(newPlayer);

  var increaseScore = function(){
    score += 1;
    updateScore();
  }

  setInterval(increaseScore, 75);
  setInterval(detectCollisions, 10);
};

playGame();

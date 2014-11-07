// start slingin' some d3 here.

// create game board
var svg = d3.select('svg');

// create circles
var createCircles = function(n){
  return _.range(0, n).map(function(i){
    return {
      id: i,
      x: Math.random() * 955,
      y: Math.random() * 570
    };
  });
};

var renderCircles = function(circleData){
  var circles = svg.selectAll('circle')
    .data(circleData, function(circle){ return circle.id; });
  console.log(circles);
  circles.enter()
    .append('circle')
      .attr('class', 'enemy')
      .attr('cx', function(circle){ return circle.x; })
      .attr('cy', function(circle){ return circle.y; })
      .attr('r', 6)
      .attr('color', 'black');

  circles.exit().remove();
};

var moveCircles = function(){
  // target all circles
  var circles = svg.selectAll('circle');

  // set new random position for each circle
  // transition animation between old position and new position

  circles.transition()
    .attr('cx', function(){ return Math.random() * 955 })
    .attr('cy', function(){ return Math.random() * 570 })
    .duration(2000);

};

var playGame = function(){
  var newCirclePositions = createCircles(25);
  renderCircles(newCirclePositions);
  setInterval(moveCircles, 2000);
};

playGame();

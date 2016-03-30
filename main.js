$(function(){
  console.log("OK");

  var weightByDate = [
    {w: 102.8, d: "2016-02-22"},
    {w: 102.3, d: "2016-02-23"},
    {w: 101.7, d: "2016-02-24"},
  ];

  var format = d3.time.format("%Y-%m-%d");

  var line = d3.svg.line()
    .x(function(d) { return x(d.d); })
    .y(function(d) { return y(d.w); });

  var vis = d3.select("#visualisation");
  var xRange = d3.scale.linear().range([40, 400]).domain([0,110]);
  var yRange = d3.scale.linear().range([400, 40]).domain([0,110]);
  var xAxis = d3.svg.axis().scale(xRange);
  var yAxis = d3.svg.axis().scale(yRange).orient("left");
  vis.append("svg:g").call(xAxis).attr("transform", "translate(0,400)");
  vis.append("svg:g").call(yAxis).attr("transform", "translate(40,0)");
});
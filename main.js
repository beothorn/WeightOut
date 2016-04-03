$(function(){
  console.log("OK");

  var dataset = [
    {w: 102.8, d: "2016-02-22"},
    {w: 102.3, d: "2016-02-23"},
    {w: 101.7, d: "2016-02-24"},
    {w: 50.7,  d: "2016-02-30"}
  ];

  var chartContainerWidth = "1000px";
  var chartContainerHeight = "500px";

  var rangeXStart = 40;
  var rangeXEnd = 600;

  var rangeYStart = 400;
  var rangeYEnd = 40;

  var formatDate = d3.time.format("%Y-%m-%d");

  var weightByDateContainer = d3.select("body").append("div");

  var chartSVG = weightByDateContainer
    .append("svg")
    .attr("width", chartContainerWidth)
    .attr("height", chartContainerHeight);

  var dateFun = function(d){return formatDate.parse(d.d)};
  var xRange = d3
    .time
    .scale()
    .range([rangeXStart, rangeXEnd])
    .domain(d3.extent(dataset, dateFun));

  var weigthFun = function(d){return d.w};
  var yRange = d3
    .scale
    .linear()
    .range([rangeYStart, rangeYEnd])
    .domain([0, d3.max(dataset, weigthFun)]);

  var xAxis = d3
    .svg
    .axis()
    .scale(xRange);

  var yAxis = d3
    .svg
    .axis()
    .scale(yRange)
    .orient("left");
  
  weightByDateContainer.append("h1").text("Weight by date");
  chartSVG
    .append("g")
    .attr("class", "axis")
    .text("Date")
    .call(xAxis)
    .attr("transform", "translate(0,"+rangeYStart+")");

  chartSVG
    .append("g")
    .attr("class", "axis")
    .call(yAxis)
    .attr("transform", "translate("+rangeXStart+",0)");

  var lineFun = d3.svg.line()
    .x(function(d) { return xRange(formatDate.parse(d.d)); })
    .y(function(d) { return yRange(d.w); });

    
  chartSVG.append("path")
      .attr("class", "line")
      .attr("d", lineFun(dataset));

});
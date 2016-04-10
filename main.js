Date.prototype.toDateInputValue = (function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0,10);
});

var datasetToLoad = [
  {w: 102.8, d: "2016-02-22"},
  {w: 102.3, d: "2016-02-23"},
  {w: 101.7, d: "2016-02-24"},
  {w: 101.9, d: "2016-02-25"},
  {w: 100.5, d: "2016-02-26"},
  {w: 101.8, d: "2016-02-28"},
  {w:  99.8, d: "2016-02-29"},
  {w: 100.1, d: "2016-03-01"},
  {w:  99.3, d: "2016-03-02"},
  {w:  99.2, d: "2016-03-03"},
  {w:  98.5, d: "2016-03-04"},
  {w:  99.1, d: "2016-03-05"},
  {w:  98.7, d: "2016-03-06"},
  {w:  98.2, d: "2016-03-07"},
  {w:  99.0, d: "2016-03-09"},
  {w:  98.3, d: "2016-03-10"},
  {w:  97.2, d: "2016-03-11"},
  {w:  96.8, d: "2016-03-12"},
  {w:  97.8, d: "2016-03-14"},
  {w:  97.2, d: "2016-03-15"},
  {w:  95.9, d: "2016-03-16"},
  {w:  95.8, d: "2016-03-17"},
  {w:  95.1, d: "2016-03-18"},
  {w:  95.3, d: "2016-03-19"},
  {w:  95.7, d: "2016-03-21"},
  {w:  95.4, d: "2016-03-22"},
  {w:  94.0, d: "2016-03-23"},
  {w:  93.7, d: "2016-03-24"},
  {w:  93.3, d: "2016-03-25"},
  {w:  93.9, d: "2016-03-26"},
  {w:  93.3, d: "2016-03-27"},
  {w:  93.7, d: "2016-03-28"},
  {w:  93.1, d: "2016-03-29"},
  {w:  91.5, d: "2016-03-30"},
  {w:  92.0, d: "2016-03-31"},
  {w:  91.1, d: "2016-04-01"},
  {w:  90.8, d: "2016-04-02"},
  {w:  91.9, d: "2016-04-03"}
];

function setupWeightLineChart(dataset){
  var width = 600;
  var height = 400;
  var margin = 40;

  var svgId = "weightSVGChart";
  var weightLineDiv = "#weigthLineChartContainer";

  d3.selectAll("#"+svgId).remove();

  var targetWeight = 66;

  var rangeXStart = margin;
  var rangeXEnd = width - margin;

  var rangeYStart = height - margin;
  var rangeYEnd = margin;

  var formatDate = d3.time.format("%Y-%m-%d");

  var weightByDateContainer = d3.select(weightLineDiv);

  var chartSVG = weightByDateContainer
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin")
    .attr("viewBox", "0 0 "+width+" "+height)
    .attr("id", svgId);

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
    .domain([targetWeight, d3.max(dataset, weigthFun)]);

  var xAxis = d3
    .svg
    .axis()
    .scale(xRange);

  var yAxis = d3
    .svg
    .axis()
    .scale(yRange)
    .orient("left");
  
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
}

$(function(){
  console.log("OK");

  $('#datePicker').val(new Date().toDateInputValue());
  $('#weightPicker').val(datasetToLoad[datasetToLoad.length-1].w);

  Persistence.doAfterLoad(function(){
    datasetToLoad.forEach(function(x){Persistence.add(x)});
    Persistence.readAll(function(values){
      setupWeightLineChart(values);
    });
  });

  $("#enterWeight").click(function(){
    var date = $("#datePicker").val();
    var weight = $("#weightPicker").val();
    Persistence.add({w:parseFloat(weight), d:date},function(){
      Persistence.readAll(function(values){
        setupWeightLineChart(values);
      });
    });
  });

});
var ChartByDateView = (function(){
    this.chartContainer = "#chartContainer";
    
    var loadValues = function(dataset){

      var svgId = "weightSVGChart";

      var width = 600;
      var height = 400;
      var margin = 40;

      var rangeMargin = 5;

      var weightLineDiv = this.chartContainer;

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
        .domain([d3.min(dataset, weigthFun)-rangeMargin, d3.max(dataset, weigthFun)+rangeMargin]);

      var xAxis = d3
        .svg
        .axis()
        .ticks(d3.time.days, 1)
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
        
      var lastPoint = { setAttribute:function(){}};

      chartSVG
          .selectAll("circle")
          .data(dataset)
          .enter()
          .append("circle")
          .attr("cx", function(v){return xRange(formatDate.parse(v.d));})
          .attr("cy", function(v){return yRange(v.w);})
          .attr("r",7)
          .attr("style","fill:#ffffff;stroke:#00005c;stroke-width:2")
          .on("click", function(dataPoint, index){
              lastPoint.setAttribute("style", "fill:#ffffff;stroke:#00005c;stroke-width:2");
              lastPoint = this;
              this.setAttribute("style", "fill:#cccccc;stroke:#00005c;stroke-width:2");
              document.querySelector("#dataPointDescription .weight").innerHTML = "";
              document.querySelector("#dataPointDescription .weight").appendChild(document.createTextNode(dataPoint.w+" kg"));
              document.querySelector("#dataPointDescription .date").innerHTML = "";
              document.querySelector("#dataPointDescription .date").appendChild(document.createTextNode(dataPoint.d));
              document.getElementById("dataPointDescription").style.display = "block";
          })
      ;

    }.bind(this);

    return{
        loadValues:loadValues
    }
})();
var ChartByDateView = (function(dispatcher){    
    
    var setup = function(){
        this.volatileDataset = [];
        this.startPeriodDatePicker = "startPeriodDatePicker";
        this.endPeriodDatePicker = "endPeriodDatePicker";

        this.chartContainer = "#byDateChart";

        this.formatDate = d3.time.format("%Y-%m-%d");

        this.onChangePeriod = function(){
            updateChart(document.getElementById(this.startPeriodDatePicker).value, document.getElementById(endPeriodDatePicker).value);
        }.bind(this);

        var onChangePeriod = this.onChangePeriod;

        $("#"+this.startPeriodDatePicker).change(function(){
            onChangePeriod();
        });

        $("#"+this.endPeriodDatePicker).change(function(){
            onChangePeriod();
        });
    }.bind(this);

    var setPeriodOnFields = function(period){
      $('#'+this.startPeriodDatePicker).val(period[0].toDateInputValue());
      $('#'+this.startPeriodDatePicker).parent().find("label").toggleClass("active");
      $('#'+this.endPeriodDatePicker).val(period[1].toDateInputValue());
      $('#'+this.endPeriodDatePicker).parent().find("label").toggleClass("active");
    }.bind(this);

    var updateChart = function(startPeriod, endPeriod){
      
      if(startPeriod === "" || endPeriod === "") return;

      var formatDate = this.formatDate;

      var dateMaxMin = [formatDate.parse(startPeriod), formatDate.parse(endPeriod)];

      var dataset = this.volatileDataset.filter(function(val){
          var date = formatDate.parse(val.d);
          return date >= formatDate.parse(startPeriod);
      }).filter(function(val){
          var date = formatDate.parse(val.d);
          return date <= formatDate.parse(endPeriod);
      });

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

      var weightByDateContainer = d3.select(weightLineDiv);

      var chartSVG = weightByDateContainer
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin")
        .attr("viewBox", "0 0 "+width+" "+height)
        .attr("id", svgId);

      var xRange = d3
        .time
        .scale()
        .range([rangeXStart, rangeXEnd])
        .domain(dateMaxMin);

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
              dispatcher.updateModalWithValue(dataPoint);
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
    };

    var loadValues = function(dataset){

      if(dataset.length == 0) return;

      this.volatileDataset = dataset;

      var formatDate = this.formatDate;

      var dateFun = function(d){return formatDate.parse(d.d)};
      var dateMaxMin = d3.extent(dataset, dateFun);

      $('#'+this.startPeriodDatePicker).val(new Date().toDateInputValue());
      $('#'+this.endPeriodDatePicker).val(new Date().toDateInputValue());

      setPeriodOnFields(dateMaxMin);

      this.onChangePeriod();
    }.bind(this);

    return{
        loadValues:loadValues,
        setup:setup
    }
})(Dispatcher);
var WeightVarianceChart = (function(){
    
    var setup = function(){
        this.formatDate = d3.time.format("%Y-%m-%d");
        this.chartContainer = "#weightVarianceChart";
    };

    var loadValues = function(values){
      var formatDate = this.formatDate;

    };

    return {
        setup:setup,
        loadValues:loadValues
    };
})();
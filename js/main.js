Date.prototype.toDateInputValue = (function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0,10);
});



$(function(){

  Renderer.renderTabs({
    "overview":"Overview",
    "values":"Values",
    "charts":{
      "category":"Charts",
      "subCategories":{
        "bydate":"By Date",
//        "variation":"Variation",
//        "variationByWeekday":"Week day variation",
//        "bmi":"BMI"
      }
    },
    "settings":"Settings"
  });

  $("#hamburguerButton").sideNav();
  $('.modal-trigger').leanModal();
  $('#datePicker').val(new Date().toDateInputValue());
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 1, // Creates a dropdown of 15 years to control year
    format: 'yyyy-mm-dd',
    container: 'body'
  });

  $(window).on('hashchange',function(){ 
    var view = location.hash.slice(1);
    Renderer.bringPanelUp(view);
  });

  Persistence.doAfterLoad(function(){
    //Render overview
  });

  $("#enterWeight").click(function(){
    var date = $("#datePicker").val();

    var kgInput = $("#weightUnit").val() || "0";
    var gramsInput = $("#weightDecimal").val() || "0";

    var kg = parseFloat(kgInput);
    var grams = parseFloat(gramsInput/10);

    var weight = kg + grams;
    Persistence.add({w:weight, d:date},function(){
      Persistence.readAll(function(values){
        Charts.setupWeightLineChart(values);
        ValuesView.render(values);
      });
    });
  });

});
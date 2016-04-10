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
        "variation":"Variation",
        "variationByWeekday":"Week day variation",
        "bmi":"BMI"
      }
    },
    "settings":"Settings"
  });

  $(".button-collapse").sideNav();
  $('.modal-trigger').leanModal();
  $('#datePicker').val(new Date().toDateInputValue());
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 1, // Creates a dropdown of 15 years to control year
    format: 'yyyy-mm-dd',
    container: 'body'
  });

  $(window).on('hashchange',function(){ 
    console.log(location.hash.slice(1));
  });

  Persistence.doAfterLoad(function(){
    Persistence.readAll(function(values){
      Charts.setupWeightLineChart(values);
    });
  });

  $("#enterWeight").click(function(){
    var date = $("#datePicker").val();
    var weight = parseFloat($("#weightUnit").val())+parseFloat($("#weightDecimal").val());
    Persistence.add({w:weight, d:date},function(){
      Persistence.readAll(function(values){
        Charts.setupWeightLineChart(values);
      });
    });
  });

});
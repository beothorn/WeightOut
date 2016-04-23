Date.prototype.toDateInputValue = (function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0,10);
});

$(function(){

  $("#hamburguerButton").sideNav();
  $('.modal-trigger').leanModal();
  $('#datePicker').val(new Date().toDateInputValue());
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 1, // Creates a dropdown of 15 years to control year
    format: 'yyyy-mm-dd',
    container: 'body'
  });

  Persistence.doAfterLoad(function(){
    Dispatcher.loadValues();
  });
});
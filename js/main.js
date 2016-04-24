$(function(){

  $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 1, // Creates a dropdown of 15 years to control year
      format: 'yyyy-mm-dd',
      container: 'body'
  });

  $(window).on('hashchange',function(){ 
      var view = location.hash.slice(1);
      if(view === "" || view === "!") return;
      Dispatcher.bringPanelUp(view);
  });

  Dispatcher.startApp();
});
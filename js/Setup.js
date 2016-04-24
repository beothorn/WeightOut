Date.prototype.toDateInputValue = (function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0,10);
});

var dateWithoutSpecialChars = function(date){
    return "val"+date.split("-").join("");
};
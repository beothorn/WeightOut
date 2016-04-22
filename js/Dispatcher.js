var Dispatcher = (function(){

    var deleteValue = function(value){
        Persistence.readAll(function(values){
            Persistence.remove(value.d);
            ValuesView.remove(value);
        });
    };

    var loadValues = function(){
        Persistence.readAll(function(values){
            ValuesView.setValues(values);
            var lastValue = values[values.length - 1].w;
            AddValueModalView.setValue(lastValue);
        });
    };

    return {
        deleteValue:deleteValue,
        loadValues:loadValues
    };
})();
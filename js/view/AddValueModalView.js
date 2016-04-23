var AddValueModalView = (function(dispatcher){
   
    $("#enterWeight").click(function(){
        var date = $("#datePicker").val();

        var kgInput = $("#weightUnit").val() || "0";
        var gramsInput = $("#weightDecimal").val() || "0";

        var kg = parseFloat(kgInput);
        var grams = parseFloat(gramsInput/10);

        var weight = kg + grams;
        
        dispatcher.addValue(weight, date);
    });

    $("#weightUnitRange").change(function(){
       $("#weightUnit").val($("#weightUnitRange").val());
    });

    $("#weightDecimalRange").change(function(){
       $("#weightDecimal").val($("#weightDecimalRange").val());
    });

    $("#weightDecimal").change(function(){
       $("#weightDecimal").val( Math.max($("#weightDecimalRange").val(),9));
    });

    var setValue = function(val){
        var weightSplitted = (val+"").split(".");
        document.getElementById("weightUnit").value = weightSplitted[0];
        document.getElementById("weightDecimal").value = weightSplitted[1];
        range = document.getElementById("weightUnitRange");
        range.setAttribute("min", Math.max((val - 5),0)  );
        range.setAttribute("max", val + 5);
    };

    return {
        setValue:setValue
    }; 
})(Dispatcher);
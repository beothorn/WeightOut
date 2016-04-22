var AddValueModalView = (function(){
   
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
                ValuesView.setValues(values);
            });
        });
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
})();
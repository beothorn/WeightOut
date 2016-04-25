var AddValueModalView = (function(dispatcher){
    
    var setup = function(){
        $('.modal-trigger').leanModal();

        $('#datePicker').val(new Date().toDateInputValue());
        $('#datePicker').parent().find("label").toggleClass("active");

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
    };

    var setWeigth = function(val){
        var weightSplitted = (val+"").split(".");
        document.getElementById("weightUnit").value = weightSplitted[0];
        document.getElementById("weightDecimal").value = weightSplitted[1];
        range = document.getElementById("weightUnitRange");
        range.setAttribute("min", Math.max((val - 5),0)  );
        range.setAttribute("max", val + 5);
    };

    var setDate = function(date){
        document.getElementById("datePicker").value = date;
    };

    var setValue = function(value){
      setWeigth(value.w);
      setDate(value.d);  
    };

    return {
        setWeigth:setWeigth,
        setValue:setValue,
        setup:setup
    }; 
})(Dispatcher);
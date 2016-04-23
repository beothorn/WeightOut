var ValuesView = (function(dispatcher){

    var valuesId = "values";

    var clearList = function(ul){
        ul.innerHTML = "";
    };

    var fillList = function(ul, values){
        values.forEach(function(value){
            var li =  ValueListItem.create(value);
            ul.appendChild(li);
        });
    };

    var setValues = function(values){
        var ul = document.querySelector("#"+valuesId+" ul");
        clearList(ul);
        fillList(ul, values);
    };

    var remove = function(value){
        var li = document.querySelector("#"+valuesId+" ul li#"+dateWithoutSpecialChars(value.d));
        li.parentElement.removeChild(li);
    };

    return {
        setValues:setValues,
        remove:remove
    }
})(Dispatcher);
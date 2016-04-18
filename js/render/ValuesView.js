var ValuesView = (function(){

    var clearList = function(ul){
        ul.innerHTML = "";
    };

    var newListItem = function(){
        var li = document.createElement("li");
        li.className = "collection-item";
        return li;
    };

    var newFormattedTextForValue = function(value){
        var span = document.createElement("span");
        span.appendChild(document.createTextNode(value.d+" - "+value.w));
        return span;
    }

    var createDeleteLink = function(value, deleteCallback, li){
        var a = document.createElement("a");
        a.href = "#";
        a.className="secondary-content";
        a.onclick = function(){
            deleteCallback(value);
            li.parentElement.removeChild(li);
        };
        var i = document.createElement("i");
        i.className = "material-icons";
        i.appendChild(document.createTextNode("delete"));
        a.appendChild(i);
        return a;
    };

    var fillAddWeightValues = function(values){
        var lastValue = values[values.length - 1].w;
        var weightSplitted = (lastValue+"").split(".");
        document.getElementById("weightUnit").value = weightSplitted[0];
        document.getElementById("weightDecimal").value = weightSplitted[1];
    };

    var fillList = function(ul, values, deleteCallback){
        values.forEach(function(value){
            var li = newListItem();
            li.appendChild(newFormattedTextForValue(value));
            li.appendChild(createDeleteLink(value, deleteCallback, li));
            ul.appendChild(li);
        });
        fillAddWeightValues(values);
    };

    var render = function(values, deleteCallback){
        var ul = document.querySelector("#values ul");
        clearList(ul);
        fillList(ul, values, deleteCallback);
    };

    return {
        render:render
    }
})();
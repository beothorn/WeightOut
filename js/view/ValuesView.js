var ValuesView = (function(){

    var valuesId = "values";

    var dateWithoutSpecialChars = function(date){
        return "val"+date.split("-").join("");
    };

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

    var createDeleteLink = function(value, li){
        var a = document.createElement("a");
        a.href = "#";
        a.className="secondary-content";
        a.onclick = function(){
            Dispatcher.deleteValue(value);
        };
        var i = document.createElement("i");
        i.className = "material-icons";
        i.appendChild(document.createTextNode("delete"));
        a.appendChild(i);
        return a;
    };

    var fillList = function(ul, values){
        values.forEach(function(value){
            var li = newListItem();
            li.id = dateWithoutSpecialChars(value.d);
            li.appendChild(newFormattedTextForValue(value));
            li.appendChild(createDeleteLink(value, li));
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
})();
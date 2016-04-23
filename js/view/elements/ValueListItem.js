var ValueListItem = (function(dispatcher){
    
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
            dispatcher.deleteValue(value);
        };
        var i = document.createElement("i");
        i.className = "material-icons";
        i.appendChild(document.createTextNode("delete"));
        a.appendChild(i);
        return a;
    };

    var newListItem = function(){
        var li = document.createElement("li");
        li.className = "collection-item";
        return li;
    };

    var create = function(value){
        var li = newListItem();
        li.id = dateWithoutSpecialChars(value.d);
        li.appendChild(newFormattedTextForValue(value));
        li.appendChild(createDeleteLink(value, li));
        return li;
    };

    return {
        create:create
    };
})(Dispatcher);
var OverviewCard = (function(){

    var create = function(values){
        var div = document.createElement("div");
        div.className = "card-panel teal";
        var span = document.createElement("span");
        span.className = "white-text";
        if(values.length > 0){
            var lastValue = values[values.length - 1].w;
            span.appendChild(document.createTextNode(lastValue+" Kg"));    
        }  
        
        div.appendChild(span);
        return div;
    };

    return {
        create:create
    };
    
})();
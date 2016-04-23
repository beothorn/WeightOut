var OverviewView = (function(){
    var loadOverview = function(values){
        var div = OverviewCard.create(values);
        document.getElementById("overviewCardSlot").appendChild(div);
    };

    var show = function(){
        document.getElementById("overview").style.display = "block";
    };

    return {
        loadOverview:loadOverview,
        show:show
    };
})();
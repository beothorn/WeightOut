var Dispatcher = (function(){

    var bringPanelUp = function(panelName){
        var activeMenuItems = document.querySelectorAll("nav ul li.active");
        for(var i=0; i< activeMenuItems.length; i++){
            activeMenuItems[i].classList.remove("active");
        }
        var toBeActivedMenuItems = document.querySelectorAll("nav ul li."+panelName);
        for(var i=0; i< toBeActivedMenuItems.length; i++){
            toBeActivedMenuItems[i].classList.add("active");
        }

        var panels = document.getElementsByClassName("panel");
        for(var i=0; i< panels.length; i++){
            panels[i].style.display = "none";
        }

        document.getElementById(panelName).style.display = "block";
        $("#hamburguerButton").sideNav('hide');//depends on jquery cause it's a plugin :(
    };

    $(window).on('hashchange',function(){ 
        var view = location.hash.slice(1);
        if(view === "" || view === "!") return;
        bringPanelUp(view);
    });

    var refreshModal = function(values){
        if(values.length > 0){
            var lastValue = values[values.length - 1].w;
            AddValueModalView.setValue(lastValue);    
        }  
    };

    var deleteValue = function(value){
        Persistence.remove(value.d, function(){
           ValuesView.remove(value);
            refreshModal(values); 
        });
    };

    var loadValues = function(){
        Persistence.readAll(function(values){
            ValuesView.setValues(values);
            refreshModal(values);
            loadTab();
            OverviewView.loadOverview(values);
            LoadingView.hideLoading();
            TabsView.show();
            OverviewView.show();
            ChartByDateView.loadValues(values);
        });
    };

    var loadTab = function(){
        TabsView.renderTabs({
            "overview":"Overview",
            "values":"Values",
            "charts":{
              "category":"Charts",
              "subCategories":{
                "bydate":"By Date",
        //        "variation":"Variation",
        //        "variationByWeekday":"Week day variation",
        //        "bmi":"BMI"
              }
            },
            "settings":"Settings"
        });
    };

    var addValue = function(weight, date){
        Persistence.add({w:weight, d:date},function(){
            Persistence.readAll(function(values){
                ValuesView.setValues(values);
                ChartByDateView.loadValues(values);
            });
        });
    };

    return {
        deleteValue:deleteValue,
        loadValues:loadValues,
        addValue:addValue
    };
})();
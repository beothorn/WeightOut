var Dispatcher = (function(){

    var updateModalWithValue = function(value){
        AddValueModalView.setValue(value);
    };

    var refreshModal = function(values){
        if(values.length > 0){
            var lastValue = values[values.length - 1].w;
            AddValueModalView.setWeigth(lastValue);    
        }  
    };

    var onPanelLoad = function(panelName){
        if(panelName === "bydate"){
            Persistence.readAll(function(values){
                refreshModal(values);
            });
            return;
        }
    };

    var bringPanelUp = function(panelName){
        onPanelLoad(panelName);
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

        var panelById = document.getElementById(panelName);
        if(panelById === null){
            throw new Error("Panel with id "+panelName+" not found.");
        }
        panelById.style.display = "block";
        $("#hamburguerButton").sideNav('hide');//depends on jquery cause it's a plugin :(
    };

    var deleteValue = function(value){
        Persistence.remove(value.d, function(){
           ValuesView.remove(value);
           refreshModal(values); 
        });
    };

    var startApp = function(){
        Persistence.doAfterLoad(function(){
            Persistence.readAll(function(values){
                ChartByDateView.setup();
                AddValueModalView.setup();
                WeightVarianceChart.setup();
                ValuesView.setValues(values);
                refreshModal(values);
                loadTab();
                
                OverviewView.loadOverview(values);
                LoadingView.hideLoading();
                TabsView.show();
                OverviewView.show();
                ChartByDateView.loadValues(values);
                WeightVarianceChart.loadValues(values);
            });
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
                "weightVariance":"Weight Variance"
              }
            },
            "raw":"Export/Import",
            "settings":"Settings",
            "help":{
              "category":"Help",
              "subCategories":{
                "chartsHelp":"Charts",
                "about":"About"
              }
            }
        });
    };

    var addValue = function(weight, date){
        Persistence.add({w:weight, d:date},function(){
            Persistence.readAll(function(values){
                ValuesView.setValues(values);
                ChartByDateView.loadValues(values);
                refreshModal(values);
            });
        });
    };

    return {
        deleteValue:deleteValue,
        startApp:startApp,
        addValue:addValue,
        bringPanelUp:bringPanelUp,
        updateModalWithValue:updateModalWithValue
    };
})();
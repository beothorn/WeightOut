var Renderer = (function(){

    var bringPanelUp = function(panelName){
        if(panelName === "" || panelName === "!") return;
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

    return {
        bringPanelUp:bringPanelUp
    };
})();
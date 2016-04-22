var Renderer = (function(){
    
    var topNav = function(){
        return document.getElementById("top-nav");
    };

    var sideNav = function(){
        return document.getElementById("side-nav");
    };

    var navBar = function(){
        return document.getElementById("navBar");
    };

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

    var renderTabMenuEntry = function(name, text){
        var li = document.createElement("li");
        li.className = name;
        if(document.querySelector("div#"+name).classList.contains("firstPanel")){
            li.className += " active";
            window.location.hash = "#"+name;
        }
        var a = document.createElement("a");
        a.href = "#"+name;
        a.appendChild(document.createTextNode(text));
        li.appendChild(a);

        topNav().appendChild(li);
        sideNav().appendChild(li.cloneNode(true));
    };

    var renderDropdownMenuItem = function(category, categoryName, dropDownToActivate){
        var li = document.createElement("li");
        li.className = category;
        var a = document.createElement("a");
        a.setAttribute("data-activates", dropDownToActivate);
        a.className = "dropdown-button";
        a.appendChild(document.createTextNode(categoryName));
        var i = document.createElement("i");
        i.className = "material-icons right";
        i.appendChild(document.createTextNode("arrow_drop_down"));
        a.appendChild(i);
        li.appendChild(a);
        return li;
    };

    var renderTabSubMenuEntry = function(category, categoryName, subCategories){
        var dropDownName = category+"DropDown";
        var dropDownMobileName = category+"DropDownMobile";

        topNav().appendChild(renderDropdownMenuItem(category, categoryName, dropDownName));
        sideNav().appendChild(renderDropdownMenuItem(category, categoryName, dropDownMobileName));

        var ul = document.createElement("ul");
        ul.className = "dropdown-content";
        ul.id = dropDownName;

        var ulMobile = document.createElement("ul");
        ulMobile.className = "dropdown-content";
        ulMobile.id = dropDownMobileName;

        for(sub in subCategories){
            var li = document.createElement("li");
            li.className = sub;
            var a = document.createElement("a");
            a.onClick = function(){bringPanelUp(sub);};
            a.appendChild(document.createTextNode(subCategories[sub]));
            a.href = "#"+sub;
            li.appendChild(a);
            ul.appendChild(li);
            ulMobile.appendChild(li.cloneNode(true));
        }

        navBar().appendChild(ul);
        navBar().appendChild(ulMobile);
    };

    var renderTabs = function(tabs){
        for(tabProp in tabs){
            var tabPropValue = tabs[tabProp];
            if(typeof(tabPropValue) === "object"){
                renderTabSubMenuEntry(tabProp, tabPropValue["category"], tabPropValue["subCategories"]);
            }else{
                renderTabMenuEntry(tabProp, tabPropValue);
            }            
        }
    };

    return {
        renderTabs:renderTabs,
        bringPanelUp:bringPanelUp
    };
})();
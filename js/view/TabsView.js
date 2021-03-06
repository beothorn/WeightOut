var TabsView = (function(dispatcher){

    var topNav = function(){
        return document.getElementById("top-nav");
    };

    var sideNav = function(){
        return document.getElementById("side-nav");
    };

    var navBar = function(){
        return document.getElementById("navBar");
    };

    var mainNavBar = function(){
        return document.getElementById("mainNavBar");
    };

    var renderDropdownMenuItem = function(category, categoryName, dropDownToActivate){
        var li = document.createElement("li");
        li.className = category;
        var a = document.createElement("a");
        a.setAttribute("data-activates", dropDownToActivate);
        a.className = "dropdown-button";
        a.href = "#!";
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
            a.onClick = function(){dispatcher.bringPanelUp(sub);};
            a.appendChild(document.createTextNode(subCategories[sub]));
            a.href = "#"+sub;
            li.appendChild(a);
            ul.appendChild(li);
            ulMobile.appendChild(li.cloneNode(true));
        }

        mainNavBar().appendChild(ul);
        mainNavBar().appendChild(ulMobile);
    };

    var renderTabMenuEntry = function(name, text){
        var li = document.createElement("li");
        li.className = name;
        var panelSelector = "div#"+name;
        var panelDiv = document.querySelector(panelSelector); 
        if(panelDiv === null){
            throw new Error("Panel with selector "+panelSelector+" not found.");
        }
        if(panelDiv.classList.contains("firstPanel")){
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

    var show = function(){
        $(".dropdown-button").dropdown();
        $("#hamburguerButton").sideNav();
        mainNavBar().style.display = "block";
    };

    return {
        renderTabs:renderTabs,
        show:show
    };
})(Dispatcher);
var LoadingView = (function(){
    
    var hideLoading = function(){
        document.getElementById("loading").style.display = "none";
    };

    return {
        hideLoading:hideLoading
    };
})();
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
         
//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
  window.alert("Your browser doesn't support a stable version of IndexedDB.")
}
 

var Persistence = (function(){
    var request = window.indexedDB.open("WeightMeasurements", 1);

    this.loaded = false;

    request.onerror = function(event) {
      console.log("error: ");
    };

    request.onsuccess = function(event) {
      this.db = request.result;
      this.loaded = true;
      if(this.afterLoaded)
        this.afterLoaded();
      console.log("success: "+ this.db);
    }.bind(this);

    request.onupgradeneeded = function(event) {
      var db = event.target.result;
      var objectStore = db.createObjectStore("measurement", {keyPath: "d"});
    }

    this.doAfterLoad = function(callback){
        if(this.loaded){
          callback();
        }else{
          this.afterLoaded = callback;
        }
    }.bind(this);

    this.readAll = function(callback) {
      var objectStore = this.db.transaction("measurement").objectStore("measurement");
      var results = [];
      objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;

        if (cursor) {
          results.push(cursor.value);
          cursor.continue();
        }else{
          callback(results);
        }
      };
    }.bind(this);

    this.add = function(measurement, callback) {
      var request = this.db.transaction(["measurement"], "readwrite")
        .objectStore("measurement")
        .add(measurement);

      request.onsuccess = function(event) {
        if(callback)
            callback();
      };

      request.onerror = function(event) {
        alert("Unable to add data"+JSON.stringify(measurement));
      }
    }.bind(this);

    return this;
})();


/**
 function remove() {
    var request = db.transaction(["employee"], "readwrite")
    .objectStore("employee")
    .delete("00-03");

    request.onsuccess = function(event) {
       alert("Kenny's entry has been removed from your database.");
    };
 }
 **/
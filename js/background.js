if (!jQuery || jQuery == undefined) {  
    alert("Oops...Something goes wrong. we cannot load jQuery at this time! So #bazan");
    return;
}
function in_array(needle, haystack) {
    for(var i in haystack) {
        if(haystack[i] == needle) return true;
    }
    return false;
}

function getUnique(array){
    var u = {}, a = [];
    for(var i = 0, l = array.length; i < l; ++i){
    	console.log(array[i]);
        if(u.hasOwnProperty(array[i])) {
            continue;
        }
        a.push(array[i]);
        u[array[i]] = 1;
    }
    return a;
}

$(document).ready(function(){
	var stack  = [];
	var inserted = false;
	var isLoaded = false;

	chrome.tabs.onUpdated.addListener(function(tabId , info) {
	    if (info.status == "complete") {
	    	alert('Yup');  
	    }
	});

	chrome.tabs.getSelected(null, function(tab){
		var tabId = tab.id;
		console.log(tabId);
    	chrome.tabs.sendRequest(tabId, {name:'init',tabId:tabId}); // to content.js
	});	
});
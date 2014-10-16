
var base_url = "instagram.com";
var change_url = "instagram.com/query/";
var inserted = false;
var general_types = ["main_frame","xmlhttprequest"];
var main_source = ["<all_urls>"];


function check_page()
{
	chrome.tabs.getSelected(null, function(tab){
		var tabId = tab.id;
		var taburl = tab.url;
		
        if(taburl.indexOf(base_url)<0)
            return;

        if(inserted)
        	chrome.tabs.sendMessage(tabId, {msg: "hello"});
        else
	        chrome.tabs.executeScript(tabId, {file: 'js/jmin.js'}, function() { 
	            chrome.tabs.sendMessage(tabId, {msg: "block"});
	            inserted = true;
	        });
	});
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('bg',request,sender);
});

chrome.tabs.onUpdated.addListener(function(tabId , info) {
    if (info.status == "complete") {
    	check_page(); 
    }
});

chrome.webRequest.onResponseStarted.addListener(function(data){
	if(data.url.indexOf(change_url) >= 0)
    	check_page();
    }, {
    urls: main_source,
    types: general_types
}, []);

chrome.webRequest.onCompleted.addListener(function(data){
	if(data.url.indexOf(change_url) >= 0)
    	check_page();
    }, {
    urls: main_source,
    types: general_types
}, []);

check_page();

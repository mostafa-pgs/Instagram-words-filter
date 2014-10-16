var prefix = '__bezan__';
var fix = 'enable';
var fix_filter = 'filters';

function get_filters(text)
{
	return text.split(',');
}

function multiSearchOr(text, searchWords){
  var searchExp = new RegExp(searchWords.join("|"),"gi");
  return searchExp.test(text);
}

function theme_button(id)
{
	return '<p class="ms-nazan-ext" data-val="'+id+'" style="\
	    	    width: 568px;\
	    	    margin: 0 auto;\
	    	    border: 1px solid #c6c6c6;\
	    	    margin-left: 224px;\
	    	    background: #f3f3f3;\
	    	    box-shadow: 0px 2px 6px 1px #bbb;\
	    	    margin-bottom: 30px;\
	    	    color: #fff;\
	    	    padding: 27px 5px;\
	    	    cursor: pointer;\
	    	    margin-top: 15px;\
	    	    text-shadow: 0 1px 0 rgba(255,255,255,.6);\
	    	    color:#666;\
	">#bezan to show !</p>';
}

function hide_instagram()
{
  	var storage = chrome.storage.local;
    storage.get(prefix+fix,function(setting){
        var response = (setting[prefix+fix] == 'enable') ? true : false;
        if(setting[prefix+fix] == '' || setting[prefix+fix] == undefined)
            response = true;
        if(response)
        {
        	storage.get(prefix+fix_filter,function(setting){
	            var response = setting[prefix+fix_filter];
	            if(response != '' && response != undefined)
	            {
					$('.timelineItem .timelineCenter').each(function(){
						if($(this).hasClass('ms-nazan-hide') == true)
							return;
						var text = $(this).text();
						var found = multiSearchOr(text,get_filters(response));
						if(found)
						{
							var id = Math.floor((Math.random() * 10000) + 1);
							$(this).addClass('ms-nazan-hide').attr('style',"display:none;").attr('id','nazan-id-'+id.toString()).before(theme_button(id));
							$('.ms-nazan-ext').live('click',function(){
								var tid = $(this).attr('data-val');
								$('#nazan-id-'+tid).hide().show();
								$(this).hide();
							});
						}
					});   
	            }    		
        	});
        }
    });	
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	hide_instagram();
});

// ---------------------------------------------------------
hide_instagram();	
try
{
    var prefix = '__bezan__';
    var fix = 'enable';
    var fix_filter = 'filters';
    var fix_run = 'run';

    function first_run()
    {
        var storage = chrome.storage.local;
        storage.get(prefix+fix_run,function(setting){
            var run = (setting[prefix+fix_run] == '1') ? true : false;
            if(setting[prefix+fix_run] == '' || setting[prefix+fix_run] == undefined)
                run = false;
            if(run == false)
            {
                var obj = {};
                obj[prefix+fix] = 'enable';
                obj[prefix+fix_run] = '1';
                obj[prefix+fix_filter] = '#bezan,#بزن';
                storage.set(obj);
            }
            get_enable();
        });
    }

    function set_enable(able)
    {
        var storage = chrome.storage.local;
        var obj = {};
        obj[prefix+fix] = able;
        storage.set(obj);
    }

    function set_filters(text)
    {
        var storage = chrome.storage.local;
        var obj = {};
        obj[prefix+fix_filter] = text;
        storage.set(obj);
    }

    function get_enable()
    {
        var storage = chrome.storage.local;
        storage.get(prefix+fix,function(setting){
            var response = (setting[prefix+fix] == 'enable') ? true : false;
            if(setting[prefix+fix] == '' || setting[prefix+fix] == undefined)
                response = true;
            if(response)
            {
                $('.slider-frame').removeClass('off').addClass('on');
                $('.slider-text').html('ON');
                $('#able').html('Enabled');
                $('input[type="checkbox"]').attr('checked', 'checked');
            }
            else
            {
                $('.slider-frame').removeClass('on').addClass('off');
                $('.slider-text').html('OFF');
                $('#able').html('Disabled');
                $('input[type="checkbox"]').removeAttr('checked');
            }
            get_filters();
        });
    }

    function get_filters()
    {
        var storage = chrome.storage.local;
        storage.get(prefix+fix_filter,function(setting){
            var response = setting[prefix+fix_filter];
            if(response != '' && response != undefined)
            {
                var words = response.split(',');
                var html = '';
                for (var i = 0; i <= words.length - 1; i++) {
                    var word = words[i];
                    html += '<p class="tag"><a class="tw">'+word+'</a><span>X</span></p>';
                };
                $('#words-box').html(html);              
            }
            
        });
    }  
    function generate_filter()
    {
        var words = [] , i = 0;
        $('.tw').each(function(){
            words[i++] = $(this).html();
        });
        return words.join(',');
    }
    $(document).ready(function()
    {
        first_run();
    	$('.slider-frame').toggle(function(){
            $(this).removeClass('off').addClass('on');
            $('.slider-button').parent().next('input[type="checkbox"]').attr('checked', 'checked');
            $('.slider-text').html('ON');
            $('#able').html('Enabled');
            set_enable('enable');
        },function(){
            $(this).removeClass('on').addClass('off');
            $('.slider-button').parent().next('input[type="checkbox"]').removeAttr('checked');
            $('.slider-text').html('OFF');
            $('#able').html('Disabled');
            set_enable('disable');
        });

        $('#add').click(function(){
            var word = $('#word').val();
            if(word.length > 0)
            {
                $('#words-box').prepend('<p class="tag"><a class="tw">'+word+'</a><span>X</span></p>');
                set_filters(generate_filter());                
            }
            $('#word').val('').select().focus();
        });
        $('.tag span').live('click',function(){
            $(this).parent().remove();
            set_filters(generate_filter());
        });        
    }); // End Ready //

}catch(a){
    alert(a);
};
$(document).ready(function(){

    /*var _w = $('.bg_pic').width(), _h = $('.bg_pic').height();
    $('#input_section').width(_w);
    $('#input_section').height(_h);*/


    $('.outer_section').click(function(){
        var _val = $('#input_section').val();
        if(!_val){
           $('.mask').show();
            return;
        }
        if($(this).hasClass('has_publish')){

        }else{
            publish();
        }
    });

    $('.mask_btn,.mask').click(function(){
        $('.mask').hide();
    })

    $('.enter_section').click(function(){
        doGoChannel(15);
    })
});

function publish(){
    /*var _id_data = GetRequest();
    var _uid = _id_data['uid'];*/
    var parmas = {
        content: $('#input_section').val()
    };

    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: parmas,
        url: 'http://hd.wecut.com/api/shudong/publish.php',
        success: function(_res){

            $('.outer_section').addClass('has_publish');
        }
    })

}

function GetRequest() {
    var url = window.location.href; //获取url中"?"符后的字串
    //var url = 'http://hd.wecut.com/pageview/constell/index.html#/?issupport=1&uid=34MjENDk=';
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var ind = url.indexOf("?");
        var str = url.substr(ind+1);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

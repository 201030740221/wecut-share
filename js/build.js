$(document).ready(function(){

    /*var _w = $('.bg_pic').width(), _h = $('.bg_pic').height();
    $('#input_section').width(_w);
    $('#input_section').height(_h);*/

    $('#input_section').keydown(function(){
        console.log(33);
        $('.outer_section').css('background-image','url(images/outer.png)');
    });

    $('.outer_section').click(function(){
        var _val = $('#input_section').val();
        if(!_val){
           $('.mask').show();
            return;
        }
        if($(this).hasClass('has_publish')){
            return;

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

    var timestamp = Date.parse(new Date());
    console.log(timestamp);
    var parmas = {
        content: $('#input_section').val(),
        timestamp: timestamp
    };

    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: parmas,
        url: 'http://hd.wecut.com/api/shudong/publish.php',
        success: function(_res){

            if(_res.code==1){
                $('.outer_section').addClass('has_publish');
                $('.outer_section').css('background-image','url(images/success.png)');
            }


        }
    })

}

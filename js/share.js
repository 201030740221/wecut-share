
$(document).ready(function(){

    /*请求数据*/
    var _type = 2;
    ajaxData(_type);

  /*  var _scroll_top = 0;
    $('#wrapper').scroll(function(){
        _scroll_top = $(this).scrollTop();
        console.log(_scroll_top);
    })*/

    /*tab 切换*/
    $('.new_nav').click(function(){
        if($(this).hasClass('active')){

        }else{

            /*$("#wrapper").scrollTop({scrollTop:_scroll_top},1000);*/

            $(this).addClass('active');
            $('.host_nav').removeClass('active');
            var type = 1;
            $('#thelist').empty();
            ajaxData(type);

        }
    });
    $('.host_nav').click(function(){
        if($(this).hasClass('active')){

        }else{

            /*$("#wrapper").animate({scrollTop:_scroll_top},1000);*/

            $(this).addClass('active');
            $('.new_nav').removeClass('active');
            var type_val = 2;
            $('#thelist').empty();
            ajaxData(type_val);
        }
    });

    /*wechat share*/
    getWechatConfig();

    /*底部下载*/
    $('#footer').click(function(){
        var _ua = suitUa();
        console.log(_ua[0]);
        if(_ua[0]=='Weibo'){
            window.location.href = 'http://t.cn/RGqa1jS';
        }else{
            window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.hithway.wecut';
        }
    })
});


//微信配置接口
function getWechatConfig(){

    var _url = window.location.href;
    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: {url:_url},
        url: 'http://hd.wecut.com/api/wx/token.php',
        success: function(res){
            wechatConfig(res.data);
        }
    });
}
//微信分享配置
function wechatConfig(configData){
    //获取微信wx.config的配置信息接口
    console.log(configData,'weChatJsConfig');
    var apiList = ['onMenuShareTimeline', 'onMenuShareAppMessage'];
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId:  configData.appId, // 必填，公众号的唯一标识
        timestamp: configData.timestamp, // 必填，生成签名的时间戳
        nonceStr: configData.nonceStr, // 必填，生成签名的随机串
        signature: configData.signature,// 必填，签名，见附录1
        jsApiList: apiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function(){
        wx.checkJsApi({
            jsApiList: apiList, // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function(res) {
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                console.log(res,'wx');
            }
        });

        var name = $('.share_star_name').val();
        var title='老公#' + name + '# 邀请你视频通话…赶紧接起来呀！',
            link = window.location.href,
            image = $('.share_img').val(),
            desc = '宝宝你怎么还不接电话？';

        wx.onMenuShareTimeline({
            title: title, // 分享标题
            desc: desc,
            link: link, // 分享链接
            imgUrl: image, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: image, // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    });
}



/*获取url参数*/
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

var ua = [
    ["LBBROWSER", "猎豹浏览器"],
    ["Maxthon", "遨游浏览器"],
    ["Firefox", "火狐浏览器"],
    ["SE", "搜狗浏览器"],
    ["Opera", "Opera浏览器"],
    ["BIDUBrowser", "百度浏览器"],
    ["MSIE", "IE浏览器"],
    ["Chrome", "chrome浏览器"],
    ["Safari", "Safari浏览器"],
    ["Weibo","新浪微博"]
];

function suitUa(){ //判断浏览器
    var _ua = navigator.userAgent;
    var ual = ua.length;
    for(var i = 0 ; i < ual; i++){
        if(new RegExp(ua[i][0]).test(_ua)){
            return ua[i];
        }
    }
    return ["unkown", "未知浏览器"];
}

var myScroll,
    pullUpEl, pullUpOffset,
    current_page = 1;

function ajaxData(type) {

    var _id_data = GetRequest();
    var _id = _id_data['id'] || 2;

    $.ajax({
        dataType: 'json',
        data: {
            id: _id,
            type: type
        },
        url: 'http://hd.wecut.com/api/starlive/list.php',
        success: function(res){

            var star = res.data.star;

            $('.dec_star_name').text(star.name);
            $('.dec_count').text(star.copynum);
            $('.share_img').val(star.uavatar);
            $('.share_star_name').val(star.name);

            var _video = res.data.video;
            var _video_list = '';
            _video.forEach(function(item){
                _video_list += '<li class="video_section"><video width="100%" controls="controls" poster='+item.image+'><source src='+item.mediaurl+' type="video/mp4" /></video><div class="play_btn"></div></li>';
            })
            $('#thelist').append(_video_list);

            /*兼容安卓部分机型不能播放*/
            $('.play_btn').click(function(){

                var _this = this;
                var _video = $(this).siblings('video');
                _video[0].play();
                $(this).hide();

                _video[0].addEventListener("click",function(){

                    console.log(99);
                });
                _video[0].addEventListener("ended",function(){
                    $(_this).show();
                });
            })

        }
    });
}

/*

function pullUpAction () {

    setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
        var el, li, i;
        el = document.getElementById('thelist');

        current_page+=1;
        ajaxData(current_page);

        myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
    }, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}

function loaded() {
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;

    myScroll = new iScroll('wrapper', {
        useTransition: true,

        onRefresh: function () {
          if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
            }
        },
        onScrollMove: function () {
            if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                pullUpEl.className = 'flip';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
                this.maxScrollY = pullUpOffset;
            }
        },
        onScrollEnd: function () {
           if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';
                pullUpAction();	// Execute custom function (ajax call?)
            }
        }
    });

    setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);*/

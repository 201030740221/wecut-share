
$(document).ready(function(){
    ajaxData();
})
var myScroll,
    pullUpEl, pullUpOffset,
    current_page = 1;

function ajaxData(current_page) {
    $.ajax({
        dataType: 'json',
        data: {
            id:2,
            type:2,
            page: current_page
        },
        url: 'http://hd.wecut.com/api/starlive/list.php',
        success: function(res){

            var _video = res.data.video;
            var _html = '';
            _video.forEach(function(item){
                _html += '<li class="video_section"><video width="100%" controls="controls" poster='+item.image+'><source src='+item.mediaurl+' type="video/mp4" /></video><div class="play_btn"></div></li>';
            })
            $('#thelist').append(_html);

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

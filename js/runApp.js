/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

// Get the platform type
function platform(target) {
    if (/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
        return 'iOS';
    }else if (/Android/i.test(navigator.userAgent)) {
        return 'Android';
    }
}

// Open App activity function

// Open pic activity
function doGoTule(tid) {
    if(platform() == 'iOS'){
        window.location.href="wecut://tule?id="+tid;
    }else if (platform() == 'Android') {
        window.wecutapp.getTule(tid);
    }
}

// Open user activity
function doGoUser(tid) {
    if(platform() == 'iOS'){
        window.location.href="wecut://user?id="+tid;
    }else if (platform() == 'Android') {
        window.wecutapp.getUser(tid);
    }
}

// Open a group of stickers activity
function doGoSticker(tid) {
    if(platform() == 'iOS'){
        window.location.href="wecut://sticker?id="+tid;
    }else if (platform() == 'Android') {
        window.wecutapp.getSticker(tid);
    }
}

// Open sticker shop
function doGoStickerShop() {
    if(platform() == 'iOS'){

    }else if (platform() == 'Android') {
        window.wecutapp.getStickerShop();
    }
}

// Open single backdrop activity
function doGoBackdrop(tid) {
    if(platform() == 'iOS'){
        window.location.href="wecut://sticker?id="+tid;
    }else if (platform() == 'Android') {
        window.wecutapp.getBackdrop(tid);
    }
}

// Open a channel activity
function doGoChannel(tid) {
    if(platform() == 'iOS'){
        window.location.href="wecut://channel?id="+tid+"&color=40cf6f";
    }else if (platform() == 'Android') {
        window.wecutapp.getChannel(tid);
    }
}

// Open a web in outer browser
function doGoOuterWeb(url) {
    if(platform() == 'iOS'){
        url = url.replace(/http:\/\//, "");
        window.location.href="wecut://web?url="+url;
    }else if (platform() == 'Android') {
        window.wecutapp.getOutWeb(url);
    }
}

// Open a web in outer browser
function doGoSignIn() {
    if(platform() == 'iOS'){
        window.location.href="wecut://signIn";
    }else if (platform() == 'Android') {
        window.wecutapp.getSignIn();
    }
}

// Open a web in outer browser
function doGoWebShare(title, content, picUrl, url, callback) {
    if(platform() == 'iOS'){
        url = url.replace(/http:\/\//, "");
        picUrl = picUrl.replace(/http:\/\//, "");
        window.location.href="wecut://webShare?title="+title+"^content="+content+"^picUrl="+picUrl+"^clickUrl="+url+"^callbackUrl="+callback;
    }else if (platform() == 'Android') {
        window.wecutapp.webShare(title, content, picUrl, url, callback);
    }
}

// 翻拍或改图
function doGoCopy(mtype, zipUrl, nickName, des, photoUrl, tid, scale) {
    mtype = parseInt(mtype);
    if(platform() == 'iOS'){
        zipUrl = zipUrl.replace(/http:\/\//, "");
        photoUrl = photoUrl.replace(/http:\/\//, "");
        if(mtype <= 2){
            //改图                
            window.location.href = "wecut://reedit?photo="+photoUrl+'^zipUrl='+zipUrl+'^tid='+tid+'^nickName='+nickName+'^desc='+des;
        }else{
            //翻拍
            window.location.href = 'wecut://remake?scale='+scale+'^zipUrl='+zipUrl+'^tid='+tid;
        }
    }else if (platform() == 'Android'){
        mtype = (mtype <= 2) ? 1 : 2;
        window.wecutapp.getCutPhotoAndVideo(mtype, zipUrl, nickName, des, photoUrl, tid, scale);
    }
}
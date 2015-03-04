function checkImage(src) {
  var img = new Image();
  img.onload = function() {
    return true;
  };
  img.onerror = function() {
    return false;
  };

  img.src = src;
}
if(checkImage('/assets/images/img_thumb_' + imgname + '.png')) {
  muyArr[i].thumb = '';
}

var Mustache = require('mustache');

var content = {
  init: function() {

    var thisThis = this;

    var xmlhttp = new XMLHttpRequest();
    var url = "https://api.github.com/users/wordcamptokyo2014/repos";
    var myArr = [];

    xmlhttp.open("GET", url, true);
    xmlhttp.send(); // send request to the server

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = JSON.parse(xmlhttp.responseText);
        thisThis.generate(myArr);
      } else {
        document.getElementById('content').innerHTML = '<li><p>Sorry, There is something error within GitHub or network.</p></li>';
      };
    };

  },
  generate: function(myArr) {

    var thisThis = this;

    var html = '';
    var images = {
      background : true,
      banner     : true,
      carta      : true,
      flag       : true,
      sticker    : true,
      wapuu      : true
    }

    for(var i = 0; i < myArr.length; i++){
      if(myArr[i].name !== 'WordCampTokyo2014.github.io') {

        var template = '<li><a href="{{html_url}}" target="_blank">';
        template += '<img src="/assets/images/img_thumb_{{thumb}}.png">';
        template += '<dl class="content__info">';
        template += '<dt>{{name}}</dt>';
        if(myArr[i].description) template += '<dd class="content__info__description">{{description}}</dd>';
        template += '<dd class="content__info__time">Updated at {{updated_at}}</dd>';
        template += '</dl>';
        template += '</a></li>';

        if(images[myArr[i].name]) {
          myArr[i].thumb = myArr[i].name;
        } else {
          myArr[i].thumb = 'noimage';
        }

        myArr[i].updated_at = myArr[i].updated_at.substr(0, 10);
        html += Mustache.render(template, myArr[i]);

      }
    }

    document.getElementById('content').innerHTML = html;

  }
}
content.init();

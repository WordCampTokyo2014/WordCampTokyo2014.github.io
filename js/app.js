

$.ajax({
  type: 'GET',
  url: 'https://api.github.com/users/wordcamptokyo2014/repos',
  dataType: 'json',
  success: function(json){
    var container = document.getElementsByClassName("marketing")[0],
    div = new Array();

    for(var i=0; i < 2; i++){
      div[i] = document.createElement("div"),
      div[i].className += "col-xs-12 col-sm-6";
      container.appendChild(div[i]);
    }

    for(var i=0; i < json.length; i++){
      var col = create_repo_div(json[i]);
      if(i > json.length /2 -1){
      div[0].appendChild(col);
      }else{
      div[1].appendChild(col);
      }
    }
  }
});

function create_repo_div(json) {

      var div = document.createElement("div"),
      title = document.createElement("h2");

      title.innerHTML += '<a href="' + json.html_url + '">' + json.name,'</a>';
      div.appendChild(title);

      if(json.description){
        var p = document.createElement("p");
        p.innerHTML += json.description;
        div.appendChild(p);
      }
      if(json.updated_at){
        var p = document.createElement("p");
        p.innerHTML += "Updated at " + json.updated_at.substr(0, 10);
        div.appendChild(p);
      }

      return div;
}

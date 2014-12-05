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

    for(var i=0,j=0; i < json.length; i++){
      if(json[i].name=="WordCampTokyo2014.github.io"){
        j++;
      }else{
        var col = create_repo_div(json[i]);
        if(i >= json.length /2 -1 +j){
          div[0].appendChild(col);
        }else{
          div[1].appendChild(col);
        }
      }
    }
  }
});

function create_repo_div(json) {

      var div = document.createElement("div"),
      title = document.createElement("h2");

      // --- It's for debug. Remove it once you create thumbnail function --- //
      if(json.name=="logo"){
	var img = new Image();
        img.src = 'https://raw.githubusercontent.com/' + json.full_name + '/master/PNG/logo_a.png';
	//img.style.setAttribute('max-width','100%');
	img.style.cssText='max-width: 100%';
        div.appendChild(img);
      }

      // --- Add thumbnail image ---- //
      var img = new Image();
      img.src = 'https://raw.githubusercontent.com/' + json.full_name + '/master/sample/thumb.png';
      img.style.cssText='max-width: 100%';
      img.setAttribute('onerror','imgError(this);');
      div.appendChild(img);

      // --- Add repository name ---- //
      title.innerHTML += '<a href="' + json.html_url + '">' + json.name,'</a>';
      div.appendChild(title);

      // --- Add description ---- //
      if(json.description){
        var p = document.createElement("p");
        p.innerHTML += json.description;
        div.appendChild(p);
      }

      // --- Add update date ---- //
      if(json.updated_at){
        var p = document.createElement("p");
        p.innerHTML += "Updated at " + json.updated_at.substr(0, 10);
        div.appendChild(p);
      }

      return div;
}

function imgError(img) {
    img.onerror = "";
    img.src = "http://placehold.it/300x60/ef86b4/fff&text=Add+thumb.png";
    //img.style.cssText='width: 150px';
    return true;
}

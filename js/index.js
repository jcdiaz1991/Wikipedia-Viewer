document.getElementById("random").onclick = function () {
        window.open ("https://en.wikipedia.org/wiki/Special:Random");
    }

let searchTerm = document.getElementById("search");
var dataApi;

document.getElementById("go").onclick = function(){
  apiCall(searchTerm.value);
}

document.getElementById("search").addEventListener("keyup", function(event){
  event.preventDefault();
    if (event.keyCode === 13) {
        apiCall(searchTerm.value);
    }
});


function apiCall(search){
  $.ajax({
    type:'GET',
    url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + search + '&callback=JSON_CALLBACK',
    /*contentType: "application/json; charset=utf-8",
			async: false,*/
        	dataType: "jsonp",
    success: function(data){
      console.log(data);
      dataApi = data;
      console.log(dataApi);
      $('#header').addClass('animated fadeInUp');
      displayResults();
}})}

function displayResults(){
  $("#results").html("");
  var titles = dataApi.query.pages;
  var keys = Object.keys(dataApi.query.pages);
  document.body.style.display = "block";
  for(var i=keys.length-1;i>=0;i--){
    var articleID = keys[i];
    $("#results").prepend("<div class='row'><div class='col-sm-12' id= 'articles' onclick='goToWiki("+keys[i]+")'><h4>" + titles[keys[i]].title + "</h4>" + "<p>" + titles[keys[i]].extract + "</p></a></div></div>");
    $('#articles').addClass('animated fadeInUp');
        		}
}

function goToWiki(id){
  window.open ("https://en.wikipedia.org/?curid=" + id)
}
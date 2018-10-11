$(document).ready(function(){
    var ranPage = Math.floor(Math.random()*984);
weird = 'https:///api.themoviedb.org/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc'
test1 = '/movie/28/keywords'
queryUrl = 'v2/search?type=movie&field=id&id_type=imdb&query=tt1826940'
apiKey = '?api_key=97c224dd5db58f2523008853d7a9ab0e'
url = 'https://api.themoviedb.org/3'
furl = url+ queryUrl + apiKey
testUrl = url + test1+ apiKey;
test3 = 'https://api.themoviedb.org/3/discover/movie'
testG = '&with_genres=27&page='
testUrl2 = test3 + apiKey + testG + ranPage
console.log(testUrl)
//console.log(theMovieDb)
//ar got =theMovieDb.genres.getMovies({'id': 28},theMovieDB.successCB, theMovieDB.errorCB);
//onsole.log(got)

var ranAr = Math.floor(Math.random()*20);
console.log(ranAr)
console.log(ranPage)
var randomMovie = function(){
$.ajax({
    url: testUrl2,
    method: 'Get'
})
.then(function(response){
  results1 = response.results;
  var title = results1[ranAr].title;
  var summary= results1[ranAr].overview;
  var score= results1[ranAr].vote_average; 
  console.log(response)
    console.log(results1[ranAr].title)
    console.log(results1[ranAr].overview);
    console.log(results1[ranAr].vote_average)
}  )
}

randomMovie();

var genreBut = function(){

}

})
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
testG = '&with_genres='

console.log(testUrl)
//console.log(theMovieDb)
//ar got =theMovieDb.genres.getMovies({'id': 28},theMovieDB.successCB, theMovieDB.errorCB);
//onsole.log(got)

var ranAr = Math.floor(Math.random()*20);
console.log(ranAr)
console.log(ranPage)

//this function will give us all the data needed from the ajax call
var randomMovie = function(){
$.ajax
({
    url: testUrl2,
    method: 'Get'
})
.then(function(response){
  results1 = response.results;
  //gives us title will be put on a div on the page
  var title = results1[ranAr].title;
  //gives us summary ^*
  var summary= results1[ranAr].overview;
  //give us a score^*
  var score= results1[ranAr].vote_average; 
  
  //tests to confirm its working
  console.log(response)
    console.log(results1[ranAr].title)
    console.log(results1[ranAr].overview);
    console.log(results1[ranAr].vote_average)
}  )
}

//randomMovie();
//button click sets the genre for the URL, if it is a drop down we can do that too, just add a data-genre tag to them all
$('button').on('click', function(){
    var genre = $(this).attr('data-genre');
    console.log(genre);
    if (genre == 'action')
    {
       genre1 = 28
    }
    else if (genre == 'horror')
    {
       genre1= 27
    }
    else if (genre == 'comedy')
    {
        genre1 = 35
    }
    else if (genre == 'adventure')
    {
        genre1 =12
    }
    //how the ajax url is constructed to generate a random page based on the genre
    testUrl2 = test3 + apiKey + testG + genre1+ '&page=' + ranPage
    randomMovie();
})



})
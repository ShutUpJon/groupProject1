$(document).ready(function () {

    test1 = '/movie/28/keywords'
    queryUrl = 'v2/search?type=movie&field=id&id_type=imdb&query=tt1826940'
    apiKey = '?api_key=97c224dd5db58f2523008853d7a9ab0e'
    url = 'https://api.themoviedb.org/3'
    furl = url + queryUrl + apiKey
    var newId;
    testUrl = url + test1 + apiKey;
    test3 = 'https://api.themoviedb.org/3/discover/movie'
    testG = '&with_genres='
    var apikey2 = '365c1fdb8aa274ecaf246e9a03b21bb6abc644f9' //box api
    var moviesearch;
    var title;
    var genre1;
    var summary;
    var score;
    var genre;
    console.log(testUrl)
    //console.log(theMovieDb)
    //ar got =theMovieDb.genres.getMovies({'id': 28},theMovieDB.successCB, theMovieDB.errorCB);
    //onsole.log(got)
    $('.movielook').on('click', function () {
        moviesearch = $('.movieid').val();
        console.log(moviesearch)
        console.log('test')
    }
    )





    //this function will give us all the data needed from the ajax call
    var randomMovie = function () {
        var ranPage = Math.floor(Math.random() * 984);
        var ranAr = Math.floor(Math.random() * 18);
        testUrl2 = test3 + apiKey + testG + genre1 + '&page=' + ranPage
        $.ajax
            ({
                url: testUrl2,
                method: 'Get'
            })
            .then(function (response) {
                results1 = response.results;
                console.log(results1)
                //gives us title will be put on a div on the page
                if(results1[ranAr].title != undefined ){
                title = results1[ranAr].title;
                //gives us summary ^*
                 summary = results1[ranAr].overview;
                //give us a score^*
                 score = results1[ranAr].vote_average;

                 poster = "<img src = 'http://image.tmdb.org/t/p/w185/" + results1[ranAr].poster_path + "'>"
                }
                else if (results1[ranAr].title == undefined) {genreSearch()}

                //tests to confirm its working
                console.log(response)
                console.log(results1[ranAr].title)
                console.log(results1[ranAr].overview);
                console.log(results1[ranAr].vote_average)
                guideBox()
            }
            )
    }
    
    var guideBoxSearch = function()
    {
      url3 = 'http://api-public.guidebox.com/v2/movies/' + newId +  '?api_key=' + apikey2;

     $.ajax
       ({
           url: url3,
           method: 'GET'
       })
       .then(function (response){
           
           console.log(response)
             sources = response.subscription_web_sources;
             console.log(sources);
             
             buySource = response.purchase_web_sources;
             console.log(buySource)
          
            
            // if (response.length >= 1){
                 $('#movieTitle').html(title);
                 $('#movieDesc').html(summary)
                 $('#movieRating').html(score)
                 $('#moviePoster').html(poster)

                 
                
             subscribe();   
             buy();   
           // }
            //else if (results) {genreSearch()}
       })
    }

    var guideBox = function () {
        url2 = 'http://api-public.guidebox.com/v2/search?api_key=' + apikey2 + '&type=movie&field=title&query=' + title
        $.ajax
            ({
                url: url2,
                method: 'GET'
            })
            .then(function (response) {
                results = response.results;
                console.log(results)
                //pulls the guidebox id needed for the sources search
               
                
                console.log(response)
                
                if (results.length >=1)
                { 
                 newId = results[0].id;
                  guideBoxSearch();
                }

                else  {genreSearch()}
            })

    }
    var genreSearch = function(){
        $('#freeSource').empty();
        $('#buySource').empty();
       
        console.log(genre);
        if (genre == 'action') {
            genre1 = 28
        }
        else if (genre == 'horror') {
            genre1 = 27
        }
        else if (genre == 'comedy') {
            genre1 = 35
        }
        else if (genre == 'adventure') {
            genre1 = 28
        }
        //how the ajax url is constructed to generate a random page based on the genre

        randomMovie();
      }

    var subscribe = function()
    {
        if (sources.length >=1){
            $('#paySource').html('<div> <h3> Availible to stream on these platforms: </h3>')
        for (i = 0; i< sources.length; i++)
        {
          $('#paySource').append(sources[i].display_name)
        }
       }
       else {$('#paySource').html('not availible on streaming')};
    }
    var buy = function()
    {
        if (buySource.length >=1){
            $('#freeSource').append('<div> <h3>Availible to buy on these platforms: </h3>')
            for (i = 0; i < buySource.length; i++){
                $('#freeSource').append(buySource[i].display_name + ' ')
            }
            
        }
        else{$('#freeSource').html('not available to buy')}
    }
    //randomMovie();
    //button click sets the genre for the URL, if it is a drop down we can do that too, just add a data-genre tag to them all
    $('.genre').on('click', function () {
         genre = $(this).attr('data-genre');
        
      genreSearch();
    })



})
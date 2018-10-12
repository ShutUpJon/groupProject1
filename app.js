$(document).ready(function () {


    apiKey = '?api_key=97c224dd5db58f2523008853d7a9ab0e'
    var apikey2 = '365c1fdb8aa274ecaf246e9a03b21bb6abc644f9' //box api
    var apikey3 = '539d348a6e420c5ab3235cb6be4aa92a'
    url = 'https://api.themoviedb.org/3'
    var newId;
    test3 = 'https://api.themoviedb.org/3/discover/movie'
    testG = '&with_genres='

    var moviesearch;
    var title;
    var genre1;
    var summary;
    var score;
    var genre;
    var recUrl;
    var recPicture;
    var recTitle;
    var recSource
   // var foodGenre;

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
        var ranPage = Math.floor(Math.random() * 400);
        var ranAr = Math.floor(Math.random() * 18);
        url = test3 + apiKey + testG + genre1 + '&page=' + ranPage
        $.ajax
            ({
                url: url,
                method: 'Get'
            })
            .then(function (response) {
                results1 = response.results;
            //    console.log(results1)
                //gives us title will be put on a div on the page
                if (results1[ranAr].title != undefined) {
                    title = results1[ranAr].title;
                    //gives us summary ^*
                    summary = results1[ranAr].overview;
                    //give us a score^*
                    score = results1[ranAr].vote_average;

                    poster = "<img src = 'http://image.tmdb.org/t/p/w185/" + results1[ranAr].poster_path + "'>"
                }
                else if (results1[ranAr].title == undefined) { genreSearch() }

                //tests to confirm its working
                //console.log(response)
                //console.log(results1[ranAr].title)
                //console.log(results1[ranAr].overview);
               // console.log(results1[ranAr].vote_average)
                guideBox()
            }
            )
    }

    var guideBoxSearch = function () {
        url3 = 'http://api-public.guidebox.com/v2/movies/' + newId + '?api_key=' + apikey2;

        $.ajax
            ({
                url: url3,
                method: 'GET'
            })
            .then(function (response) {

                
                sources = response.subscription_web_sources;
            

                buySource = response.purchase_web_sources;
                


                // if (response.length >= 1){
                $('#movieTitle').html(title);
                $('#movieDisc').html(summary)
                $('#movieRating').html('Average rating: ' + score)
                $('#moviePoster').html(poster)


                recepieSearch();
                subscribe();
                buy();
                //recepieSearch();
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
                
                //pulls the guidebox id needed for the sources search


                

                if (results.length >= 1) {
                    newId = results[0].id;
                    guideBoxSearch();
                }

                else { genreSearch() }
            })

    }
    var genreSearch = function () {
        $('#freeSource').empty();
        $('#buySource').empty();
        $('#movieTitle').empty();
        $('#movieDisc').empty();
        $('#moviePoster').empty();

        
        if (genre == 'action') {
            genre1 = 28
        }
        else if (genre == 'horror') {
            genre1 = 27
        }
        else if (genre == 'comedy') {
            genre1 = 35
        }
        else if (genre == 'animation') {
            genre1 = 16
        }
        else if (genre == 'romance') {
            genre1= 10749
        }
        else if (genre == 'fantasy') {
            genre1 = 14   
        }
        else if (genre == 'scifi') {
            genre1 = 878
        }
        else if (genre == 'mystery') {
            genre1 = 9648
        }
        //how the ajax url is constructed to generate a random page based on the genre

        randomMovie();
       
    }

    var subscribe = function () {
        if (sources.length >= 1) {
            $('#paySource').html('<div> <h3> Availible to stream on these platforms: </h3>')
            for (i = 0; i < sources.length; i++) {
                $('#paySource').append(sources[i].display_name)
            }
        }
        else { $('#paySource').html('not availible on streaming') };
    }
    var buy = function () {
        if (buySource.length >= 1) {
            $('#freeSource').append('<div> <h3>Availible to buy on these platforms: </h3>')
            for (i = 0; i < buySource.length; i++) {
                $('#freeSource').append(buySource[i].display_name + ' ')
            }

        }
        else { $('#freeSource').html('not available to buy') }
    }
    //randomMovie();
    //button click sets the genre for the URL, if it is a drop down we can do that too, just add a data-genre tag to them all
    $('.genre').on('click', function () {
        genre = $(this).attr('data-genre');

        genreSearch();
    })
    
    var recepieAppend = function()
    {
        
    }

    var recepieSearch = function()
    {   
        if (genre == 'horror')//works
        {
            foodGenre = 'chili'
            console.log('this part of the recipie is working')
            
        }
        else if (genre == 'action')//works
        {
            foodGenre = 'steak'
        
        }
        else if (genre == 'comedy')
        {
            foodGenre = 'pepperoni';
        
        }
        else if (genre == 'romance')
        {
            foodGenre = 'pasta'
        
        }
        else if (genre == 'animation')
        {
            foodGenre = 'grilled&cheese'
            
        }
        else if (genre== 'fantasy')
        {
            foodGenre = 'taco';
            
        }
        else if (genre == 'scifi')
        {
            foodGenre= 'tuna'
            
        }
        else if (genre == 'mystery')//works
        {
            foodGenre = 'chowder'
            
        }
        else {foodGenre == 'sandwich'}
        
        
            recUrl = 'https://www.food2fork.com/api/search?key=' + apikey3 + '&q=' + foodGenre //+ '&page=' //+ ranPage2 
       

        $.ajax(
            {
             url: recUrl,
             method: 'GET'
        })
        .then( function(response){
            ranAr2 = Math.floor(Math.random() * 30)
            var recipes = JSON.parse(response).recipes;
            console.log(response);
            console.log(typeof(response));
            console.log(recipes[ranAr2])
           //console.log(response[ranAr2])
           // console.log(recepies)
           recTitle= recipes[ranAr2].title;
             recPicture= recipes[ranAr2].image_url;
             recSource = recipes[ranAr2].source_url; 
             console.log(recSource);
             console.log(recPicture)
             console.log(recTitle)
            
             $('#rTitle').html('<h3>' + recTitle);
             $('#rPicture').html("<img src='" + recPicture + "'>")
             $('#rLink').html('<h3> <a href=' + recSource + "'> recepie linkv</a></h3>'")
             
             

        })
    }
   

})
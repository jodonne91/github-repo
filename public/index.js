//index.js


var getAllData = function()
{
	$.ajax({
	   
	    url: "https://api.github.com/users/jodonne91",

	    data: {
	      api_key: "01828bb63169c69d08968d6ad28a5d9bac201a10"
	    },

	    method: "GET",

	    success: function(data) {
	    	console.log(data)

	    }

	})

}

var templates = {};

var makeTemplates = function()
{
	  var repoTemp = $("#repos").html()
	  templates.repos = Handlebars.compile(repoTemp)
}

var getDataAvatar = function()
{

		$.ajax({
	   
	    url: "https://api.github.com/users/jodonne91",

	    data: {
	      api_key: "01828bb63169c69d08968d6ad28a5d9bac201a10"
	    },

	    method: "GET",

	    success: function(data) {
	    	//repos = data.
	    	var imgAppend1 = '<img class="avatar" src = "' + data.avatar_url + '" width="20"/>'
	    	var imgAppend2 = '<img class="avatar" height="230" src="' + data.avatar_url + '" width="230">'
	    	console.log(data.avatar_url)
	    	$(".avatar_insert").append(imgAppend1);
	    	$(".avatar_link").append(imgAppend2);

	    }

	})

}


var getDataRepos = function() {

  $.ajax({

    url: "https://api.github.com/users/jodonne91/repos",

    data: {
      api_key: "01828bb63169c69d08968d6ad28a5d9bac201a10"
    },

    method: "GET",

    success: function(data) {

      // Filter out just the elevator incidents from WMATA's dataset
      var repos = _.each(data, function(point){
      	var language = point.language ;
        var starCount =  point.stargazers_count ;
        var forksCount = point.forks ;
        var stargazersUrl = point.stargazers_url ;
        var forksUrl = point.forks_url ;
        var url = point.url ;
        var description = point.description ;
        var updated = point.updated_at ;
        var repoName = point.name ;

        var pointObject = 
        {
        	RepoStats: language,
        	Starurl: stargazersUrl,
        	StargazersCount: starCount,
        	Forksurl: forksUrl,
        	ForksCount: forksCount,
        	Repourl: url,
        	RepoName: repoName,
        	Originurl: null,
        	RepoOrigin: null,
        	RepoDescription: description,


        }

        var repoTempString = templates.repos(pointObject);
        $('.repos').append(repoTempString);
      })

    }

  })

}



// Bind listener to on-load
$(document).on("ready", function(){

  makeTemplates();
  getDataRepos();
  getDataAvatar();

})
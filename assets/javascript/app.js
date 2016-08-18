//FIREBASE=================================================================================
$(document).ready (function(){
	// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDIB7zQdDc-r5aIEgZoMQGFJliLmJy7hEQ",
    authDomain: "volunteerhere-f345e.firebaseapp.com",
    databaseURL: "https://volunteerhere-f345e.firebaseio.com",
    storageBucket: "volunteerhere-f345e.appspot.com",
  };
  firebase.initializeApp(config);
	//sets interval time between each photo
	$('.carousel').carousel({
	  interval: 1000 * 5
	});

	$('#login').on('click', function() {

		//signs in users with an account
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // ...
		});
	});
	
	$('#signup').on('click',function() {
		
		//firebase new user sign up
		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // ...
		});
	});
	//allows user to signout
	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	}, function(error) {
	  // An error happened.
	});
});

//SETUP VARIABLES
	//============================================================================================
	var volunteerAPIkey="9560bbac6e597a4e08e3d82094ba5da2";
	// authentication headers for API requests
	var authenticationHeaders = {
  		"X-WSSE": volunteerAPIkey,
  		"Authorization": "WSSE profile='\ VolunteerHere\'" 
	};

	var queryURLBase = "https://www.volunteermatch.org/api/call?action=searchOpportunities";

	// metaData for the API Key/site
	var metaData = null;
	//This array variable will hold the results we get from the user input after
	//adding a location with the submit button.
	
	//Featured destinations (Just making these up right now. We can change them)
	var featureDestinations = ['New York City, NY', 'Los Angeles, CA', 'Chicago, IL', 'Austin, TX', 'Washington DC'];

	// we will use CORS headers to facilitate certain cross-domain requests
	jQuery.support.cors = true;

//FUNCTIONS
	//=================================================================================================
	//Create the query URL based on the chosen destination.
	//using document.body in case there are any scope problems


	
		// This line of code will grab the header from the carousel city.

	//This function handles when the user selects a feature destination;
	$('.featureCity').on('click', function(){

		// This line of code will grab city name and put it in the users destination.

		$('#usersDestination').val($(this).attr('name'));
		console.log($(this).attr('name'));
	});

	//Create the query URL based on a user destination not in featured destinations.
	//Added in usersDestination, pushed to our array.
	//using document.body in case there are any scope problems

	$(document.body).on('click', '.submitCity', function() {
  		//First adding to array if it is a new city not in the carousel.
  		// This line of code will grab the input from the textbox and trim any extra spaces
  		var newCity = $('#usersDestination').val().trim();

		var volSearch = {
   		"location": newCity,
        "opportunityTypes": ["public", "private"],
        "fieldsToDisplay": ["title", "imageUrl", "name", "location", "endDate", "plaintextDescription", "vmUrl"],
        "numberOfResults": 10
	 	};

		// The city from the textbox is then added to our array
		featureDestinations.push(volSearch.location);
	
  		//first empty the div with any previous search results
  		$('#volResults').empty();
  		
  		//Build the queryURL with the query URL base and the search terms --the destination (and trip dates?)

  		var queryURL = queryURLBase + "&key=" + volunteerAPIkey + "&query=" + JSON.stringify(volSearch);

  		//GET function to retrieve information about the volunteer opportunities from the volunteer match API
  		//with an AJAX call
  		$.ajax({url: queryURL, method: 'GET'})
		.done(function(response) {
			
			//Make a variable that stores the JSON from the volunteer match API
			var volMatch = response.opportunities;
			console.log(volMatch);


				//For loop for the city in the volunteer opportunities array.
	    		for (var j = 0; j < volMatch.length; j++) {
	     	
	     			//Create a new div for the volunteer opportunities

	     			var volResults = $('<div class="trip">');
					
	     			//Add the volunteer opportunities

	     			//Title of volunteer opportunity
	     			var oppTitle = $('<h3 id="volTitle">').html(volMatch[j].title);
	     			
	     			//Appending to volResults
	     			volResults.append(oppTitle);

	     			//End date
	     			if (volMatch[j].availability.endDate == null) {
	     				var endingDate = $('<div class="row" id="end">').text("End Date: Ongoing");
	     			} else {
	     			var endingDate = $('<div class="row" id="end">').text("End Date: " + volMatch[j].availability.endDate);
	     			}
	     			//Appending to volResults
	     			oppTitle.append(endingDate);
	     			
	     			//Organization name
	      			var orgName = $('<div class="row" id="org">').text(volMatch[j].parentOrg.name);
	     			endingDate.append(orgName);

	     			//Adding location
	     			var loc = $('<div class="row" id="location">').text(volMatch[j].location.city + ", " + volMatch[j].location.region);
	     			orgName.append(loc);
	     			//Images URL. Need to convert to an actual image.
	     			
	     			if (volMatch[j].imageUrl == null) {
						var imgURL = $('<img src="assets/images/noImage.jpg">')
							.addClass('volImg');				
					} else {
	     				var encImgURL = volMatch[j].imageUrl;
	     				var decImgURL = decodeURIComponent(encImgURL);
	     				var imgURL = $('<img>')
	     					.addClass('volImg')
	     					.attr('src', decImgURL);
	     			}
	     			//Create new row for images
	     			var imgRow = $('<div class="row" id="orgImg">').html(imgURL);
	     			loc.append(imgRow);
	     			
	     			//Description of volunteer opportunity
	     			var orgDescription = $('<div class="row" id="description">').text(volMatch[j].plaintextDescription);
	     			imgRow.append(orgDescription);

	     			//Volunteer Match URL
	     			var encMatchURL = volMatch[j].vmUrl;
	     			var decMatchURL = decodeURIComponent(encMatchURL);
	     			var matchURL = $('<a>Click here for more information!</a>')
	     				.addClass('.volMatchURL')
	     				.attr('href', decMatchURL)
	     				.attr("target","_blank");

	     			var linkRow = $('<div class="row" id="link">').html(matchURL);
	     			orgDescription.append(linkRow);
	     			
	     		
	 	 			//$('#tripDiv').append(volResults);

	    			// Putting 5 volunteer opportunities in each column
	     	 	if(j < 5) {
	      			$('#volCol1').append(oppTitle);
	      		}
	      			else {
	      				$('#volCol2').append(oppTitle);
	      			}
	    		}

	    	//Clear the textboxes when done
			$('#usersOrigin').val(" ");
			$('#usersDestination').val(" ");
	    });	
	    // We have this line so that users can hit "enter" instead of clicking on the button
		return false;
	});



  


  

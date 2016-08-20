<<<<<<< HEAD
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

//HOTELS API========================================================================================================

      // This example uses the autocomplete feature of the Google Places API.
      // It allows the user to find all hotels in a given place, within a given
      // country. It then displays markers for all the hotels returned,
      // with on-click details for each hotel.

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      var map, places, infoWindow;
      var markers = [];
      var autocomplete;
      var countryRestrict = {'country': 'us'};
      var MARKER_PATH = 'https://maps.gstatic.com/intl/en_us/mapfiles/marker_green';
      var hostnameRegexp = new RegExp('^https?://.+?/');

      var countries = {
        'au': {
          center: {lat: -25.3, lng: 133.8},
          zoom: 4
        },
        'br': {
          center: {lat: -14.2, lng: -51.9},
          zoom: 3
        },
        'ca': {
          center: {lat: 62, lng: -110.0},
          zoom: 3
        },
        'fr': {
          center: {lat: 46.2, lng: 2.2},
          zoom: 5
        },
        'de': {
          center: {lat: 51.2, lng: 10.4},
          zoom: 5
        },
        'mx': {
          center: {lat: 23.6, lng: -102.5},
          zoom: 4
        },
        'nz': {
          center: {lat: -40.9, lng: 174.9},
          zoom: 5
        },
        'it': {
          center: {lat: 41.9, lng: 12.6},
          zoom: 5
        },
        'za': {
          center: {lat: -30.6, lng: 22.9},
          zoom: 5
        },
        'es': {
          center: {lat: 40.5, lng: -3.7},
          zoom: 5
        },
        'pt': {
          center: {lat: 39.4, lng: -8.2},
          zoom: 6
        },
        'us': {
          center: {lat: 37.1, lng: -95.7},
          zoom: 3
        },
        'uk': {
          center: {lat: 54.8, lng: -4.6},
          zoom: 5
        }
      };

      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: countries['us'].zoom,
          center: countries['us'].center,
          mapTypeControl: false,
          panControl: false,
          zoomControl: false,
          streetViewControl: false
        });

        infoWindow = new google.maps.InfoWindow({
          content: document.getElementById('info-content')
        });

        // Create the autocomplete object and associate it with the UI input control.
        // Restrict the search to the default country, and to place type "cities".
        autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */ (
                document.getElementById('autocomplete')), {
              types: ['(cities)'],
              componentRestrictions: countryRestrict
            });
        places = new google.maps.places.PlacesService(map);

        autocomplete.addListener('place_changed', onPlaceChanged);

        // Add a DOM event listener to react when the user selects a country.
        document.getElementById('country').addEventListener(
            'change', setAutocompleteCountry);
      }

      // When the user selects a city, get the place details for the city and
      // zoom the map in on the city.
      function onPlaceChanged() {
        var place = autocomplete.getPlace();
        if (place.geometry) {
          map.panTo(place.geometry.location);
          map.setZoom(15);
          search();
        } else {
          document.getElementById('autocomplete').placeholder = 'Enter a city';
        }
      }

      // Search for hotels in the selected city, within the viewport of the map.
      function search() {
        var search = {
          bounds: map.getBounds(),
          types: ['lodging']
        };

        places.nearbySearch(search, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearResults();
            clearMarkers();
            // Create a marker for each hotel found, and
            // assign a letter of the alphabetic to each marker icon.
            for (var i = 0; i < results.length; i++) {
              var markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
              var markerIcon = MARKER_PATH + markerLetter + '.png';
              // Use marker animation to drop the icons incrementally on the map.
              markers[i] = new google.maps.Marker({
                position: results[i].geometry.location,
                animation: google.maps.Animation.DROP,
                icon: markerIcon
              });
              // If the user clicks a hotel marker, show the details of that hotel
              // in an info window.
              markers[i].placeResult = results[i];
              google.maps.event.addListener(markers[i], 'click', showInfoWindow);
              setTimeout(dropMarker(i), i * 100);
              addResult(results[i], i);
            }
          }
        });
      }

      function clearMarkers() {
        for (var i = 0; i < markers.length; i++) {
          if (markers[i]) {
            markers[i].setMap(null);
          }
        }
        markers = [];
      }

      // Set the country restriction based on user input.
      // Also center and zoom the map on the given country.
      function setAutocompleteCountry() {
        var country = document.getElementById('country').value;
        if (country == 'all') {
          autocomplete.setComponentRestrictions([]);
          map.setCenter({lat: 15, lng: 0});
          map.setZoom(2);
        } else {
          autocomplete.setComponentRestrictions({'country': country});
          map.setCenter(countries[country].center);
          map.setZoom(countries[country].zoom);
        }
        clearResults();
        clearMarkers();
      }

      function dropMarker(i) {
        return function() {
          markers[i].setMap(map);
        };
      }

      function addResult(result, i) {
        var results = document.getElementById('results');
        var markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
        var markerIcon = MARKER_PATH + markerLetter + '.png';

        var tr = document.createElement('tr');
        tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
        tr.onclick = function() {
          google.maps.event.trigger(markers[i], 'click');
        };

        var iconTd = document.createElement('td');
        var nameTd = document.createElement('td');
        var icon = document.createElement('img');
        icon.src = markerIcon;
        icon.setAttribute('class', 'placeIcon');
        icon.setAttribute('className', 'placeIcon');
        var name = document.createTextNode(result.name);
        iconTd.appendChild(icon);
        nameTd.appendChild(name);
        tr.appendChild(iconTd);
        tr.appendChild(nameTd);
        results.appendChild(tr);
      }

      function clearResults() {
        var results = document.getElementById('results');
        while (results.childNodes[0]) {
          results.removeChild(results.childNodes[0]);
        }
      }

      // Get the place details for a hotel. Show the information in an info window,
      // anchored on the marker for the hotel that the user selected.
      function showInfoWindow() {
        var marker = this;
        places.getDetails({placeId: marker.placeResult.place_id},
            function(place, status) {
              if (status !== google.maps.places.PlacesServiceStatus.OK) {
                return;
              }
              infoWindow.open(map, marker);
              buildIWContent(place);
            });
      }

      // Load the place information into the HTML elements used by the info window.
      function buildIWContent(place) {
        document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
            'src="' + place.icon + '"/>';
        document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
            '">' + place.name + '</a></b>';
        document.getElementById('iw-address').textContent = place.vicinity;

        if (place.formatted_phone_number) {
          document.getElementById('iw-phone-row').style.display = '';
          document.getElementById('iw-phone').textContent =
              place.formatted_phone_number;
        } else {
          document.getElementById('iw-phone-row').style.display = 'none';
        }

        // Assign a five-star rating to the hotel, using a black star ('&#10029;')
        // to indicate the rating the hotel has earned, and a white star ('&#10025;')
        // for the rating points not achieved.
        if (place.rating) {
          var ratingHtml = '';
          for (var i = 0; i < 5; i++) {
            if (place.rating < (i + 0.5)) {
              ratingHtml += '&#10025;';
            } else {
              ratingHtml += '&#10029;';
            }
          document.getElementById('iw-rating-row').style.display = '';
          document.getElementById('iw-rating').innerHTML = ratingHtml;
          }
        } else {
          document.getElementById('iw-rating-row').style.display = 'none';
        }

        // The regexp isolates the first part of the URL (domain plus subdomain)
        // to give a short URL for displaying in the info window.
        if (place.website) {
          var fullUrl = place.website;
          var website = hostnameRegexp.exec(place.website);
          if (website === null) {
            website = 'http://' + place.website + '/';
            fullUrl = website;
          }
          document.getElementById('iw-website-row').style.display = '';
          document.getElementById('iw-website').textContent = website;
        } else {
          document.getElementById('iw-website-row').style.display = 'none';
        }
      }

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
        "fieldsToDisplay": ["title", "imageUrl", "name", "url", "contact", "location", "endDate", "plaintextDescription", "vmUrl"]
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

            var tripDiv = $('<div class="trip">');
          
            //Add the volunteer opportunities

            //Title of volunteer opportunity
            var oppTitle = $('<h3 class="volTitle">').html(volMatch[j].title);

            //End date
            var endingDate = $('<span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>').text(" End Date: " + volMatch[j].availability.endDate);
            
            //Organization name
              var orgName = $('<p class="volOrgName">').text(volMatch[j].parentOrg.name);
            //console.log(orgName);

            //Images URL. Need to convert to an actual image.
            var encImgURL = volMatch[j].imageUrl;
            var decImgURL = decodeURIComponent(encImgURL);
            var imgURL = $('<img>')
              .addClass('volImage')
              .attr('src', decImgURL);
          
            //Description of volunteer opportunity

            var orgDescription = $('<p class="volDescription">').text(volMatch[j].plaintextDescription);

            //Adding location
            var loc = $('<p class="volLocation">').text(volMatch[j].location.city + ", " + volMatch[j].location.region);

            //Docs say there is contact info available, but I don't see one in the response

            //var contactOrg = $('<p class="volContact">').text(volMatch[j].contact);

            //Organization URL

            //var encOrgURL = volMatch[j].url;
            //var decOrgURL = decodeURIComponent(encOrgURL);
            //var orgURL = $('<a href="Organization Website">').html(decOrgURL);

            //Volunteer Match URL
            var encMatchURL = volMatch[j].vmUrl;
            //console.log(encMatchURL);
            var decMatchURL = decodeURIComponent(encMatchURL);
            //console.log(decMatchURL);
            var matchURL = $('<a>Click here for more information!</a>')
              .addClass('.volMatchURL')
              .attr('href', decMatchURL);

            //var flights = 

            //var hotels = 
            
            tripDiv.append(oppTitle);
            tripDiv.append(endingDate);
            tripDiv.append(orgName);
            tripDiv.append(imgURL);
            tripDiv.append(orgDescription);
            tripDiv.append(loc);
            tripDiv.append(matchURL);

            //Prepend tripDiv to volResults
            $('#volResults').prepend(tripDiv);
          };
        //Clear the textboxes when done
      $('#usersOrigin').val(" ");
      $('#usersDestination').val(" ");
      }); 
      // We have this line so that users can hit "enter" instead of clicking on the button
    return false;
  });

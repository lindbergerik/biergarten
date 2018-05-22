ons.createElement('favoritesDialog.html', { append: true })
ons.createElement('aboutDialog.html', { append: true })


var favObjs;
// Creates an array with the favorite park objects when the the switch for "Show Favorites only" is set,
// then initMap is called with only the favorite parks.
// Unchecking the switch will call initMap with all parks.
document.getElementById('showFav').addEventListener('change', function(e) {
	favObjs = [];
	favorites = JSON.parse(localStorage.getItem('favs'));
	if (!favorites){
		favorites = [];
	}
	if (document.getElementById('showFav').checked === true){
		for (var i = favorites.length - 1; i >= 0; i--) {
			for (var o = parks.length - 1; o >= 0; o--) {
				if ( favorites[i] === parks[o].name){
					favObjs.push(parks[o])
				}
			}
		}
		initMap(favObjs);
	} else{
		initMap(parks);
	}
})

// Displays the favorites page, favorites are fetched from local storage
var showFavoritesDialog = function() {
  var dialog = document.getElementById('favorites');

  if (dialog) {
    dialog.show();
  }
  var favorites = JSON.parse(localStorage.getItem('favs'));

  var add = document.getElementById('favList');
  	  while (add.firstChild){
	  	add.removeChild(add.firstChild);
	  }
	  if (favorites) {
	  	  for (var i = 0; i < favorites.length; i++) {
	  	  var node = document.createElement("ons-list-item")
		  var node2 = document.createElement("p");
		  var textnode = document.createTextNode(favorites[i]);
		  node2.appendChild(node);
		  node.appendChild(textnode);
		  add.appendChild(node2);
		}
	  }
};
// Displays the about page
var showAboutDialog = function() {
  var dialog = document.getElementById('about');
    if (dialog) {
    dialog.show();
  	}
  }

// Hides either the favorites page or the about page, depending on id
var hideDialog = function(id) {
  document
    .getElementById(id)
    .hide();
};

// Style for google maps, will hide all default position of interest
var myStyles =[
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
              { visibility: "off" }
        ]
    }
];

var map;
let markers = [];
// initMap will create the markers and info windows and render the map with them
function initMap(parksArray) {
	if (!(parksArray)){
		parksArray = parks;
	}

	map = new google.maps.Map(document.getElementById("mapDiv"), {
		center: {lat: 59.336559, lng: 18.062660},
		zoom: 11,
		disableDefaultUI: true,
		styles: myStyles
	});

	here();

	let chosen = false;
	let contents = [];
	let infoWindows = [];
	for (var i=0; i<parksArray.length; i++){
		var icon;

		if (parksArray[i].drink === 'Never'){
			icon = './img/drink_no.png'
		}
		else if (parksArray[i].drink === 'Always'){
			icon = './img/drink.png'
		}
		else{
			icon = './img/drink_time.png'
		}

		markers[i] = new google.maps.Marker({
			position: {lat: parksArray[i].lat, lng: parksArray[i].lng},
			icon: icon,
			map: map,
			draggable: false,
			animation: google.maps.Animation.DROP,
			title: parksArray[i].name
		})
		markers[i].index = i;
		contents[i] = '<div style="text-align:center;"><h1 id="parkName">' + parksArray[i].name + '</h1><p> Drink here: '+parksArray[i].drink
			+'</p><ons-row><ons-col><ons-button id="addFav" onClick="addFav(\'' + parksArray[i].name + '\'); ons.notification.toast(\'Added to favorites! \', { timeout: 1000, animation: \'fall\' })" class="left button-margin">Favorite</ons-button></ons-col>'
			+'<ons-col><ons-button id="takeMe" onClick="calculateRoute(\'' + parksArray[i].name + '\')" class="right button-margin">Take me there</ons-button></ons-col></ons-row></div>';
		
		infoWindows[i] = new google.maps.InfoWindow({
			content: contents[i],
			maxWidth: 300
		});

		google.maps.event.addListener(markers[i], 'click', function() {
			console.log(chosen);
			if (chosen === false){
				console.log('chosen '+ chosen)
				infoWindows[this.index].open(map, markers[this.index]);
				map.panTo(markers[this.index].getPosition());
			}
			else{
				infoWindows[chosen].close();
				infoWindows[this.index].open(map, markers[this.index]);
				map.panTo(markers[this.index].getPosition());
			}
			chosen = this.index;
		})
	}
}


var myPosition;
// will get the current postion of the user
function here () {
	if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
		var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		myPosition = new google.maps.Marker({
			position: pos,
			// coordinates for Björns trädgård for testing, needs to set coordinates in var pos as well
			//lat: 59.315180, 	
			//lng: 18.074029,
			icon: './img/beerapi.png',
			lat: position.coords.latitude,
			lng: position.coords.longitude,
			animation: google.maps.Animation.BOUNCE,
			title:"Here you at, boiiii!",
		});
		myPosition.setMap(map);
	}, function() {
		handleLocationError(true, map.getCenter());
		});
	}
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
	infoWindow.open(map);
}


var closestPark;
// will find the park closest to the user, that allows drinking at the current hour
function findDrinkLocation(){
	if (document.getElementById('showFav').checked === true){
		parksArray = favObjs;
	}
	else{
		parksArray = parks;
	}
	var closestDistance = 100000;

	for (var i=0; i < parksArray.length; i++){
		var parkLocation = new google.maps.LatLng(parksArray[i].lat, parksArray[i].lng);
		var hereLocation = new google.maps.LatLng(myPosition.lat, myPosition.lng);
		var distance =  google.maps.geometry.spherical.computeDistanceBetween(parkLocation, hereLocation);

		if ( distance < closestDistance){
			if (parksArray[i].drink !== 'Never'){
				time = this.getTime();
				if( time >= 00 && time <= 07){
					if (parksArray[i].drink === "Always"){
						closestDistance = distance;
						closestPark = parksArray[i];
					}
				}
				else{
					closestDistance = distance;
					closestPark = parksArray[i];
				}
			}
		}
	}

	if (closestPark){
		if (closestPark.drink !== "Never"){
			calculateRoute(closestPark.name)
		}
	}
}

var directionsService;
var directionsDisplay;
// will find the shortest route to the closest park, given the name of the park
function calculateRoute(destPark){
	var destination;
	for (var i = 0; i<parks.length; i++){
		if (parks[i].name === destPark){
			destination = parks[i];
		}
	}
	// clear past routes
	if (directionsDisplay != null) {
		directionsDisplay.setMap(null);
		directionsDisplay = null;
	}

	directionsService = new google.maps.DirectionsService();
	directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setMap(map);
	directionsDisplay.setOptions({
		suppressMarkers: true
	});

	console.log(destination.name + ' to ' + myPosition.title)
	var parkLocation = new google.maps.LatLng(destination.lat, destination.lng);
	var hereLocation = new google.maps.LatLng(myPosition.lat, myPosition.lng);
	var request = {
		origin: hereLocation,
		destination: parkLocation,
		travelMode: google.maps.DirectionsTravelMode.WALKING
	};

	directionsService = new google.maps.DirectionsService();
	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
		}
	});
}


var myFavs = JSON.parse(localStorage.getItem('favs'));
// adding a chosen park to the favorites, saving it in local storage
function addFav(name) {
	if (myFavs.length > 0) {
		var exist = false;
		for (var i = myFavs.length - 1; i >= 0; i--) {
			if (myFavs[i] === name){
				exist = true;
			}
		}
		if (exist == true) {
			return
		}
		else{
			myFavs.push(name);
		}
	}
	else{
		myFavs.push(name);
	}
	localStorage.setItem('favs', JSON.stringify(myFavs));
}

// clears the list of favorite parks, removing routes and reinitiating map with all parks
function clearFavs(){
	myFavs = [];
	var add = document.getElementById('favList');
  	while (add.firstChild){
	  	add.removeChild(add.firstChild);
	}
	if (document.getElementById('showFav').checked === true){
		// Clear past routes
		if (directionsDisplay != null) {
			directionsDisplay.setMap(null);
			directionsDisplay = null;
		}
		document.getElementById('showFav').checked = false;
		favObjs = [];
		closestPark = '';
		initMap();
	}
	localStorage.setItem('favs', JSON.stringify(myFavs));
}

// getting the current hour
function getTime(){
	var date = new Date();
	var hour = date.getHours(); 
	return hour;
}

// parks is the array containing all park objects,
// where each object contains the name, coordinates and drinking rules.
var parks = [
	//drink always
	{
		name: 'Kungsträdgården',
		lat: 59.331375,
		lng: 18.071424,
		drink: 'Always'
	},
	{
		name: 'Berzelii park',
		lat: 59.332538,
		lng: 18.075066,
		drink: 'Always'
	},
	{
		name: 'Djurgården',
		lat: 59.326993,
		lng: 18.121256,
		drink: 'Always'
	},
	{
		name: 'Gustaf Adolfsparken',
		lat: 59.337225,
		lng: 18.097979,
		drink: 'Always'
	},
	{
		name: 'Gärdet',
		lat: 59.337102,
		lng: 18.110871,
		drink: 'Always'
	},
	{
		name: 'Humlegården',
		lat: 59.339611,
		lng: 18.072231,
		drink: 'Always'
	},
	{
		name: 'Tessinparken',
		lat: 59.342235,
		lng: 18.094118,
		drink: 'Always'
	},
	{
		name: 'Klipporna i Fredhäll',
		lat: 59.328683,
		lng: 18.001143,
		drink: 'Always'
	},
	{
		name: 'Långholmen',
		lat: 59.322128,
		lng: 18.032814,
		drink: 'Always'
	},
	{
		name: 'Tegnérlunden',
		lat: 59.338108,
		lng: 18.054206,
		drink: 'Always'
	},
	{
		name: 'Vanadislunden',
		lat: 59.348034,
		lng: 18.055280,
		drink: 'Always'
	},
	{
		name: 'Vasaparken',
		lat: 59.340473,
		lng: 18.043717,
		drink: 'Always'
	},
	{
		name: 'Hagaparken',
		lat: 59.361712,
		lng: 18.034181,
		drink: 'Always'
	},
	{
		name: 'Ulriksdals slottspark',
		lat: 59.390343,
		lng: 18.014228,
		drink: 'Always'
	},
	//drick mellan 07-00
	{
		name: 'Tantolunden',
		lat: 59.312935, 
		lng: 18.047503,
		drink: 'Between 07-00'
	},
	{
		name: 'Skinnarviksparken',
		lat: 59.319673,
		lng: 18.048215,
		drink: 'Between 07-00'
	},
	{
		name: 'Vitabergsparken',
		lat: 59.311089,
		lng: 18.090116,
		drink: 'Between 07-00'
	},
	{
		name: 'Fåfängan',
		lat: 59.314877,
		lng: 18.102563,
		drink: 'Between 07-00'
	},
	{
		name: 'Åsöberget',
		lat: 59.314545,
		lng: 18.095574,
		drink: 'Between 07-00'
	},
	{
		name: 'Kristinebergsparken',
		lat: 59.335224,
		lng: 18.005440,
		drink: 'Between 07-00'
	},
	{
		name: 'Rålambshovsparken',
		lat: 59.328128,
		lng: 18.024565,
		drink: 'Between 07-00'
	},
	{
		name: 'Kronobergsparken',
		lat: 59.331827,
		lng: 18.035358,
		drink: 'Between 07-00'
	},
	{
		name: 'Galärparken–Lejonparken',
		lat: 59.329245,
		lng: 18.090988,
		drink: 'Between 07-00'
	},
	//drink never
	{
		name: 'Mosebacke torg',
		lat: 59.317974,
		lng: 18.074383,
		drink: 'Never'
	},    
	{
		name: 'Sandbacksparken',
		lat: 59.316837,
		lng: 18.080256,
		drink: 'Never'
	},    
	{
		name: 'Stigbergsparken',
		lat: 59.315807,
		lng: 18.087153,
		drink: 'Never'
	},
	{
		name: 'Tengdahlsparken',
		lat: 59.311139, 
		lng: 18.093750,
		drink: 'Never'
	},
	{
		name: 'Axel Landquists park',
		lat: 59.313974, 
		lng: 18.080759,
		drink: 'Never'
	},
	{
		name: 'Droskan',
		lat: 59.315278,
		lng: 18.079073,
		drink: 'Never'
	},
	{
		name: 'Björns trädgård',
		lat: 59.315180, 
		lng: 18.074029,
		drink: 'Never'
	},
	{
		name: 'Nytorget',
		lat: 59.312152, 
		lng: 18.083321,
		drink: 'Never'
	},
	{
		name: 'Tullgårdsparken',
		lat: 59.306285, 
		lng: 18.082675,
		drink: 'Never'
	},
	{
		name: 'Fatbursparken',
		lat: 59.314187, 
		lng: 18.068415,
		drink: 'Never'
	},
	{
		name: 'Runt polishuset på Torkel Knutssonsgatan/Rosenlundsgatan',
		lat: 59.315948, 
		lng: 18.058712,
		drink: 'Never'
	},
	{
		name: 'Tjurbergsparken',
		lat: 59.308409, 
		lng: 18.071394,
		drink: 'Never'
	},
	{
		name: 'Sankt Göransparken',
		lat: 59.334944,
		lng: 18.024328,
		drink: 'Never'
	},
	{
		name: 'Kungsholmstorg',
		lat: 59.327696, 
		lng: 18.042473,
		drink: 'Never'
	},
	{
		name: 'Serafimerstranden',
		lat: 59.328507, 
		lng: 18.055126,
		drink: 'Never'
	},
	{
		name: 'Blekholmsstranden',
		lat: 59.330975, 
		lng: 18.051741,
		drink: 'Never'
	},
	{
		name: 'Norra bantorget',
		lat: 59.334895, 
		lng: 18.054516,
		drink: 'Never'
	},
	{
		name: 'Dammen vid Observatorielunden',
		lat: 59.342723, 
		lng: 18.056038,
		drink: 'Never'
	},
	{
		name: 'Monica Zetterlunds Park',
		lat: 59.346313, 
		lng: 18.060520,
		drink: 'Never'
	},
	{
		name: 'Brunnsviks strandbad',
		lat: 59.362205,
		lng: 18.048582,
		drink: 'Never'
	}
]
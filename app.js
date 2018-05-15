document.addEventListener('prechange', function(event) {
  document.querySelector('ons-toolbar .center')
    .innerHTML = event.tabItem.getAttribute('label');
});

window.fn = {};

window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};

window.fn.load = function(page) {
  var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  content.load(page)
    .then(menu.close.bind(menu));
};

var myStyles =[
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
              { visibility: "off" }
        ]
    }
];

var map, infowindow;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 59.336559, lng: 18.062660},
		zoom: 11,
		// mapTypeId: 'satellite',
		// tilt: 45,
		disableDefaultUI: true,
		styles: myStyles
	});

	this.marker1 = new google.maps.Marker( {
		position: {lat: 59.336559, lng: 18.062660},
		map: map,
		draggable: true,
		animation: google.maps.Animation.DROP,
		title: 'Hello World!'
	});

	this.marker2 = new google.maps.Marker( {
		position: {lat: 59.336660, lng: 18.062458},
		map: map,
		animation: google.maps.Animation.BOUNCE,
		title: 'HOLA'
	});

	var icon1 = {
	    url: "https://github.com/lindbergerik/lindbergerik.github.io/blob/master/erik.jpg?raw=true", // url
	    scaledSize: new google.maps.Size(50, 50), // scaled size
	    origin: new google.maps.Point(0,0), // origin
	    anchor: new google.maps.Point(0, 0) // anchor
	};
	var coordsErik = {lat: 59.312154, lng: 18.079739};
	this.marker3 = new google.maps.Marker( {
		position: coordsErik,
		map: map,
		icon: icon1,
		title: 'Hannas!'
	});

	var icon2 = {
	    url: "https://github.com/lindbergerik/lindbergerik.github.io/blob/master/sebbe.jpg?raw=true", // url
	    scaledSize: new google.maps.Size(50, 50), // scaled size
	    origin: new google.maps.Point(0,0), // origin
	    anchor: new google.maps.Point(0, 0) // anchor
	};
	var coordsSebbe = {lat: 59.341122, lng: 18.058018};
	this.marker4 = new google.maps.Marker( {
		position: coordsSebbe,
		map: map,
		icon: icon2,
		title: 'Hirschen!'
	});

}

function geoLocation() {
	//GEOLOCATION
	infoWindow = new google.maps.InfoWindow;
	// Try HTML5 geolocation.
	if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position) {
	    	var pos = {
	        	lat: position.coords.latitude,
	        	lng: position.coords.longitude
	    	};

	        infoWindow.setPosition(pos);
	        infoWindow.setContent('Location found.');
	        infoWindow.open(map);
	        map.setCenter(pos);
	    }, function() {
	    	handleLocationError(true, infoWindow, map.getCenter());
		});
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function goErik() {
	map.setCenter({lat: 59.312154, lng: 18.079739});
}

function goSebbe() {
	map.setCenter({lat: 59.341122, lng: 18.058018});
}
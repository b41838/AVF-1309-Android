// JavaScript Document
	
// native variables
var getAccel,
	//getGeo,
	pictureSource,
	destinationType;

document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
function onDeviceReady() {
	console.log("Lets do this");
	
	pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
	$('#device').on('pageinit', getDevice);
	$('#connection').on('pageinit', getConnection);
	$('#accel').on('pageinit', getAccel);
}


	
$('#instagramFeed').on('pageinit', function() {

	// Instagram API
});

// Instagram API
	
// get variable from textbox
var getVar = function() {
	$("#instagram").on("click", "#instaButton", function() {
			console.log("hi");
			var tag = $("#hashtag").val();
			console.log(tag);
			
	var url = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?callback=?&amp;client_id=9a4423b4dfdd4111a73d4bd39082f519&amp;count=12";
	
	$.getJSON(url, getFeed);
	
	});
};

var getFeed = function(info) {

	console.log(info);
	console.log(info.data.length);

	$("#instagramStatus").html("<h2>Instagram Results:</h2>");
	
	$.each(info.data, function(index, photo) {  // index is position in array of info.data
		var pic = "<li><img src='" + photo.images.thumbnail.url + "' alt='" + photo.user.id + "' /><h4>" + photo.user.full_name + 			", <em>(" + photo.user.name +")</em></h4></li>";
		$("#pullFeed").append(pic);
	}); // end each
	
	$("li:nth-child(3n+1)").addClass("ui-block-a");
	$("li:nth-child(3n+2)").addClass("ui-block-b");
	$("li:nth-child(3n+3)").addClass("ui-block-c");
}; // end screenOutput


// GeoLocation

$('#geo').on('pageinit', function() {
    var geoSuccess = function(position) {
		alert("Hello");
		alert('Latitude: '      + position.coords.latitude          + '\n' +
              'Longitude: '     + position.coords.longitude);		
		
		var myMap = document.createElement('section');
		myMap.id = 'geoMap';
		myMap.style.height = '400px';
		myMap.style.width = '600px';
		
		document.querySelector('article').appendChild(myMap);
		
		var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		
		var options = { 
				zoom: 15,
				center: coords,
				mapTypeControl: false,
				navigationControlOptions: {
						style: google.maps.NavigationControlStyle.SMALL
		},
		
		mapTypeId: google.maps.MapTypeId.ROADMAP
		
		};
		
		var map = new google.maps.Map(document.getElementById("geoMap"), options);
		
		var marker = new google.maps.Marker({
				position: coords,
				map: map,
				title:"You are here!"
		});
    };
	
	var geoFail = function(error) {
		alert('code: '    + error.code    + '\n' +
          	  'message: ' + error.message + '\n');	
	};
                
        navigator.geolocation.getCurrentPosition(geoSuccess, geoFail);

});


// Accelerometer

var accelSuccess = function(acceleration) {
    alert('Acceleration X: ' + acceleration.x + '\n' +
          'Acceleration Y: ' + acceleration.y + '\n' +
          'Acceleration Z: ' + acceleration.z + '\n' +
          'Timestamp: '      + acceleration.timestamp + '\n');
};

var accelError = function() {
	alert("Uh, :x!");
};
	
var getAccel = function() {
	navigator.accelerometer.getCurrentAcceleration(accelSuccess, accelError);
};


// Camera

var onPhotoDataSuccess = function(imageData) {
      alert(imageData);

      // Get image handle
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      smallImage.src = "data:image/jpeg;base64," + imageData;
};

// Called when a photo is successfully retrieved
var onPhotoURISuccess = function(imageURI) {
	
	alert(imageURI);

	// Get image handle
	var largeImage = document.getElementById('largeImage');

	// Unhide image elements
	largeImage.style.display = 'block';

	// Show the captured photo
	// The inline CSS rules are used to resize the image
	largeImage.src = imageURI;
};

// A button will call this function
var capturePhoto = function() {
	// Take picture using device camera and retrieve image as base64-encoded string
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
		quality: 50, destinationType: destinationType.DATA_URL });
};

// A button will call this function
var capturePhotoEdit = function() {
	// Take picture using device camera, allow edit, and retrieve image as base64-encoded string
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
		quality: 20, allowEdit: true, destinationType: destinationType.DATA_URL
	});
};

// A button will call this function
var getPhoto = function(source) {
	// Retrieve image file location from specified source
	navigator.camera.getPicture(onPhotoURISuccess, onFail, {
		quality: 50, destinationType: destinationType.FILE_URI, sourceType: source 
	});
};

// Called if something bad happens.
var onFail = function(message) {
	alert('Failed because: ' + message);
};


// Device Info

var getDevice = function() {
	var element = document.getElementById('deviceProperties');
	element.innerHTML = 'Device Cordova: '  + device.cordova  + '<br />' +
						'Device Platform: ' + device.platform + '<br />' +
						'Device Version: '  + device.version  + '<br />';
};


// Connection

var getConnection = function() {
	var connectionType = navigator.connection.type;

	var states = {};
	states[Connection.UNKNOWN]  = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI]     = 'WiFi connection';
	states[Connection.CELL_2G]  = 'Cell 2G connection';
	states[Connection.CELL_3G]  = 'Cell 3G connection';
	states[Connection.CELL_4G]  = 'Cell 4G connection';
	states[Connection.CELL]     = 'Cell generic connection';
	states[Connection.NONE]     = 'No network connection';

	alert('Connection type: ' + states[connectionType]);
};
/**
 * Created by Russl on 2017-03-10.
 */

var only_urban_center
var only_rural

var range

var placeA = "Library"
var placeB = "Beer Store"



var map;
var infowindow;

function initMap() {
    var pyrmont = {lat: -33.867, lng: 151.195};
    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 15,
    });

var line = new google.maps.Polyline({
    path: [new google.maps.LatLng(37.4419, -122.1419), new google.maps.LatLng(37.4519, -122.1519)],
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 10,
    geodesic: true,
    map: map
});



    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: pyrmont,
        radius: 500,
        type: ['beer store']
    }, function(response, status) {callback(response, status, 'red')});
    
    var service1 = new google.maps.places.PlacesService(map);
    service1.nearbySearch({
        location: pyrmont,
        radius: 500,
        type: ['store']
    }, function(response, status) {callback(response, status, 'green')});

}

function callback(results, status, item) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i], item);
        }
    }
}


function createMarker(place, c) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: 'http://maps.google.com/mapfiles/ms/icons/' + c + '-dot.png'
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}


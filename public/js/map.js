// if HTML DOM Element that contains the map is found...
if (document.getElementById('map-canvas')) {

  // Coordinates to center the map
  var myLatlng = new google.maps.LatLng(33.4409723, -112.0650445);

  // Other options for the map, pretty much selfexplanatory
  var mapOptions = {
    zoom: 14,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  // Attach a map to the DOM Element, with the defined settings
  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}


// var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// var labelIndex = 0;
//
// function initialize() {
//   var bangalore = {
//     lat: 12.97,
//     lng: 77.59
//   };
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 12,
//     center: bangalore
//   });
//
//   // This event listener calls addMarker() when the map is clicked.
//   google.maps.event.addListener(map, 'click', function(event) {
//     addMarker(event.latLng, map);
//   });
//
//   // Add a marker at the center of the map.
//   addMarker(bangalore, map);
// }
//
// // Adds a marker to the map.
// function addMarker(location, map) {
//   // Add the marker at the clicked location, and add the next-available label
//   // from the array of alphabetical characters.
//   var marker = new google.maps.Marker({
//     position: location,
//     label: labels[labelIndex++ % labels.length],
//     map: map
//   });
// }

google.maps.event.addDomListener(window, 'load', initialize);
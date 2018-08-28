function initMap(){
  let options = {
    zoom: 14
  }
  let map = new google.maps.Map(document.getElementById('map-canvas'), options);
  let infoWindow = new google.maps.InfoWindow;

  google.maps.event.addListener(map, 'click', function(event){
    addMarker({coords:event.latLng});
    var latitude = event.latLng.lat();
    var longitude = event.latLng.lng();
    console.log( latitude + ', ' + longitude);
  })

  // set marker to current position
  function addMarker(props){
    let marker = new google.maps.Marker({
      position: props.coords,
      map: map,
      content: props.content
    })
    if(props.content){
      let infowindow = new google.maps.InfoWindow({
        content: props.content
      });

      marker.addListener('click', function(){
        infowindow.open(map, marker);
      });
    }
  }

  // sets current position to center
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }
};

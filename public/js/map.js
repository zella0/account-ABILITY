function initMap() {
  let map, infoWindow;
  let latInput = document.getElementById('lat-input');
  let lngInput = document.getElementById('lng-input');
  // sets current position to center
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      infoWindow = new google.maps.InfoWindow;
      map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 14,
        center: pos
      });
      infoWindow.open(map);
      map.setCenter(pos);

      // set click listenr on map
      google.maps.event.addListener(map, 'click', function(event) {
        // addMarker({coords: event.latLng});
        var latitude = event.latLng.lat();
        var longitude = event.latLng.lng();
        latInput.value = latitude;
        lngInput.value = longitude;
        console.log(latitude + ', ' + longitude);
      })

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }


  // 
  // function geocodeLatLng(geocoder, map, infowindow) {
  //   var input = document.getElementById('latlng').value;
  //   var latlngStr = input.split(',', 2);
  //   var latlng = {
  //     lat: parseFloat(latlngStr[0]),
  //     lng: parseFloat(latlngStr[1])
  //   };
  //   geocoder.geocode({
  //     'location': latlng
  //   }, function(results, status) {
  //     if (status === 'OK') {
  //       if (results[0]) {
  //         map.setZoom(11);
  //         var marker = new google.maps.Marker({
  //           position: latlng,
  //           map: map
  //         });
  //         infowindow.setContent(results[0].formatted_address);
  //         infowindow.open(map, marker);
  //       } else {
  //         window.alert('No results found');
  //       }
  //     } else {
  //       window.alert('Geocoder failed due to: ' + status);
  //     }
  //   });
  // }

  // set marker to current position
  function addMarker(props) {
    let marker = new google.maps.Marker({
      position: props.coords,
      map: map,
      content: props.content
    })
    if (props.content) {
      infoWindow = new google.maps.InfoWindow({
        content: props.content
      });

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    }
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }
};

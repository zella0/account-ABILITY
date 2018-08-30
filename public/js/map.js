function initMap() {
  let map, infoWindow, geocoder;

  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     var pos = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude
  //     };
  //     geocoder = new google.maps.Geocoder;
  //     infoWindow = new google.maps.InfoWindow;
  //     map = new google.maps.Map(document.getElementById('map-canvas'), {
  //       zoom: 14,
  //       center: pos
  //     });
  //
  //     infoWindow.open(map);
  //     map.setCenter(pos);
  //
  //     // set click listenr on map
  //     google.maps.event.addListener(map, 'click', function(event) {
  //       // addMarker({coords: event.latLng});
  //       var latitude = event.latLng.lat();
  //       var longitude = event.latLng.lng();
  //       // latInput.value = latitude;
  //       // lngInput.value = longitude;
  //       let latLngStr = `${latitude},${longitude}`;
  //       console.log(latLngStr);
  //       console.log();
  //       let address = geocodeLatLng(geocoder, map, infoWindow, latLngStr);
  //       console.log(address);
  //
  //     })
  //   }, function() {
  //     handleLocationError(true, infoWindow, map.getCenter());
  //   });
  // } else {
  //   // Browser doesn't support Geolocation
  //   handleLocationError(false, infoWindow, map.getCenter());
  // }

  // convert latLng to address
  // function geocodeLatLng(geocoder, map, infoWindow, latLngStr) {
  //   var latLngArr = latLngStr.split(',', 2);
  //   var latlng = {
  //     lat: parseFloat(latLngArr[0]),
  //     lng: parseFloat(latLngArr[1])
  //   };
  //   return geocoder.geocode({
  //     'location': latlng
  //   }, function(results, status) {
  //     if (status === 'OK') {
  //       if (results[0]) {
  //         infoWindow.setContent(results[0].formatted_address);
  //         // console.log(results[0].formatted_address);
  //         return results[0].formatted_address;
  //       } else {
  //         window.alert('No results found');
  //       }
  //     } else {
  //       window.alert('Geocoder failed due to: ' + status);
  //     }
  //   });
  // }

  // set marker to current position
  // function addMarker(props) {
  //   let marker = new google.maps.Marker({
  //     position: props.coords,
  //     map: map,
  //     content: props.content
  //   })
  //   if (props.content) {
  //     infoWindow = new google.maps.InfoWindow({
  //       content: props.content
  //     });
  //
  //     marker.addListener('click', function() {
  //       infoWindow.open(map, marker);
  //     });
  //   }
  // }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

  function autoCompleteSearch() {
    let ac = new google.maps.places.Autocomplete(
      (document.getElementById('location_address')), {
        types: ['geocode']
      });

    ac.addListener('place_changed', function(event) {
      let place = ac.getPlace();
      let latLng = `${place.geometry.location.lat()}, ${place.geometry.location.lng()}`
      document.getElementById('latLng').value = latLng;
      console.log(latLng);
    });
  }
  autoCompleteSearch();

  function calcDistanceToKM(p1, p2) {
    return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
  }

  var checkLocationBtns = document.getElementsByClassName("checkLocationBtn");
  var loadingBtns = document.getElementsByClassName("loadingBtns");
  for (let i = 0; i < checkLocationBtns.length; i++) {

    checkLocationBtns[i].addEventListener('click', function(e) {
      loadingBtns[i].className += " ld ld-ring ld-spin-fast";
      let response = e.currentTarget.value.split(',')

      let targetLat = Number(response[0]);
      let targetLng = Number(response[1]);
      let checkInTime = response[2];
      let checkinId = Number(response[3]);

      // CHECK IF BEFORE SET ARRIVAL TIME
      let isInTime;
      let currentDate = moment().format('L');
      let currentTime = moment().format('hh:mm a');
      let due_date = checkInTime.substring(0, 10);
      let due_time = checkInTime.substring(11, e.currentTarget.value.length)
      currentTime = currentTime.replace(/ /g, '').toLowerCase();
      due_time = due_time.replace(/ /g, '').toLowerCase();

      var beginningTime = moment(currentTime, 'h:mma');
      var endTime = moment(due_time, 'h:mma');

      let beforeDueDate = moment(currentDate).isBefore(due_date);
      let sameDueDate = moment(currentDate).isSame(due_date);
      let beforeDueTime = beginningTime.isBefore(endTime);
      if (beforeDueDate === true) {
        isInTime = true;
      } else if (sameDueDate === true && beforeDueTime === true) {
        isInTime = true;
      } else {
        isInTime = false;
      }
      console.log(currentDate, currentTime);

      // CHECK IF NEAR LOCATION
      let rangePromise = new Promise(function(resolve, reject) {
        function calcDistanceToMiles(p1, p2) {
          return (0.621371 * (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000)).toFixed(2);
        }
        let isInRange;
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            let curCoords = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            var p1 = new google.maps.LatLng(curCoords.lat, curCoords.lng);
            var p2 = new google.maps.LatLng(targetLat, targetLng);

            if (calcDistanceToMiles(p1, p2) <= 0.5) {
              isInRange = true;
              alert(`${calcDistanceToMiles(p1, p2)} miles away. Currently in range!`);
              resolve(isInRange);
            } else {
              isInRange = false;
              alert(`${calcDistanceToMiles(p1, p2)} miles away. Currently out of range!`);
              resolve(isInRange);
            }
          },);
        }
      });

      rangePromise
        .then((isInRange) => {
          console.log('isInTime: ', isInTime);
          console.log('isInRange: ', isInRange);
          axios.post(`/user/updateCheckin/${checkinId}`, {
              isInTime: isInTime,
              isInRange: isInRange
            })
            .then(function(response) {
              if(isInTime === true && isInRange === true){
                loadingBtns[i].className = " glyphicon glyphicon-ok";
              }else if(isInTime === false){
                loadingBtns[i].className = " glyphicon glyphicon-remove";
              }
              setTimeout(function(){
                window.location.href = '/';
              }, 1000);
            })
            .catch(function(error) {
              console.log(error);
            });
        })
    })
  }

};

    <script type="text/javascript">
    function initialize() {
		var geocoder = new google.maps.Geocoder();
		var address = "500 College Avenue, Swarthmore PA, Pennsylvania 19081";
		geocoder.geocode({'address': address},function(results,status){
			if (status == google.maps.GeocoderStatus.OK) {
				// console.log(results);
				var myLatlng = new google.maps.LatLng(results[0].geometry.location);
				// console.log(myLatlng);
				var mapOptions = {
					zoom: 14,
					center: myLatlng
				};
				var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location,
				});
			} else {
				alert("Geocode was not successful for the following reason: " + status);
			}
		});
	}
	google.maps.event.addDomListener(window, 'load', initialize);
	</script>
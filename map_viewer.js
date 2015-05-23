var infowindow;
var map;

function renderMap(data) {
  var mapOptions = {
      zoom: 15,
      center: new google.maps.LatLng(21.315603, -157.858093)
  };
  map = new GMap2(document.getElementById('map_parking'), mapOptions);
  jQuery.each(data, function( key, val ) {
      for (index = 0; index < data._items.length; ++index) {
          var d = data._items[index];
          if (d.location) {
              (function() {
                  var contentString = '<div><strong>' + d.description + '</strong> - ' + d.operator + '</div>';
                  if (d.hourly) {
                      contentString += '<div><strong>Hourly:</strong> ' + d.hourly + '</div>';
                  }
                  if (d.early_bird) {
                      contentString += '<div><strong>Early Bird:</strong> ' + d.early_bird + '</div>';
                  }
                  if (d.weekend_rate) {
                      contentString += '<div><strong>Weekend Rate:</strong> ' + d.weekend_rate + '</div>';
                  }
                  if (d.phone) {
                      contentString += '<a href="tel:808-' + d.phone + '">808-' + d.phone + '</a></div>';
                  }

                  var latlng = new google.maps.LatLng(d.location.coordinates[1], d.location.coordinates[0]);
                  var marker = new google.maps.Marker({
                      position: latlng,
                      map: map,
                      title: data.description
                  });
                  google.maps.event.addListener(marker, 'click', function() {
                      if (infowindow) infowindow.close();
                      infowindow = new google.maps.InfoWindow({content: contentString});
                      infowindow.open(map, marker);
                  });
              })();
          }
      }
  });
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.method == 'render') {
    jQuery('#map_parking').append("<h1>YO</h1>");
    renderMap(request.data);
  }
});


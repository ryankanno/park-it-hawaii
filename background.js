var URL = 'http://localhost:5000/parkings';

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.address)
  {
    var url_google = 'http://maps.googleapis.com/maps/api/geocode/json?address='+String(encodeURIComponent(msg.address))+'&sensor=false';
    jQuery.getJSON(url_google, function( data ) {
      if (data.results && data.results[0] && data.results[0].geometry.location)
      {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
          chrome.tabs.sendMessage(tabs[0].id, { latitude: lat, longitude: lng}, function(response) { });
        });
      }
    });
  }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, { url: tabs[0].url }, function(response) { });
    });
  }
});

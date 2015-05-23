var CURRENT_SITE = "";
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.url && msg.url.lastIndexOf("http://www.eventbrite.com/e/", 0) === 0)
  {
    var address = jQuery("h2.location").text();
    if (address)
    {
      CURRENT_SITE = "eventbrite";
      chrome.runtime.sendMessage({address: address});
    }
  }
  else if (msg.url && msg.url.lastIndexOf("http://www.frolichawaii.com/event/", 0) === 0)
  {
    var address = jQuery("td.event-desc").text();
    if (address)
    {
      CURRENT_SITE = "frolic";
      chrome.runtime.sendMessage({address: address});
    }
  }
  else if (msg.latitude && msg.longitude)
  {
    var UNIQUE_MAP_VIEWER_ID = 'crx_myextension_iframe';
    var latitude = -1;
    var longitude = -1;

    var mapViewerDOM = document.getElementById(UNIQUE_MAP_VIEWER_ID);

    if (mapViewerDOM) {
       mapViewerDOM.parentNode.removeChild(mapViewerDOM);
    }

    mapViewerDOM = document.createElement('iframe');
    mapViewerDOM.setAttribute('id', UNIQUE_MAP_VIEWER_ID);
    mapViewerDOM.setAttribute('src', 'http://localhost:5000/nearby/' + msg.latitude + '/' + msg.longitude);
    mapViewerDOM.setAttribute('frameBorder', '0');
    mapViewerDOM.setAttribute('width', '99.90%');
    mapViewerDOM.setAttribute('height', '500px');
    mapViewerDOM.setAttribute('style', 'overflow: hidden; z-index: 99999');
    if (CURRENT_SITE == "eventbrite")
    {
      var html = '<div class="panel_280"><div class="panel_head2"><h3>Know where to park?</h3></div><div class="panel_body" id="panel_when">' + mapViewerDOM.outerHTML + '</div></div>';
      jQuery("#hostedByDiv").prepend(html);
    }
    else if (CURRENT_SITE == "frolic")
    {
      var html = '<div style="margin-bottom:10px;clear:both;"><h3>Know where to park?</h3>' + mapViewerDOM.outerHTML + '<br/></div>';
      jQuery(".hupso-share-buttons").prepend(html);
    }
  }
});

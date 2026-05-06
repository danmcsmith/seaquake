var map = L.map('map', {
  center: [47.5, -121],
  zoom: 7,
  zoomControl: true
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>',
  maxZoom: 18
}).addTo(map);

function magColor(mag) {
  if (mag < 1.0) return '#4dabf7';
  if (mag < 2.0) return '#69db7c';
  if (mag < 3.0) return '#ffd43b';
  if (mag < 4.0) return '#ff922b';
  return '#ff4444';
}

function magRadius(mag) {
  var m = mag || 0;
  return Math.max(4, m * 5);
}

function formatTime(ms) {
  var d = new Date(ms);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
    ' ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

fetch('/json')
  .then(function(r) { return r.json(); })
  .then(function(data) {
    document.getElementById('loading').style.display = 'none';

    var features = data.features || [];
    var count = features.length;
    var maxMag = 0;
    var maxQuake = null;

    features.forEach(function(f) {
      var p = f.properties;
      var coords = f.geometry.coordinates;
      var lng = coords[0], lat = coords[1], depth = coords[2];
      var mag = p.mag || 0;

      if (mag > maxMag) { maxMag = mag; maxQuake = f; }

      var circle = L.circleMarker([lat, lng], {
        radius: magRadius(mag),
        fillColor: magColor(mag),
        color: 'rgba(255,255,255,0.15)',
        weight: 1,
        fillOpacity: 0.8
      });

      var depthStr = depth != null ? Math.abs(depth).toFixed(1) + ' km' : 'unknown';
      var typeStr = p.type ? p.type.charAt(0).toUpperCase() + p.type.slice(1) : 'Unknown';

      circle.bindPopup(
        '<div class="popup-mag" style="color:' + magColor(mag) + '">M ' + (mag ? mag.toFixed(1) : '?') + '</div>' +
        '<div class="popup-place">' + (p.place || 'Unknown location') + '</div>' +
        '<div class="popup-detail">Type: <span>' + typeStr + '</span></div>' +
        '<div class="popup-detail">Depth: <span>' + depthStr + '</span></div>' +
        '<div class="popup-detail">Time: <span>' + formatTime(p.time) + '</span></div>' +
        '<a class="popup-link" href="' + p.url + '" target="_blank">View on USGS ↗</a>',
        { maxWidth: 240 }
      );

      circle.addTo(map);
    });

    var statsEl = document.getElementById('stats');
    statsEl.innerHTML =
      '<div>Earthquakes (last 7 days): <strong>' + count + '</strong></div>' +
      (maxQuake ? '<div>Largest: <strong>M ' + maxMag.toFixed(1) + '</strong> — ' + maxQuake.properties.place + '</div>' : '');

    // Legend
    var legend = L.control({ position: 'bottomright' });
    legend.onAdd = function() {
      var div = L.DomUtil.create('div', 'legend');
      div.innerHTML = '<h4>Magnitude</h4>';
      var tiers = [
        { label: '< 1.0', color: '#4dabf7', size: 8 },
        { label: '1.0 – 2.0', color: '#69db7c', size: 10 },
        { label: '2.0 – 3.0', color: '#ffd43b', size: 14 },
        { label: '3.0 – 4.0', color: '#ff922b', size: 18 },
        { label: '4.0+', color: '#ff4444', size: 22 }
      ];
      tiers.forEach(function(t) {
        div.innerHTML +=
          '<div class="legend-row">' +
          '<div class="legend-dot" style="width:' + t.size + 'px;height:' + t.size + 'px;background:' + t.color + '"></div>' +
          t.label + '</div>';
      });
      return div;
    };
    legend.addTo(map);
  })
  .catch(function(err) {
    document.getElementById('loading').textContent = 'Failed to load earthquake data.';
    console.error(err);
  });

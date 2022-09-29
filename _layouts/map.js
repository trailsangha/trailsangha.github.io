---
layout: map
---
{{ content }}
document.addEventListener('DOMContentLoaded', function() {

  // Map parameters
  var latlon  = [{{ page.map.lat }}, {{ page.map.lon }}];
  var zoom    = {{ page.map.zoom }};
  var radius  = {{ page.map.radius }};
  var maxZoom = {{ page.map.max_zoom }};

  // Target HTML ID
  var target_id = "{{ page.target_id }}"

  // Setup Leaflet
  var map = L.map(target_id).setView(latlon, 15);

  var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: maxZoom,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  // Marker
  var marker = L.marker(latlon).addTo(map);

  // Circle around marker
  var circle = L.circle(latlon, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.4,
    radius: {{ page.map.radius }}
  }).addTo(map);

  // Activate Leaflet.fullscreen plugin:
  map.addControl(new L.Control.Fullscreen(false));

  // Require focus for zooming
  map.scrollWheelZoom.disable()
  map.on('focus', () => { map.scrollWheelZoom.enable()  })
  map.on('blur',  () => { map.scrollWheelZoom.disable() })

});


var map = L.map('map', {
	crs: L.CRS.Simple
});

map.on('click', onMapClick);

var bounds = [[0, 0], [1000, 1000]];
var map_image = L.imageOverlay('images/illia_map.png', bounds).addTo(map);
map.fitBounds(bounds);

var saymar = L.marker(xy([238.5, 118]));
saymar.bindPopup("Saymar, Capital of Iteia");
saymar.bindLabel('Saymar');
saymar.addTo(map);
// map.setView([70, 120], 1);


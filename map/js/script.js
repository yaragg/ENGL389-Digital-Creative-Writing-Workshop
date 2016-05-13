$.ajax({
	url: "../js/reader.php",
	dataType: "jsonp",
	type: 'GET',
	success: loadMarkers
});

var locations, profiles;

var map = L.map('map', {
	crs: L.CRS.Simple,
	zoomControl: false
});

L.control.zoom({ position: 'topright'}).addTo(map);

map.on('click', onMapClick);

var bounds = [[0, 0], [1000, 1000]];
var map_image = L.imageOverlay('images/illia_map.png', bounds).addTo(map);
map.fitBounds(bounds);

// var saymar = L.marker(xy([238.5, 118]));
// saymar.bindPopup("Saymar, Capital of Iteia");
// saymar.bindLabel('Saymar');
// saymar.addTo(map);

var sidebar = L.control.sidebar('sidebar').addTo(map);

$("#sidebar .sidebar-close").on('click', closeSidebar);

function closeSidebar(){
	sidebar.close();
	document.querySelector("#sidebar").style.display = "none";
}

function openSidebar(){
	sidebar.open();
	document.querySelector("#sidebar").style.display = "block";
	$("#story").addClass("active");
}

function addMarker(obj){
	var marker = L.marker(xy(obj.x, obj.y));
	marker.bindLabel(obj.title);
	marker.addTo(map);
	marker.on('click', function(e){markerClick(obj);});
}

function markerClick(obj){
	updateSidebar(obj);
	openSidebar();
}

function updateSidebar(obj){
	console.log(obj.title);
	$("#story").find(".title").html(obj.title);
	$("#location").find(".title").html(obj.location);
	$("#profile").find(".title").html(obj.profile);

	$("#story").children(".pane-content").html(obj.content);
	$("#location").children(".pane-content").html(locations[obj.location]?locations[obj.location] : "Add this entry to the locations folder.");
	$("#profile").children(".pane-content").html(profiles[obj.profile]?profiles[obj.profile]:"Add this entry to the profiles folder.");
}

function loadMarkers(res){
	console.log(res);
	var entries = res.entries;
	for(var i=0; i<entries.length; i++){
		addMarker(entries[i]);
	}
	locations = [];
	for(var i=0; i<res.locations.length; i++){
		locations[res.locations[i].title] = res.locations[i].content;
	}

	profiles = [];
	for(var i=0; i<res.profiles.length; i++){
		profiles[res.profiles[i].title] = res.profiles[i].content;
	}
}
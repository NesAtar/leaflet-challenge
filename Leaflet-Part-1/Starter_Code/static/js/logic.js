
//Assign different colors
function getColor(d) {    
    return d > 90 ? '#98EE00' :           
        d > 70  ? '#D4EE00' :           
        d > 50  ? '#EECC00' :           
        d > 30  ? '#EE9C00' :           
        d > 10   ? '#EA822C' :                            
                   '#EA2C2C'; }

// Create a Leaflet map object 
var map = L.map('map').setView([0,0],2);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {    maxZoom: 19,   
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);

// =========================================================

// Fetch data and create circle markers
fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson')
.then(response => response.json())
.then(data => {
    data.features.forEach(feature => {
        var coordinates = feature.geometry.coordinates;
        // var magnatude = feature.properties.mag;
        var place = feature.properties.place;

        L.circleMarker([coordinates[1],coordinates[0]],{
            // radius: Math.pow(magnatude +1, 1.5),
            radius: size (feature.properties.mag),
            color: getColor(coordinates[2]),
            fillOpacity: 0.5
        }).bindPopup(`location: <b>${place}</b><br/> magnatude ${feature.properties.mag}`).addTo(map);
    });
});
function size (magnatude){
    if (magnatude == 0) {
        return 1;
    }   return Math.pow(magnatude,2) 
}
// =========================================================

// Define legend control
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 30, 50, 70, 90],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
   
    let colors = ["#98EE00",
                    "#D4EE00",
                    "#EECC00",
                    "#EE9C00",
                    "#EA822C",
                    "#EA2C2C"];
   
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors [i] + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};

legend.addTo(map);


// This map plots all the earthquakes that are magnitude 4.5+ within the last 30 days.
// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson

//the circles on the map are different sizes but since the earthquake sizes are very close to each 
// other so are the circles' size. some of the circles are obvious that its smaller/larger and some 
// looks like same size.

// Circles on the map reflect the magnitude of the earthquake by their size and the depth of the 
// earthquake by color.  Earthquakes with higher magnitudes appear larger, and earthquakes with 
// greater depth appear darker in color


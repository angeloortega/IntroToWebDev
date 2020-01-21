
function getAllUrlParams(url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  
    // we'll store the parameters here
    var obj = {};
  
    // if query string exists
    if (queryString) {
  
      // stuff after # is not part of query string, so get rid of it
      queryString = queryString.split('#')[0];
  
      // split our query string into its component parts
      var arr = queryString.split('&');
  
      for (var i = 0; i < arr.length; i++) {
        // separate the keys and the values
        var a = arr[i].split('=');
  
        // set parameter name and value (use 'true' if empty)
        var paramName = a[0];
        var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
  
        // (optional) keep case consistent
        paramName = paramName.toLowerCase();
        if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
  
        // if the paramName ends with square brackets, e.g. colors[] or colors[2]
        if (paramName.match(/\[(\d+)?\]$/)) {
  
          // create key if it doesn't exist
          var key = paramName.replace(/\[(\d+)?\]/, '');
          if (!obj[key]) obj[key] = [];
  
          // if it's an indexed array e.g. colors[2]
          if (paramName.match(/\[\d+\]$/)) {
            // get the index value and add the entry at the appropriate position
            var index = /\[(\d+)\]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            // otherwise add the value to the end of the array
            obj[key].push(paramValue);
          }
        } else {
          // we're dealing with a string
          if (!obj[paramName]) {
            // if it doesn't exist, create property
            obj[paramName] = paramValue;
          } else if (obj[paramName] && typeof obj[paramName] === 'string'){
            // if property does exist and it's a string, convert it to an array
            obj[paramName] = [obj[paramName]];
            obj[paramName].push(paramValue);
          } else {
            // otherwise add the property
            obj[paramName].push(paramValue);
          }
        }
      }
    }
  
    return obj;
  }

function pointToGeoJSON(point){
    return {
        "type": "Feature",
        "geometry": {
        "type": "Point",
        "coordinates": [point.longitud, point.latitud]
        },
        "properties": {
        "name": point.nombre,
        "popupContent":point.descripcion,
        "type":point.tipo
        }
    }
}
async function getPoints(){
    let result = {}
    let query = getAllUrlParams(window.location.href);
    $("#mapName").text(decodeURIComponent(query["name"]))
    await fetch('http://localhost:3001/rutas?id='+ query['id'], {
        method: 'GET',
      }).then(res => {
        return res.json()
      })
        .then(resp => {
          if (typeof resp.puntos !== 'undefined') {
            result = resp.puntos;
          }
        });

    // insert data
    var jsonobj={"type":"featureCollection",
                "features":[]}
    result.forEach(function (item) {
        jsonobj.features.push(pointToGeoJSON(item));
    });
    console.log(jsonobj);
    var mymap = L.map('map').setView([9.7889,-84.2308], 10);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);
    
    
    function onEachFeature(feature, layer) {
        var popupContent = feature.properties.name +" "+ feature.properties.popupContent;
        layer.bindPopup(popupContent);
    }
    /*routing*/
   L.geoJSON([jsonobj], {

       style: function(feature) {
            switch (feature.properties.type) {
                case 'INI': return {fillColor: "#c0392b", color: "#c0392b"};
                case 'MED':   return {fillColor: "#27ae60", color: "#27ae60"};
                case 'FIN': return{fillColor: "#2980b9" ,color:"#2980b9" }
            }
        },

        onEachFeature: onEachFeature,

        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: 12,
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        }
    }).addTo(mymap);

    var mapWayPoints = [];
    for (index = 0; index < jsonobj.features.length; index++) {
        mapWayPoints = mapWayPoints.concat(L.latLng(jsonobj.features[index].geometry.coordinates[1],jsonobj.features[index].geometry.coordinates[0]))
    } 

    L.Routing.control({
    waypoints: mapWayPoints
    }).addTo(mymap);


}

getPoints();

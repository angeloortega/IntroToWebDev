function main(){
    var mymap = L.map('map').setView([9.7889,-84.2308], 10);
    var jsonobj={
        "type": "FeatureCollection",
        "features": [
        {
            "type": "Feature",
            "geometry": {
            "type": "Point",
            "coordinates": [-83.941705, 9.897567]
            },
            "properties": {
            "name": "RECOPE"
            }
        },
        {
            "type": "Feature",
            "geometry": {
            "type": "Point",
            "coordinates": [-84.017496, 9.910952]
            },
            "properties": {
            "name": "Momentum Pinares"
            }
        },
        {
            "type": "Feature",
            "geometry": {
            "type": "Point",
            "coordinates": [-84.041318, 9.928919]
            },
            "properties": {
            "name": "Plaza del Sol"
            }
        },
        {
            "type": "Feature",
            "geometry": {
            "type": "Point",
            "coordinates": [-84.057815, 9.93841]
            },
            "properties": {
            "name": "Condominio Benicarlo"
            }
        },
        {
            "type": "Feature",
            "geometry": {
            "type": "Point",
            "coordinates": [-84.625324, 9.611733]
            },
            "properties": {
            "name": "Jaco Walk"
            }
        },
        {
            "type": "Feature",
            "geometry": {
            "type": "Point",
            "coordinates": [-84.626656, 9.613131]
            },
            "properties": {
            "name": "Mas x Menos"
            }
        },
        {
            "type": "Feature",
            "geometry": {
            "type": "Point",
            "coordinates": [-84.617113, 9.599976]
            },
            "properties": {
            "name": "Gasolinera Delta"
            }
        },
        {
            "type": "Feature",
            "geometry": {
            "type": "Point",
            "coordinates": [-84.271308, 9.477501]
            },
            "properties": {
            "name": "Playa Palo Seco"
            }
        },
        {
            "type": "Feature",
            "geometry": {
            "type": "Point",
            "coordinates": [-84.228005, 9.617678]
            },
            "properties": {
            "name": "Villa Casa Altamar"
            }
        }
        ]
    }

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    /*Cluster*/
    var map2 = L.map('map2').setView([9.7889,-84.2308], 10);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map2);
    


    
    function onEachFeature(feature, layer) {
        var popupContent = ""
        if (feature.properties && feature.properties.popupContent) {
            popupContent = feature.properties.popupContent;
        }

        layer.bindPopup(popupContent);
    }

    /*routing*/
   L.geoJSON([jsonobj], {

        style: function (feature) {
            return feature.properties && feature.properties.style;
        },

        onEachFeature: onEachFeature,

        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: 8,
                fillColor: "#ff7800",
                color: "#000",
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

    
    var markersRecoger = L.markerClusterGroup({
        iconCreateFunction: function (cluster) {
            var childCount = cluster.getChildCount();
            var c = ' marker-cluster-recoger';
            return new L.DivIcon({ html: '<div><span> <img src="../../../PortafolioWEBVerano2019/Resources/images/bus.png"></span></div>', 
             className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) });
            }
    });
    var markersJaco = L.markerClusterGroup({
        iconCreateFunction: function (cluster) {
            var childCount = cluster.getChildCount();
            var c = ' marker-cluster-Jaco';
            return new L.DivIcon({ html: '<div><span> <img src="../../../PortafolioWEBVerano2019/Resources/images/shop.png"></span></div>', 
             className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) });
            }
    });
    var markersPlaya = L.markerClusterGroup({
        iconCreateFunction: function (cluster) {
            var childCount = cluster.getChildCount();
            var c = ' marker-cluster-playa';
            return new L.DivIcon({ html: '<div><span> <img src="../../../PortafolioWEBVerano2019/Resources/images/palm.png"></span></div>', 
             className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) });
            }
    });

    for (var i = 0; i < 3; i++) {
        var marker = L.marker(new L.LatLng(jsonobj.features[i].geometry.coordinates[1],jsonobj.features[i].geometry.coordinates[0]));
        markersRecoger.addLayer(marker);
    }
    for (i = 4; i < 7; i++) {
        var marker = L.marker(new L.LatLng(jsonobj.features[i].geometry.coordinates[1],jsonobj.features[i].geometry.coordinates[0]));
        markersJaco.addLayer(marker);
    }

    for (i = 7; i < jsonobj.features.length; i++) {
        var marker = L.marker(new L.LatLng(jsonobj.features[i].geometry.coordinates[1],jsonobj.features[i].geometry.coordinates[0]));
        markersPlaya.addLayer(marker);
    }

    map2.addLayer(markersRecoger);
    map2.addLayer(markersJaco);
    map2.addLayer(markersPlaya);


}
main();

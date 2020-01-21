try{let puntos = [];
var mymap = L.map('map').setView([9.9442, -84.0885], 14);

var layerGroup = L.layerGroup().addTo(mymap);
var control = L.Routing.control({
    waypoints: [null]
}).addTo(mymap);

L.Routing.errorControl(control).addTo(mymap);

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

function desplegarMapa() {
    var jsonobj = {
        "type": "featureCollection",
        "features": []
    }
    if(puntos.length> 0){
        layerGroup.clearLayers();
        puntos[0].tipo = 'INI';

        for(let i = 1; puntos.length - 1 > i; i++){
            puntos[i].tipo ='MED' 
        }

        if (puntos.length > 1){
            puntos[puntos.length - 1].tipo ='FIN' 
        }
    
    puntos.forEach(function (item) {
        jsonobj.features.push(pointToGeoJSON(item));
    });
    function onEachFeature(feature, layer) {
        var popupContent = feature.properties.name + " " + feature.properties.popupContent;
        layer.bindPopup(popupContent);
    }
    
    L.geoJSON([jsonobj], {

        style: function (feature) {
            switch (feature.properties.type) {
                case 'INI': return { fillColor: "#c0392b", color: "#c0392b" };
                case 'MED': return { fillColor: "#27ae60", color: "#27ae60" };
                case 'FIN': return { fillColor: "#2980b9", color: "#2980b9" }
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
    }).addTo(layerGroup);

    var mapWayPoints = [];
    for (index = 0; index < jsonobj.features.length; index++) {
        mapWayPoints = mapWayPoints.concat(L.latLng(jsonobj.features[index].geometry.coordinates[1], jsonobj.features[index].geometry.coordinates[0]))
    }

    control.setWaypoints(mapWayPoints);
}
}

async function main() {

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    mymap.on('click', function (e) {
        var coords = e.latlng;
        let content =
            '<form role="form" id="formPoint" enctype="multipart/form-data" class = "form-horizontal">' +
            '<input id="nombrePunto" type="text" class="form-control add-point" placeholder="Nombre">' +
            '<input id="descripcionPunto" type="text" class="form-control add-point" placeholder="Descripción">' +
            '<button id="AgregarPunto" class="btn btn-success">Agregar Punto</button>' +
            '<input style="display: none;" type="text" id="lat" name="lat" value="' + coords.lat + '" />' +
            '<input style="display: none;" type="text" id="lng" name="lng" value="' + coords.lng + '" />' +
            '</form>';

            L.popup({maxHeight: 1000})
            .setContent(content)
            .setLatLng(e.latlng)
            .openOn(mymap);
        $("#formPoint").submit(function (e) {
            e.preventDefault();
            let nombre = $('#nombrePunto').val()
            let desc = $('#descripcionPunto').val()
            if(nombre.length > 0 && desc.length > 0){
                $("#sortable").append(`<li class="ui-state-default"><label>Nombre: ${$('#nombrePunto').val()}, Descripción: ${$('#descripcionPunto').val()}</label></li>`);
                puntos.push({tipo:'MED', descripcion:$('#descripcionPunto').val(), nombre:$('#nombrePunto').val(),latitud:$('#lat').val(),longitud:$('#lng').val()});
                mymap.closePopup();
                desplegarMapa();
            }
            else{
                $("#successMessage").text("");
                $("#errorMessage").text("Por favor dele un nombre y una descripción al punto.");
                window.scrollTo(0, 0);
                setTimeout(function(){ $("#errorMessage").text(""); }, 3000);

                mymap.closePopup();
            }
        });
    });
}
async function enviarRuta(nombre, descripcion){
    await fetch('http://localhost:3001/add', {
        method: 'POST',
        body: JSON.stringify({ruta: {nombre:nombre, descripcion:descripcion, points:puntos}}),
        headers: {
            'Content-Type': 'application/json'
          }
      }).then(res => {
        console.log(res);
        return res.json()
      })
        .then(resp => {
          console.log(resp);
          if (resp.result) {
           $("#successMessage").text("ruta añadida con exito");
           $("#errorMessage").text("");
           window.scrollTo(0, 0);
           setTimeout(function(){ $("#successMessage").text(""); }, 3000);
           window.location.href = "./index.html";
          }
          else{
            $("#successMessage").text("");
            $("#errorMessage").text("La ruta no se ha podido añadir, asegurese de que el nombre de la ruta sea único.");
            window.scrollTo(0, 0);
            setTimeout(function(){ $("#errorMessage").text(""); }, 3000);

        }
        });
}
$("#formRoute").submit(function (e) {
    e.preventDefault();
    var routeName = $("#nombreRuta").val();
    var descripcion = $("#descripcionRuta").val();
    if(puntos.length > 1 && routeName.length > 0 && descripcion.length > 0){
        enviarRuta(routeName, descripcion);
    }
    else{
        $("#successMessage").text("");
        $("#errorMessage").text("Por favor agregue por lo menos 2 puntos y asegurese de llenar la descripción de la ruta");
        window.scrollTo(0, 0);
        setTimeout(function(){ $("#errorMessage").text(""); }, 3000);

    }
});
main();
}
catch(e){
    $("#errorMessage").text("No ha sido posible encontrar una ruta en los puntos marcados.");
    $("#sortable").empty();
    puntos=[];
    desplegarMapa();
}

window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
    $("#errorMessage").text("No ha sido posible encontrar una ruta en los puntos marcados.");
    $("#sortable").empty();
    puntos=[];
    desplegarMapa();
}
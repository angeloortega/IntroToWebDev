$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();
});
function filter() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("mapTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      var nombre = tr[i].getElementsByTagName("td")[1];
      var descripcion = tr[i].getElementsByTagName("td")[2];
      if (nombre && descripcion) {
        nombre = nombre.textContent || nombre.innerText;
        descripcion = descripcion.textContent || descripcion.innerText;
        if (nombre.toUpperCase().indexOf(filter) > -1 || descripcion.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
async function pupulateMapTable(){
    let headers = new Headers();
    let result = {}
    await fetch('http://localhost:3001/rutas', {
        method: 'GET',
        headers:headers
      }).then(res => {
        return res.json()
      })
        .then(resp => {
          if (typeof resp.routes !== 'undefined') {
            result = resp.routes;
          }
        });
    var table = document.getElementById("mapTable");
    // helper function        

    function addCell(tr, text) {
        var td = tr.insertCell();
        td.textContent = text;
        return td;
    }

    function addViewButton(tr,id,routeName) {
        var linkCell = tr.insertCell();
        var elLink = document.createElement('a');
        var href= "./map.html?id="+id+"&name="+encodeURI(routeName);
        elLink.href = href;
        elLink.setAttribute("class", "view");
        elLink.setAttribute("title", "View");
        elLink.setAttribute("data-toggle", "tooltip");
        var eLi = document.createElement('i');
        eLi.setAttribute("class", "material-icons");
        eLi.innerHTML = "&#xE417;"
        elLink.appendChild(eLi);
        linkCell.appendChild(elLink);
    }


    // insert data
    result.forEach(function (item) {
        var row = table.insertRow();
        addCell(row, item.id);
        addCell(row, item.nombre);
        addCell(row, item.descripcion);
        addViewButton(row,item.id, item.nombre);

    });
}

pupulateMapTable();

let connection = require('./index');

const ALLROUTES = 'SELECT id, nombre, descripcion FROM ruta';
const GETROUTEPOINTS = 'SELECT p.id_ruta, p.nombre, p.descripcion, p.longitud, p.latitud, p.tipo FROM puntos p WHERE p.id_ruta = ?'
const ADDROUTE = 'INSERT into ruta(nombre, descripcion) values (?,?)'
const ADDPOINT = 'INSERT into puntos(descripcion, id_ruta, latitud, longitud, nombre, tipo) values (?,?,?,?,?,?)'
const FINDROUTENAME = "SELECT id, nombre, descripcion FROM ruta WHERE nombre LIKE ?"
const FINDROUTEDESCRIPTION = "SELECT id, nombre ,descripcion FROM ruta WHERE descripcion LIKE ?"


function getPoints(id) {
  return new Promise((resolve, reject) => {
    let params = [id];
    connection.connection.query(GETROUTEPOINTS, params, (err, result) => {
      if (err)
        return reject(err);
      else {
        let puntos = []
        for (var i = 0; i < result.length; i++) {
          let obj = result[i]
          puntos = puntos.concat({ nombre: obj.nombre,descripcion: obj.descripcion, id_ruta: obj.id_ruta, latitud: obj.latitud, longitud: obj.longitud, tipo: obj.tipo });
        }
        resolve({puntos: puntos});
      }

    });
  });
}
async function addPoint (point) {
  return new Promise((resolve, reject) => {
    console.log(point);
    // descripcion, id_ruta, latitud, longitud, nombre, tipo
    let params = [point.descripcion, point.id_ruta, point.latitud, point.longitud, point.nombre, point.tipo];
    connection.connection.query(ADDPOINT, params, async (err, results) => {
      return err ? reject(err) : resolve({ message: 'Point added succesfully' });
    });
  });
}

const all = () => { //Retorna todas las recetas
  return new Promise((resolve, reject) => {
    connection.connection.query(ALLROUTES, async (err, results) => {
      if (err)
        return reject(err);
      else {
        resolve({ routes: results });
      }
    });
  });
}

const search = (qparams) => {
  return new Promise((resolve, reject) => {
    let queryVal = FINDROUTENAME;
    if (qparams.queryType === 'description') {
      queryVal = FINDROUTEDESCRIPTION
    }
    connection.connection.query(queryVal, ["%"+qparams.searchValue+"%"], async (err, results) => {
      if (err)
        return reject(err);
      else {
        resolve({ routes: results });
      }
    });

  });

}

const addRoute = (route) => {
  return new Promise((resolve, reject) => {
    let params = [route.nombre, route.descripcion];
    connection.connection.query(ADDROUTE, params, async (err, results) =>{
            if(err)
                return reject(err);
            else{
                //find route id
                let ruta = await search({queryType: "name", searchValue: route.nombre});
                //Add every point
                for(let i = 0; i < route.points.length; i++){
                    let punto = route.points[i];
                    punto.id_ruta = ruta.routes[0].id;
                    await addPoint(punto);
                }
                resolve({result: true});
            }
            
        });
  });
}

module.exports.all = all;
module.exports.search = search;
module.exports.getPoints = getPoints;
module.exports.addPoint = addPoint;
module.exports.addRoute = addRoute;
module.exports.default = {
  all,
  search,
  getPoints,
  addPoint,
  addRoute
}

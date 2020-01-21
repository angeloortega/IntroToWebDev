const express = require('express');
const DB = require('./db');
const bodyParser = require('body-parser');
const router = express.Router();

var urlencodedParser = bodyParser.json({ extended: true });

router.post('/add', urlencodedParser, async (req, res) => {
    try{
        let result = true;
        ruta = req.body;
        console.log(ruta);
        let dbResult = await DB.default.mapas.addRoute(req.body.ruta);
        if(dbResult.errno)
            result = false;
        res.send({result:result});
    }
    catch(e){
        console.log(e);
        res.send({result:false, message:"Error al crear mapa, asegurese de que los puntos sean únicos."});
    }
});

router.get('/rutas', async (req, res)=> {
    try{
        let rutas = {}
        if(typeof req.query.id !== 'undefined' ){
            rutas = await DB.default.mapas.getPoints(req.query.id); //Recetas favoritas
        }
        else if(typeof req.query.search !== 'undefined'){
            rutas = await DB.default.mapas.search({searchValue: req.query.search, queryType: req.query.type}); //Busqueda de recetas
        }
        else{
            rutas =  await DB.default.mapas.all();
        }
        res.json(rutas);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;
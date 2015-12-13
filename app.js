//app.js

// SETUP
// ==========================================================================

// Llamada a los packetes
var express         = require("express"),
    app             = express(),                //Definir nuesta app usando Express
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
//    mongoose        = require('mongoose');
    PORT            = process.env.PORT || 8888; //setear puerto
    IP              = process.env.IP || 'localhost'; //setear ip
    
//Coneccion Base de Datos
//=========================================================================
/*mongoose.connect('mongodb://'+IP+'/snmps', function(err, res){
    if(err) throw err;
      console.log('conectado a la Base de Datos.');
});
*/


//Middlewares
//===========================================================================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Importacion de Modelo y Controlador
//===========================================================================
//var models    = require('./models/snmp')(app, mongoose);
var WifiCtrl  = require('./controllers/unifi');

//REGISTRO DE RUTAS
//======================================================================

//Ruta de Ejemplo
var router = express.Router();
router.get('/', function(req, res) {
  res.json("Bienvenidos a la API REST AP Service");
});
app.use(router);

//RUTAS DE LA API
var wifis = express.Router();

wifis.route('/wcl')
  .get(WifiCtrl.getAllAps)
  //.post(SnmpCtrl.restartAP);
  
wifis.route('/wcl/:mac')
  .get(WifiCtrl.findByMac)
  //.put(WifiCtrl.updateSnmp)
  //.delete(WifiCtrl.deleteSnmp);

wifis.route('/wcl/status/:mac')
  .post(WifiCtrl.restartAp);
  
//todas las rutas estaran con el prefijo /api
app.use('/api', wifis);
  
//INICIAR SEERVIDOR
//===========================================================================
app.listen(PORT, function() {
  console.log("Node server running on "+IP+":"+PORT);
})

const express=require('express');
const bodyParser=require('body-parser');
const path = require('path');
const api = require('./api');
var router = express.Router();

const port=3000;
const app=express();

app.listen(port, function() {
	console.log("Server is listening at port:" + port);
});

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({extended: true}));

// Parses the text as json
app.use(bodyParser.json());

app.use(express.static('public'));

router.get('/',function(req,res){
	res.sendFile(path.join(__dirname+'/views/index.html'));
	//__dirname : It will resolve to your project folder.
});

router.get('/listar',function(req,res){
	res.sendFile(path.join(__dirname+'/views/listar.html'));
	//__dirname : It will resolve to your project folder.
});

router.get('/ingresar',function(req,res){
	res.sendFile(path.join(__dirname+'/views/ingresar.html'));
	//__dirname : It will resolve to your project folder.
});

app.use('/', router)
app.use('/api', api)
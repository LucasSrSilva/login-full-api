const express = require('express');

const app = express();

const path = require("path");

const router = express.Router();


router.get('/', function(req, res){

    res.sendFile(path.join(__dirname+'/index.html'));
});

router.get('/registro', function(req, res){

    res.sendFile(path.join(__dirname+'/registro.html'));
});

app.use('/', router);

app.listen(process.env.port || 3000);

console.log('server on');

/*const http = require('http');
Criando rota para o servidor

const hostname = '127.0.0.1';
const port = '3000';

const server = http.createServer((req, res) => {
   res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end("Olá");
});

server.listen(port, hostname, () => {
    console.log("servidor rodando");
});*/
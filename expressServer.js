const express = require('express');
const bodyParser = require('body-parser');

const server =  express()
const listenPort = 8080;

const staticFilesPath = express.static(__dirname + '/Public');
server.use(staticFilesPath);

server.use(express.urlencoded({extended:false}));
server.use(express.json());


// -----------------API REST-------------------

const words = [ "Express", "Node", "React", "Mongo", "SQL"];


// ------------PETICIÓN DE LECTURA--------------

server.get('/words', (req, res) => {
    res.send(words)
})

// -----------PETICIÓN DE ESCRITURA-------------

server.post('/words', (req, res) => {
    words.push(req.body.neword)
    res.send()
})

server.listen(listenPort,
    () => console.log(`Server started listening on ${listenPort}`))

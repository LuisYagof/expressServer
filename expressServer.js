const express = require('express');
const bodyParser = require('body-parser');

const server =  express()
const listenPort = 8080;

const staticFilesPath = express.static(__dirname + '/Public');
server.use(staticFilesPath);

server.use(express.urlencoded({extended:false}));
server.use(express.json());

// ------------------FIREBASE--------------------

const admin = require("firebase-admin");
const serviceAccount = require("/Users/Luis-Dell/Documents/Estudios/Coding/BOOTCAMP/Semana7/express/express-init-firebase-adminsdk-6mdt1-1c7082f64a.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://express-init-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.database();
// const ref = db.ref("restricted_access/secret_document");
// ref.once("value", function(snapshot) {
//   console.log(snapshot.val());
// });

// ------------PETICIÓN DE LECTURA--------------


server.get('/words', (req, res) => {
    db.ref('words')
    .on('value', (response) => {
        res.send(response.val())
        // let data = response.val()
        // next = data.length
    })
})

// -----------PETICIÓN DE ESCRITURA-------------

server.post('/words', (req, res) => {
    db.ref('words/5')
        .set(req.body.neword)
    res.send()
})

server.listen(listenPort,
    () => console.log(`Server started listening on ${listenPort}`))

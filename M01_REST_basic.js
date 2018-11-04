/**
 * Aplicació en ExpressJS que crea una API REST senzilla
 */
const express = require('express');
const app=express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

var alumnes = [
    {codi:1, nom:'SERGI'},
    {codi:2, nom:'ANNA'},
    {codi:3, nom:'JOAN'}
];
app.get('/', (req, res)=>res.send('hola'));

app.get('/api/alumnes', (req, res)=>res.send(alumnes));
app.get('/api/alumnes/:codi', (req, res)=>{
    var alumne = alumnes.find(a =>a.codi===parseInt(req.params.codi));
    if (!alumne) res.status(404, 'error');
    res.send(alumne);
});


app.listen(3000, ()=>console.log('inici servidor'));
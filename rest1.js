/**
 * Aplicació en ExpressJE que crea una API REST senzilla
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
app.post('/api/alumnes', (req, res)=>{
    var alumne={codi: req.body.codi, nom: req.body.nom };
    alumnes.push(alumne);
    res.send(alumnes);
});
app.delete('/api/alumnes/:codi', (req, res)=>{
    var alumne = alumnes.find(a =>a.codi===parseInt(req.params.codi));
    var index =alumnes.indexOf(alumne);
    alumnes.splice(index, 1);
    res.send();
});
app.put('/api/alumnes/:codi', (req, res)=>{
    var nouAlumne={codi: req.body.codi, nom: req.body.nom };
    var alumne = alumnes.find(a =>a.codi===parseInt(req.params.codi));
    var index =alumnes.indexOf(alumne);
    alumnes[index]=nouAlumne;
});

app.listen(3000, ()=>console.log('inici servidor'));
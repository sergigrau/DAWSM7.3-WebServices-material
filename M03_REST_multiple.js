const express = require('express');
const app=express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var productes = [
    {cat:'ORD', nom:'ASUS', preu:1000},
    {cat:'ORD', nom:'MSI', preu:1200},
    {cat:'RAT', nom:'MS', preu:25},
    {cat:'RAT', nom:'LG', preu:45}
];

app.get('/api/productes', (req, res)=>res.send(productes));

app.get('/api/productes/:cat', (req, res)=>{
    var ps=[];
    var producte = productes.forEach(function(p){
        if (p.cat===req.params.cat) ps.push(p);
    });
    if (!producte) res.status(404, 'error');
    res.send(ps);
});

app.get('/api/productes/:cat/:nom', (req, res)=>{
    var producte = productes.find(a =>a.cat===req.params.cat && a.nom===req.params.nom);
    if (!producte) res.status(404, 'error');
    res.send(producte);
});

app.post('/api/productes', (req, res)=>{
    var producte={'cat': req.body.cat, 'nom': req.body.nom, 'preu':parseInt(req.body.preu)};
    productes.push(producte);
    res.send(producte);
});
app.delete('/api/productes/:cat', (req, res)=>{
    productes.forEach(function(p, index){
        if (p.cat===req.params.cat)   productes.splice(index, 1);
        index--;

    });   
    res.send(productes);
});
app.delete('/api/productes/:cat/:nom', (req, res)=>{
    var producte = productes.find(a =>a.cat===req.params.cat && a.nom===req.params.nom);
    var index =productes.indexOf(producte);
    productes.splice(index, 1);
    res.send(productes);
});
app.put('/api/productes/:cat/:nom', (req, res)=>{
    var nouProducte={cat: req.body.cat, 'nom': req.body.nom , 'preu': parseInt(req.body.preu)};
    var producte = productes.find(a =>a.cat===req.params.cat && a.nom===req.params.nom);
    var index =productes.indexOf(producte);
    productes[index]=nouProducte;
});

app.listen(3000, ()=>console.log('inici servidor'));
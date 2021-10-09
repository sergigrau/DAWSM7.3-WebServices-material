const express  = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

/*
Exemple CRUD amb Alumnes
sergi.grau@fje.edu
20.12.20 versio 1

query {
  obtenirAlumnes {
    codi
    nom
  }
}

query {
  obtenirAlumne(codi:"2") {
    codi
    nom
  }
}

mutation {
  esborrarAlumne(codi:"1")
  afegirAlumne(nom:"PERE") {
    codi
    nom
  }
}

mutation {
  modificarAlumne(codi:"3", nom:"sergi") {
    codi
    nom
  }
}
*/

const esquema = buildSchema(`
type Alumne {
  codi: ID!
  nom: String
}

type Query {
  obtenirAlumne(codi: ID!): Alumne
  obtenirAlumnes: [Alumne]
}

type Mutation {
  afegirAlumne(nom: String): Alumne
  modificarAlumne(codi: ID!, nom: String): Alumne
  esborrarAlumne(codi: ID!): Int
}
`);

// aquesta arrel té una funció per a cada endpoint de l'API

const alumnes = [
    { codi: '1', nom: 'SERGI' },
    { codi: '2', nom: 'ANNA' },
    { codi: '3', nom: 'JOAN' }
];

const arrel = {
    obtenirAlumnes() {
        return alumnes;
    },
    obtenirAlumne: ( {codi} ) => {
        let alumne = alumnes.find(a => a.codi == codi);
        if (!alumne) throw new Error('cap Alumne amb codi ' + codi);
        return alumne; 
    },
    afegirAlumne: ({ nom }) => {
        // crea un codi aleatori
        let codi = require('crypto').randomBytes(10).toString('hex');
        let alumne = new Alumne(codi, nom);
        alumnes.push(alumne);
        return alumne;
    },
    modificarAlumne: ({ codi, nom }) => {
        let alumne = alumnes.find(a => a.codi == codi);
        alumne.nom = nom;
        return alumne;
    },
    esborrarAlumne: ({codi})=>{
        let alumne = alumnes.find(a => a.codi === codi);
        let index = alumnes.indexOf(alumne);
        alumnes.splice(index, 1);
    }
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: esquema,
    rootValue: arrel,
    graphiql: true,
}));
app.listen(4000);
console.log('Executant servidor GraphQL API a http://localhost:4000/graphql');

//Classe que representa un Alumne
class Alumne {
    constructor(codi, nom) {
        this.codi = codi;
        this.nom = nom;
    }
}
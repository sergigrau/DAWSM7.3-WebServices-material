
/**
 * Back-end amb graphql, que mostra com crear tipus complexos,
 * query a realitzar
 * 
 * {
  obtenirDau(numCares: 6) {
    tirarUnCop
    tirarDiversosCops(numTirades: 3)
  }
  
 * 
 * @author sergi.grau@fje.edu
 * @version 1.0 13.12.20
 */


const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
 
// schema de GraphQL, ! vol dir que NO POT SER NULL
const esquema = buildSchema(`
type DauAleatori {
  numCares: Int!
  tirarUnCop: Int!
  tirarDiversosCops(numTirades: Int!): [Int]
}

type Query {
  obtenirDau(numCares: Int):DauAleatori
}
`);
 
// aquesta arrel té una funció per a cada endpoint de l'API
const arrel = {
  obtenirDau: ({numSides: numCares}) => {
    return new DauAleatori(numCares || 6);
  }
};
 
const app = express();
app.use(express.static('public'))
app.use('/graphql', graphqlHTTP({
  schema: esquema,
  rootValue: arrel,
  graphiql: true,
}));
app.listen(4000);
console.log('Executant servidor GraphQL API a http://localhost:4000/graphql');

//Classe ES6
class DauAleatori {
  constructor(numCares) {
    this.numCares = numCares;
  }
 
  tirarUnCop() {
    return 1 + Math.floor(Math.random() * this.numCares);
  }
 
  tirarDiversosCops({numTirades}) {
    var sortida = [];
    for (var i = 0; i < numTirades; i++) {
      sortida.push(this.tirarUnCop());
    }
    return sortida;
  }
}
 

/**
 * Back-end amb graphql, que mostra com es poden passar arguments,
 * fa servir fetch com a client
 * @author sergi.grau@fje.edu
 * @version 1.0 13.12.20
 */


const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
 
// schema de GraphQL, ! vol dir que NO POT SER NULL
const esquema = buildSchema(`
  type Query {
    tirarDau(numVegades: Int!, numCares: Int): [Int]
  }
`);
 
// aquesta arrel té una funció per a cada endpoint de l'API
const arrel = {
  tirarDau: ({numVegades, numCares}) => {
    var sortida = [];
    for (var i = 0; i < numVegades; i++) {
      sortida.push(1 + Math.floor(Math.random() * (numCares || 6)));
    }
    return sortida;
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
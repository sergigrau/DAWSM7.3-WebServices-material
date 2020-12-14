
/**
 * Back-end amb graphql, utilitza un client amb fetch
 * @author sergi.grau@fje.edu
 * @version 1.0 13.12.20
 */


const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
 
// schema de GraphQL
const esquema = buildSchema(`
  type Query {
    salutacions: String
  }
`);
 
// aquesta arrel té una funció per a cada endpoint de l'API
const arrel = {
    salutacions: () => {
    return 'Hola Món!';
  },
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
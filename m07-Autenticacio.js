
/**
 * Back-end amb graphql, que fa una autenticació amb Express.js
 * 
 * 
 * @autor sergi.grau@fje.edu
 * @version 1.0 18.12.20
 */


const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { esquema } = require('graphql');
 
const esquema = esquema(`
type Query {
  ip: String
}
`);
 

const loggingMiddleware = (req, res, next) => {
  console.log('ip:', req.ip);
  next();
}
var arrel = {
  ip: function (args, request) {
    return request.ip;
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

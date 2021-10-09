
/**
 * Back-end amb graphql, que fa us de tipus avançats
 * 

 * 
 * @autor sergi.grau@fje.edu
 * @version 1.0 18.12.20
 */


const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { esquema } = require('graphql');
 
var fakeDatabase = {
  'a': {
    id: 'a',
    npm: 'alice',
  },
  'b': {
    id: 'b',
    nom: 'bob',
  },
};
 
let tipusUsuari = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    nom: { type: graphql.GraphQLString },
  }
});
 

let tipusConsulta = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: tipusUsuari,
      // `args` describes the arguments that the `user` query accepts
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve: (_, {id}) => {
        return fakeDatabase[id];
      }
    }
  }
});
 
let schema = new graphql.GraphQLSchema({query: tipusConsulta});
 
const app = express();
app.use('/graphql', graphqlHTTP({
  schema: esquema,
  rootValue: arrel,
  graphiql: true,
}));
app.listen(4000);
console.log('Executant servidor GraphQL API a http://localhost:4000/graphql');

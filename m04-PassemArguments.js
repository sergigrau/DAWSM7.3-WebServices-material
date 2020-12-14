var tirades = 3;
var cares = 6;
var consulta = `query tirarDau($tirades: Int!, $cares: Int) {
  tirarDau(numVegades: $tirades, numCares: $cares)
}`;
 
fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query: consulta,
    variables: { tirades, cares },
  })
})
  .then(r => r.json())
  .then(dades => console.log('dades retornades:', dades));
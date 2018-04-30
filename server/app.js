const web3 = require('../eth/web3')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use( bodyParser.json() )
app.use( express.static('dist'))

// let title = {
//   title: "Distributed Blogging!",
//   }
//
// let sampleArticles = {
//   articles: [
//     {text: "This is a simple sample article"},
//     {text: "Article 2.  This just in.  My cat's breath smells like cat food."},
//     {text: "Article 3. Cashbet coin now worth a million dollars a token"},
//     {text: "FOOOOOOOOOOOO"}
//   ],
// }

app.post( '/article', (request, response) => {
  response.send(new Error('not implemented yet'))
})

app.get( '/article', (request, response) => {
  response.send(require('../eth/Dedium'))
})

app.listen( 3000, () => console.log("Listening on port 3000 "))
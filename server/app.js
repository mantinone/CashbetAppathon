const express = require('express')
const app = express()

let testData = {
  title: "Distributed Blogging!",
  array: [ 'Stuff', 'Things', 'A list', 'Hi Mom', "I'm using React"]
  }

app.use( express.static('dist'))

app.get('/', (request, response) => {
  response.send("Express time")
})

app.get( '/data', (request, response) => response.send( testData ))

app.listen( 3000, () => console.log("Listening on port 3000 "))
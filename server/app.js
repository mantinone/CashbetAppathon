const web3 = require('../eth/web3')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const IPFS = require('ipfs')
const { writeIPFS, readIPFS } = require('./controllers/ipfs')

const node = new IPFS({start: false})

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

app.post( '/api/article/write', writeIPFS.bind(this, IPFS) )
app.post( '/api/article/get', readIPFS.bind(this, IPFS) )

app.get( '/ipfs', (request, response) => {
  let fileMultihash

  node.on('ready', cb => {
    node.version((err, version) => {
      if(err) {
        console.error(err)
        response.sendStatus(500)
        return false
      }
      console.log(`Version: ${version.version}`)
      return true
    })
  })
})

app.listen( 3000, () => console.log("Listening on port 3000 "))
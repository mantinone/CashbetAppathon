const web3 = require('../eth/web3')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const IPFS = require('ipfs')

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

app.post( '/article', (request, response) => {
  const data = Buffer.from(JSON.stringify({
    title: request.body.title,
    article: request.body.article
  }), 'utf-8')

  node.start()
    .then(() => {
      node.files.add({
        path: Buffer.from(request.body.title).toString('base64'),
        content: data
      }, (err, filesAdded) => {
        if(err) throw err
        console.log(`\nAdded file: ${filesAdded[0].path, filesAdded[0].hash}`)
      })
    })
    .catch(err => {
      console.error(err)
      node.stop()
        .then((stopResult) => {
          response.status(500).send(stopResult)
          console.log(stopStatus)
        })
    })
  response.send(new Error('not implemented yet'))
})

app.get( '/article', (request, response) => {
  response.send(require('../eth/Dedium'))
})

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
    node.files.cat('QmUXTtySmd7LD4p6RG6rZW6RuUuPZXTtNMmRQ6DSQo3aMw', (err, data) => {
      if(err) {
        console.error(err)
        response.sendStatus(500)
        return false
      }
      console.log('\nFile:', data.toString('utf-8'))
      response.status(200).send(data)
    })
    
  })
})

app.listen( 3000, () => console.log("Listening on port 3000 "))
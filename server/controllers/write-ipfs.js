const dedium = require('../../eth/Dedium')

function writeIPFS(IPFS, request, response) {
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
        return filesAdded[0].hash
      })
    })
    .then(fileHash => {
      return node.stop().then(stopResult => ({fileHash, stopResult}))
    })
    .then(({fileHash, stopResult}) => {
      response.status(200).send({
        stopResult,
        dedium: {
          abi: dedium.abi,
          address: dedium.address,
          filehash: fileHash
        }
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
}

module.exports = {
  writeIPFS
}
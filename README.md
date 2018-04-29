# Installation

1. `npm i`
1. Install ganache-cli with aptitude or homebrew
1. `npm i -g truffle`
1. Install docker
1. Install IPFS

# Setup

1. `ganache-cli --secure --unlock "0x337b6..."`
1. `truffle compile && truffle migrate && truffle deploy`
1. `docker create`
1. `ipfs init && ipfs daemon`

If you've already run these, you'll be using `docker run [name]` where [name] is replaced with name of created docker container, you can find this by using `docker images`  
  
Will eventually upgrade to docker-compose to create container for all microservices. Eventually will be deployed to DigitalOcean at https://cloud.digitalocean.com/droplets/91344674/graphs?i=ff6648 at ubuntu-s-1vcpu-1gb-sfo2-01 at 159.89.128.7  
  
Ganache hosts the localhost simulation of blockchain, Truffle connects to it, docker wraps our entire app into containers so they can be microservices, DigitalOcean is a VPS (Virtual Private Server) that hosts our docker containers.  
  
web3 is the JS connection to our Solidity dApp which hosts our IPFS hashes on the blockchain. IPFS is our file storage.   
  
For the moment, truffle will now allow input from other folders. Also output using migrations is not functioning (see https://github.com/sc-forks/solidity-coverage/issues/184), because of this we have all the truffle folders sitting at root.  

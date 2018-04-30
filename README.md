# Installation

1. `npm i`
1. Install ganache GUI from http://truffleframework.com/ganache/
1. `npm i -g truffle`
1. Install docker
1. Install IPFS

# Setup

1. Run Ganachi GUI application
1. `truffle compile && truffle migrate --reset --network development`
1. Open `ethconfig.json` and set `address` to the address specefied from previous command.
1. Copy 12 word recovery phrase from ganache, paste into metamask login using recover account
1. `docker create`
1. `ipfs init && ipfs daemon`
1. Write down your IPFS hash, it looks something like  
`ipfs cat /ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/readme`

Note that everytime you close and open Ganache, you'll be creating a whole new blockchain. Your truffle migration for Dedium.sol will have a different address that you'll have to enter into ethconfig.json, and you'll need to login with a new metamask account.  
  
Metamask should be set to `Custom RPC` and the url from Ganache entered in, then click **Save**.  
  
If you've already run these, you'll be using `docker run [name]` where [name] is replaced with name of created docker container, you can find this by using `docker images`  
  
Will eventually upgrade to docker-compose to create container for all microservices. Eventually will be deployed to DigitalOcean at https://cloud.digitalocean.com/droplets/91344674/graphs?i=ff6648 at ubuntu-s-1vcpu-1gb-sfo2-01 at 159.89.128.7  
  
Ganache hosts the localhost simulation of blockchain, Truffle compiles the Solidity contract Dedium.sol to it, docker wraps our entire app into containers so they can be microservices, DigitalOcean is a VPS (Virtual Private Server) that hosts our docker containers.  
  
web3 is the JS connection to our Solidity dApp which hosts our IPFS hashes on the blockchain. IPFS is our file storage.   
  
For the moment, truffle will not allow input from other folders. Also output using migrations is not functioning (see https://github.com/sc-forks/solidity-coverage/issues/184), because of this we have all the truffle folders sitting at root.  
  
Truffle can access the solidity contract via `truffle console --network development` then `Dedium.deployed().then(i => {DediumInstance = i})` and can access with `DediumInstance.create` or `DediumInstance.getAddressByTitle`

# Common Problems and how to resolve them

* If `truffle migrate` responds with "network up to date" and doesn't give you an address then try running `truffle migrate --reset`

# Notes

If you init IPFS too many times or in the wrong directory, it might be beneficial to reset your IPFS:  
`ipfs pin ls --type recursive | cut -d' ' -f1 | xargs -n1 ipfs pin rm  `  
`ipfs repo gc  `  


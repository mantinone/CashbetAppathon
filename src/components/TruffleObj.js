import React from "react"
import ReactDOM from "react-dom"
import Web3 from 'web3'

export default class TextEntry extends React.Component {
  constructor( props ){
    super(props)
    if(typeof web3 !== 'undefined'){
      console.log("Using web3 detected from external source like Metamask")
      this.web3 = new Web3(web3.currentProvider)
    }
  }

  render() {
    return <div>
      <div id="root"></div>

    </div>
  }
}
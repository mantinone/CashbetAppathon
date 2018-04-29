import React from "react"
import ReactDOM from "react-dom"
import web3 from '../../eth/web3'

export default class Truffle extends React.Component {
  constructor( props ){
    super(props)
    console.log(web3)
  }

  render() {
    return <div>
      <div id="root"></div>

    </div>
  }
}
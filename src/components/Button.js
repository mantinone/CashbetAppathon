import React from "react"
import ReactDOM from "react-dom"

export default class Button extends React.Component {
  constructor( props ){
    super(props)
    this.state = {
      text: ''
    }
  }

  render() {
    return <div>
      <button onClick={this.props.onClick}>{this.props.name}</button>
    </div>
  }

}
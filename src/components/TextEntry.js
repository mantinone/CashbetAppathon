import React from "react"
import ReactDOM from "react-dom"

export default class TextEntry extends React.Component {
  constructor( props ){
    super(props)
    this.state = {
      text: ''
    }
  }

  render() {
    return <div>
      <textarea rows="30" cols="80"></textarea>
    </div>
  }

}
import React from "react"
import ReactDOM from "react-dom"

export default class TextEntry extends React.Component {
  constructor( props ){
    super(props)
  }

  render() {
    return <div>
      <div id="root"></div>
      <script src="build.js"></script>
    </div>
  }
}
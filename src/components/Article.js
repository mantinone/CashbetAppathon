import React from "react"
import ReactDOM from "react-dom"

export default class Article extends React.Component {
  constructor( props ){
    super(props)
  }

  render() {
    return <div>
      <p> {this.props.text} </p>
    </div>
  }

}
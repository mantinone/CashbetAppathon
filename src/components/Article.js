import React from "react"
import ReactDOM from "react-dom"

export default class Article extends React.Component {
  constructor( props ){
    super(props)
  }

  render() {
    return <div>
      <h3> {this.props.title||"No Title"} </h3>
      <p> {this.props.text} </p>
    </div>
  }

}
import React from "react"
import ReactDOM from "react-dom"

export default class TextEntry extends React.Component {
  constructor( props ){
    super(props)
    this.textChange = this.textChange.bind(this)
    this.state = {
      text: ''
    }
  }

  textChange(event){
    this.setState({text: event.target.value})
    this.props.getTextData(event.target.value)
  }

  render() {
    return <div>
      <textarea rows="30" cols="80" onChange={this.textChange}></textarea>
    </div>
  }

}
import React from "react"
import ReactDOM from "react-dom"
import TextEntry from "./components/TextEntry"
import Button from "./components/Button"

class HelloMessage extends React.Component {
  constructor( props ){
    super(props)
    this.getTextData = this.getTextData.bind(this)
    this.submitData = this.submitData.bind(this)
    this.state = {
      title: '...Loading',
      text: ''
    }
  }

  componentDidMount(){
    this.fetchData()
  }

  getTextData ( textData ) {
    this.setState({
      text: textData
    })
  }

  submitData(){
    const options = {
      method: "POST",
      body: JSON.stringify({textData: this.state.text}),
      mode: 'cors',
      headers: new Headers({
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/json',
         }),
      credentials: 'same-origin'
    }
    fetch( 'http://localhost:3000/article', options )
      .then( response => response.json())
  }

  fetchData(){
    const options = {
      method: "GET",
      mode: 'cors',
      headers: new Headers({
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/json',
         }),
      credentials: 'same-origin'
    }
    fetch( 'http://localhost:3000/data ')
      .then( data => data.json())
      .then( result => {
        console.log('result', result);
        this.setState( {
          title: result.title
        })
      })

  }

  render() {
    return <div>
      Hello {this.props.name}
      <p> Welcome to {this.state.title} </p>
      <TextEntry getTextData={this.getTextData}></TextEntry>
      <Button name="submit" onClick={this.submitData}></Button>
    </div>
  }
}

var mountNode = document.getElementById('app')
ReactDOM.render( <HelloMessage name="Tarun" />, mountNode )

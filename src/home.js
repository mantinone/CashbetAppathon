import React from "react"
import ReactDOM from "react-dom"
import TextEntry from "./components/TextEntry"
import TextEntry from "./components/TruffleObj"

class HelloMessage extends React.Component {
  constructor( props ){
    super(props)
    this.state = {
      title: '...Loading'
    }
  }

  componentDidMount(){
    this.fetchData()
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
      <TextEntry></TextEntry>
      <TruffleObj></TruffleObj>
    </div>
  }
}

var mountNode = document.getElementById('app')
ReactDOM.render( <HelloMessage name="Tarun" />, mountNode )

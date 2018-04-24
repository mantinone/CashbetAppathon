import React from "react"
import ReactDOM from "react-dom"
import TextEntry from "./components/TextEntry"
import Button from "./components/Button"
import Article from "./components/Article"


class HelloMessage extends React.Component {
  constructor( props ){
    super(props)
    this.getTextData = this.getTextData.bind(this)
    this.submitData = this.submitData.bind(this)
    this.writeMode = this.writeMode.bind(this)
    this.readMode = this.readMode.bind(this)
    this.state = {
      title: '...Loading',
      text: '',
      mode: 'Intro',
      articles: [{text: 'Default text'}]
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

  writeMode(){
    this.setState({
      mode: 'Write'
    })
  }

  readMode(){
    this.fetchArticles()
    this.setState({
      mode: 'Read'
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

  fetchArticles(){
    const options = {
      method: "GET",
      mode: 'cors',
      headers: new Headers({
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/json',
         }),
      credentials: 'same-origin'
    }
    fetch( 'http://localhost:3000/article ')
      .then( data => data.json())
      .then( result => {
        console.log('result', result);
        this.setState( {
          articles: result.articles
        })
      })
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

    const articleList = this.state.articles.map( article => {
      return <Article text={article.text}></Article>
    })

    const pageModes = {
      'Intro' : <h2> Use this app to read and publish articles on the Ethereum Network! </h2>,
      'Write' : <div><TextEntry getTextData={this.getTextData}></TextEntry>
        <Button name="submit" onClick={this.submitData}></Button></div>,
      'Read' : <div>{articleList}</div>
    }

    const pageBody = pageModes[this.state.mode]

    return <div>
      Hello {this.props.name}
      <p> Welcome to {this.state.title} </p>
      <Button name='Write an Article' onClick={this.writeMode}></Button>
      <Button name='Read Articles' onClick={this.readMode}></Button>
      {pageBody}
    </div>
  }
}

var mountNode = document.getElementById('app')
ReactDOM.render( <HelloMessage name="Tarun" />, mountNode )

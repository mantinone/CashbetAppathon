import React from 'react'
import ReactDOM from 'react-dom'
import TextEntry from './components/TextEntry'
import Button from './components/Button'
import Article from './components/Article'
import command from './ServerCommands'
import Truffle from './components/TruffleObj'



class HelloMessage extends React.Component {
  constructor( props ){
    super(props)
    this.getTextData = this.getTextData.bind(this)
    this.getTitleData = this.getTitleData.bind(this)
    this.submitData = this.submitData.bind(this)
    this.writeMode = this.writeMode.bind(this)
    this.readMode = this.readMode.bind(this)
    this.state = {
      title: '...Loading',
      text: '',
      articleTitle: '',
      mode: 'Intro',
      articles: [{text: 'Default text'}]
    }
  }

  componentDidMount(){
    this.fetchTitle()
  }

  getTextData ( textData ) {
    this.setState({
      text: textData
    })
  }

  getTitleData ( textData ) {
    this.setState({
      articleTitle: textData
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
    command.fetchRequest( 'article' )
      .then(text => text.json())
      .then((result) => {
        const contract = web3.eth.contract(result.abi).at(result.address)
        return new Promise((resolve, reject) => {
          const resolver = (...kwargs) => { resolve(kwargs) }
          contract.create(this.state.textData, this.state.articleTitle, resolver)
        })
      })
  }

  fetchArticles(){
    command.fetchRequest( 'article' )
      .then(text => text.json())
      .then((result) => {
        const contract = web3.eth.contract(result.abi).at(result.address)
        return new Promise((resolve, reject) => {
          const resolver = (...kwargs) => { resolve(kwargs) }
          contract.getAddressByTitle(this.state.textData, this.state.articleTitle, resolver)
        })
      })
      .then((article) => {
        this.setState( {
          articles: result.articles
        })
      })
  }

  fetchTitle(){
    command.fetchRequest( 'data' )
    .then( result => {
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
        <TextEntry getTextData={this.getTitleData}></TextEntry>
        <Button name='submit' onClick={this.submitData}></Button></div>,
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
ReactDOM.render( <HelloMessage name='Tarun' />, mountNode )

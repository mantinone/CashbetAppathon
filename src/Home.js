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
    this.getSearchData = this.getSearchData.bind(this)
    this.submitData = this.submitData.bind(this)
    this.writeMode = this.writeMode.bind(this)
    this.readMode = this.readMode.bind(this)
    this.fetchArticles = this.fetchArticles.bind(this)
    this.state = {
      text: '',
      articleTitle: '',
      searchTitle: '',
      mode: 'Intro',
      contract: {},
      articles: [{text: 'Default text'}]
    }
  }

  componentDidMount(){
    this.fetchContract()
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

  getSearchData ( textData ) {
    this.setState({
      searchTitle: textData
    })
  }

  writeMode(){
    this.setState({
      mode: 'Write'
    })
  }

  readMode(){
    this.setState({
      mode: 'Read'
    })
  }

  submitData(){
    this.state.contract.create(this.state.text, this.state.articleTitle, _=>{})
  }

  fetchArticles(){
    this.state.contract.getAddressByTitle.call(this.state.searchTitle, (err, result) => {
      this.setState( {
        articles: [{text: result}]
      })
    })
  }

  fetchContract(){
    command.fetchRequest( 'dedium' )
      .then(result => {
        const interfaceObj = web3.eth.contract(result.abi)
        const contract = interfaceObj.at(result.address)
        interfaceObj.eth.defaultAccount = interfaceObj.eth.coinbase

        this.setState( {
          contract: contract
        })
        window.globalObj = {contract: contract}
      })
  }

  render() {
    const articleList = this.state.articles.map( article => {
      return <Article text={article.text}></Article>
    })

    const pageModes = {
      'Intro' : <h2> Use this app to read and publish articles on the Ethereum Network! </h2>,
      'Write' : <div>
          <TextEntry placeholder='Title' rows='1' getTextData={this.getTitleData}></TextEntry>
          <TextEntry placeholder='Body' rows='20' getTextData={this.getTextData}></TextEntry>
          <Button name='submit' onClick={this.submitData}></Button>
        </div>,
      'Read' : <div>
          <p> Enter search term </p>
          <TextEntry placeholder='Title' rows='1' getTextData={this.getSearchData}></TextEntry>
          <Button name='submit' onClick={this.fetchArticles}></Button>
          {articleList}
        </div>
    }

    const pageBody = pageModes[this.state.mode]

    return <div>
      Hello {this.props.name}
      <p> Welcome to Distributed Blogging </p>
      <Button name='Write an Article' onClick={this.writeMode}></Button>
      <Button name='Read Articles' onClick={this.readMode}></Button>
      {pageBody}
    </div>
  }
}

var mountNode = document.getElementById('app')
ReactDOM.render( <HelloMessage name='Tarun' />, mountNode )

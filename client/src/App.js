import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Form from './components/Form'
import ContentFormM from './materials/ContentFormM';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      restult: []
    }
    axios
      .get('/')
      .then(result => {
        console.log(result);
        this.setState({
          result: result
        })
      })
    
      axios
      .get('/search')
      .then(result => {
        console.log('REPOSITÓRIOS');
      })
  }
  render(){

    return (
      <div className="App">
        <ContentFormM form={this.state.result}/>
        
      </div>
    );
  }
}

export default App;

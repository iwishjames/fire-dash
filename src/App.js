import React, {Component} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import FireChart from './components/FireRatingChart'
import Tweets from './components/Tweets'

class App extends Component {


  render(){
    return(
      <div>
        < FireChart />
        <br />
        < Tweets />
      </div>
    )
  }
}

export default App

import React, {Component} from 'react'
import './App.css'
import FireChart from './components/FireRatingChart'
import Weather from './components/Weather'
import Tweets from './components/Tweets'

class App extends Component {


  render(){
    return(
      <div>
        < FireChart />
        <br />
        < Weather />
        <br />
        < Tweets />
      </div>
    )
  }
}

export default App

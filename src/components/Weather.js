import React, {Component} from 'react';

class Weather extends Component {
  constructor(){
    super()
    this.state = {
      description: "",
      temperature : "",
      percipitation: "",
      humidity: "",
      windSpeed: "",
      windDirection: ""
    }

  }

  componentDidMount(){
    var location = this.props.weatherLocation;
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    var targetUrl = `https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=97871ec16b11f660edcd3ce5632d6801`;

    fetch((proxyUrl + targetUrl), {
      headers : {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      }
    })
      .then(result => result.json())
      .then(data => {
        console.log(data)
        this.setState({
          description: "hello",
          temperature : "hello",
          percipitation: "hello",
          humidity: "hello",
          windSpeed: "hello" + "x 3.6",
          windDirection: "hello"
        });
      })
  }

  render(){
    return(
      <div>
        <h1> Weather in {this.props.weatherLoction} </h1>
        <p><span className="textBold">Last Updated:</span> {this.state.description}</p>
        <p><span className="textBold">Temperature:</span> {this.state.temperature}℃</p>
        <p><span className="textBold">Percipitation: </span> {this.state.percipitation}%</p>
        <p><span className="textBold">Humidity: </span> {this.state.humidity}%</p>
        <p><span className="textBold">Wind: </span> {this.state.windSpeed} km/h</p>
        <p><span className="textBold">Wind Direction: </span> {this.state.windDirection}</p>

        <h4>You can confirm the data on the official BoM site - <a href="http://www.bom.gov.au/products/IDN60801/IDN60801.94757.shtml" target="_blank">here!</a></h4>
      </div>
    )
  }
}

export default Weather

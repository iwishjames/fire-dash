import React, {Component} from 'react';

class Weather2 extends Component {
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
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    var targetUrl = 'http://reg.bom.gov.au/fwo/IDN60901/IDN60901.94757.json';

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
          description: data.observations.data[0].local_date_time,
          temperature : data.observations.data[0].air_temp,
          percipitation: data.observations.data[0].rain_trace,
          humidity: data.observations.data[0].rel_hum,
          windSpeed: data.observations.data[0].wind_spd_kmh,
          windDirection: data.observations.data[0].wind_dir
        });
      })
  }

  render(){
    return(
      <div>
        <h1>Weather in Campbelltown</h1>
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

export default Weather2

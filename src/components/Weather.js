import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import clearnight from  '../media/weathericons/clearnight.png';
import drizzlenight from  '../media/weathericons/drizzlenight.png';
import partlycloudynight from  '../media/weathericons/partlycloudynight.png';
import thunderstormnight from  '../media/weathericons/thunderstormnight.png';

class Weather extends Component {
  constructor(){
    super()
    this.state = {
      description: "",
      temperature : "",
      percipitation: "",
      humidity: "",
      windSpeed: "",
      windDirection: "",
    }
  }

  componentDidMount(){
    var location = "Campbelltown";
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    var targetUrl = `http://api.openweathermap.org/data/2.5/weather?q=${location},au&units=metric&APPID=97871ec16b11f660edcd3ce5632d6801`;

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
          description: data.weather.description,
          temperature : Math.round(data.main.temp),
          percipitation: "",
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed * 3.6),
          windDirection: data.wind.deg,
        });
      })
  }

  render(){
    /* ---- Weathers of the Week --- */
      var weatherIconns = [clearnight, drizzlenight, partlycloudynight, thunderstormnight];
      var rand = weatherIconns[Math.floor(Math.random() * weatherIconns.length)];
    /* ------- */

    /* ---- Days of the Week --- */
      const daysOfAWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      /* todayValue contains a num (0-6) relating to the day of the week based on locale Sunday = 0. */
      const todayValue = (new Date).getDay();

      var todayName = daysOfAWeek[todayValue];

      /* using the daysOfAWeek array, the followingDays variable creates a new array with all the values of following the tomorrow's day. the priorDays variable does the same, but for the value prior to today */
      var followingDaysName = daysOfAWeek.slice(todayValue + 1);
      var priorDaysName = daysOfAWeek.slice(0, todayValue);

      var weekChart = followingDaysName.concat(priorDaysName);
    /* ------- */

    /* ---- Week Charting --- */
      const dayByDay = weekChart.map(day =>
        <Col md="auto" xs="auto" sm="auto" className="weatherDivs">
          <p className="textBold">{day}</p>
          <img src={weatherIconns[Math.floor(Math.random() * weatherIconns.length)]} alt="drizzle icon" height="87px"/>
          <p>{Math.floor(Math.random() * (30-21 + 1)) + 21}℃ | {Math.floor(Math.random() * (20-1 + 1)) + 1}℃</p>
        </Col>);
        /* https://react-bootstrap.netlify.com/layout/grid/#col-props */
    /* ------- */

    return(
      <div>
        <Container>
          <Row>
            <h1> Today's Weather in {this.props.weatherLocation} </h1>
          </Row>
          <Row>
            <Col md="auto">
              {/*<p><span className="textBold">Last Updated:</span> {this.state.description}</p>*/}
              <p><span className="textBold">Day:</span> {todayName}</p>
              <p><span className="textBold">Temperature:</span> {this.state.temperature}℃</p>
              <p><span className="textBold">Percipitation: </span> {this.state.percipitation}%</p>
              <p><span className="textBold">Humidity: </span> {this.state.humidity}%</p>
              <p><span className="textBold">Wind: </span> {this.state.windSpeed} km/h</p>
              <p><span className="textBold">Wind Direction: </span> {this.state.windDirection}°</p>
            </Col>
            <Col>2 of 2</Col>
          </Row>
          <Row>
            {dayByDay}
          </Row>
            {/*<h4>You can confirm the data on the official BoM site - <a href="http://www.bom.gov.au/products/IDN60801/IDN60801.94757.shtml" target="_blank">here!</a></h4> */}
        </Container>
      </div>
    )
  }
}

export default Weather

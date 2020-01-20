import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import clearnight from  '../media/weathericons/clearnight.png';
import drizzlenight from  '../media/weathericons/drizzlenight.png';
import partlycloudynight from  '../media/weathericons/partlycloudynight.png';
import thunderstormnight from  '../media/weathericons/thunderstormnight.png';
import sunny from  '../media/weathericons/sunny.png';
import drizzle from  '../media/weathericons/drizzle.png';
import partlycloudy from  '../media/weathericons/partlycloudy.png';
import thunderstorm from  '../media/weathericons/thunderstorm.png';

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
    var location = "Albury";
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
      var weatherIconsDay = [sunny, drizzle, partlycloudy, thunderstorm];
      var weatherIconsNight = [clearnight, drizzlenight, partlycloudynight, thunderstormnight];
      var dayHour = (new Date).getHours();
    /* ------- */

    /* ---- Day Mode/ Night Mode --- */
      var dayNightMode = () => {
        if (dayHour > 17) {
          return weatherIconsNight;
        }
        return weatherIconsDay;
      }
    /* ------- */

    /* ---- Days of the Week --- */
      const daysOfAWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      /* todayValue contains a num (0-6) relating to the day of the week based on locale Sunday = 0. */
      const todayValue = (new Date).getDay();

      var todayName = daysOfAWeek[todayValue];

      /* using the daysOfAWeek array, the followingDays variable creates a new array with all the values of following the tomorrow's day. the priorDays variable does the same, but for the value prior to today */
      var followingDaysName = daysOfAWeek.slice(todayValue + 1);
      var priorDaysName = daysOfAWeek.slice(0, todayValue);

      var weekChart = (followingDaysName.concat(priorDaysName)).slice(0, 4);
    /* ------- */

    /* ---- Week Charting --- */
      const dayByDay = weekChart.map(day =>
        <Col md="auto" xs="auto" sm="auto" className="weatherDivs">
          <p className="textBold">{day}</p>
          <img src={weatherIconsDay[Math.floor(Math.random() * weatherIconsDay.length)]} alt="drizzle icon" height="87px"/>
          <p>{Math.floor(Math.random() * (30-21 + 1)) + 21}℃ | {Math.floor(Math.random() * (20-1 + 1)) + 1}℃</p>
        </Col>);
        /* https://react-bootstrap.netlify.com/layout/grid/#col-props */
    /* ------- */

    return(
      <div>
        <Container>
          <Row>
            <h3> Weather</h3>
          </Row>
          <Row className="weatherBackground">
            <Col>
              {/*<p><span className="textBold">Last Updated:</span> {this.state.description}</p>*/}
              <p><span className="textBold">{todayName}</span></p>
              <img src={dayNightMode()[Math.floor(Math.random() * (dayNightMode()).length)]} alt="drizzle icon"/>
              <p><span className="textBold">Current Temp:</span> {this.state.temperature}℃</p>
            </Col>
            <Col>
              <p><span className="textBold">Location:</span> {this.props.weatherLocation}</p>
              <p><span className="textBold">Percipitation: </span> {this.state.percipitation}%</p>
              <p><span className="textBold">Humidity: </span> {this.state.humidity}%</p>
              <p><span className="textBold">Wind: </span> {this.state.windSpeed} km/h</p>
              <p><span className="textBold">Wind Direction: </span> {this.state.windDirection}°</p>
            </Col>
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

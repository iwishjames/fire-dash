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

/* ---- Weathers of the Week --- */
  let weatherIconsDay = [sunny, drizzle, partlycloudy, thunderstorm];
  let weatherIconsNight = [clearnight, drizzlenight, partlycloudynight, thunderstormnight];
  let dayHour = (new Date).getHours();
/* ------- */

/* ---- Day Mode/ Night Mode --- */
  let dayNightMode = () => {
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

  let todayName = daysOfAWeek[todayValue];

  /* using the daysOfAWeek array, the followingDays variable creates a new array with all the values of following the tomorrow's day. the priorDays variable does the same, but for the value prior to today */
  let followingDaysName = daysOfAWeek.slice(todayValue + 1);
  let priorDaysName = daysOfAWeek.slice(0, todayValue);

  let weekChart = (followingDaysName.concat(priorDaysName)).slice(0, 4);
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


class Weather extends Component {
  render(){
    return(
      <div>
        <Container>
          <Row>
            <h3>Weather</h3>
          </Row>
          <Row className="weatherBackground">
            <Col>
              {/*<p><span className="textBold">Last Updated:</span> {this.state.description}</p>*/}
              <p><span className="textBold">{todayName}</span></p>
              <img src={`https://openweathermap.org/img/wn/${this.props.weatherData.weatherIcon}@2x.png`} alt="drizzle icon"/>
              <p>{this.props.weatherData.description}</p>
              <p><span className="textBold">Current Temp:</span> {this.props.weatherData.temperature}℃</p>
            </Col>
            <Col>
              <p><span className="textBold">Location:</span> {this.props.weatherData.location}</p>
              <p><span className="textBold">Percipitation: </span> {this.props.weatherData.percipitation}%</p>
              <p><span className="textBold">Humidity: </span> {this.props.weatherData.humidity}%</p>
              <p><span className="textBold">Wind: </span> {this.props.weatherData.windSpeed} km/h</p>
              <p><span className="textBold">Wind Direction: </span> {this.props.weatherData.windDirection}°</p>
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

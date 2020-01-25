import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import clearnight from  '../media/weathericons/01n.png';
import drizzlenight from  '../media/weathericons/09n.png';
import partlycloudynight from  '../media/weathericons/02n.png';
import thunderstormnight from  '../media/weathericons/11n.png';
import sunny from  '../media/weathericons/01d.png';
import drizzle from  '../media/weathericons/09d.png';
import partlycloudy from  '../media/weathericons/02d.png';
import thunderstorm from  '../media/weathericons/11d.png';

/* ---- Weathers of the Week --- */
  let weatherIconsDay = [sunny, drizzle, partlycloudy, thunderstorm];
  let weatherIconsNight = [clearnight, drizzlenight, partlycloudynight, thunderstormnight];
  let dayHour = (new Date).getHours();
/* ------- */

/* ---- Day Mode/ Night Mode --- */
  let whichMode = (dayHour > 5 && dayHour < 17) ? "lightMode" : "weatherBlack";

  let dayNightMode = (dayHour > 5 && dayHour < 17) ? weatherIconsDay : weatherIconsNight;
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
    <Col md="auto" xs="auto" sm="auto" className={`weatherDivs ${whichMode}`}>
      <p className="textBold noBottomMargin">{day}</p>
      <img src={dayNightMode[Math.floor(Math.random() * dayNightMode.length)]} alt="weather icon" height="87px"/>
      <p>{Math.floor(Math.random() * (30-21 + 1)) + 21}℃ | {Math.floor(Math.random() * (20-1 + 1)) + 1}℃</p>
    </Col>);
    /* https://react-bootstrap.netlify.com/layout/grid/#col-props */
/* ------- */

class Weather extends Component {
  render(){
    return(
        <Container>
          <Row>
            <h5 className={"titleText"}>Weather</h5>
          </Row>
          <Row className={`weatherBackground ${whichMode}`}>
            <Col>
              {/*<p><span className="textBold">Last Updated:</span> {this.state.description}</p>*/}
              <p><span className="textBold">{todayName}</span></p>
              <img src={require(`../media/weathericons/${this.props.weatherIcon}.png`)} alt={this.props.description}/>
              <p>{this.props.description}</p>
              <p><span className="textBold">Current Temp:</span> {this.props.temperature}℃</p>
            </Col>
            <Col>
              <p><span className="textBold">Location:</span> {this.props.location}</p>
              <p><span className="textBold">Percipitation: </span> {this.props.percipitation}%</p>
              <p><span className="textBold">Humidity: </span> {this.props.humidity}%</p>
              <p><span className="textBold">Wind: </span> {this.props.windSpeed} km/h</p>
              <p><span className="textBold">Wind Direction: </span> {this.props.windDirection}°</p>
            </Col>
          </Row>
          <Row>
            {dayByDay}
          </Row>
            {/*<h4>You can confirm the data on the official BoM site - <a href="http://www.bom.gov.au/products/IDN60801/IDN60801.94757.shtml" target="_blank">here!</a></h4> */}
        </Container>
    )
  }
}

export default Weather

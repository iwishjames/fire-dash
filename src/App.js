import React, {Component} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchCouncil from './components/SearchCouncil';
import FireChart from './components/FireRatingChart';
import Weather from './components/Weather';
import Tweets from './components/Tweets';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

/* ---- Day Mode/ Night Mode --- */
let dayHour = (new Date).getHours();
let whichMode = (dayHour > 5 && dayHour < 18) ? "lightMode" : "darkMode";
let bgColorMode = (dayHour > 5 && dayHour < 18) ? "bgColorLightMode" : "bgColorDarkMode";
let titleTextMode = (dayHour > 5 && dayHour < 18) ? "titleTextLight" : "titleTextDark";
/* ------- */

class App extends Component {
  constructor() {
    super()
    this.state = {
      whichMode: whichMode,
      fireRatingData: {
        display: false,
        regionName: "",
        regionNumber: "",
        fireDangerToday : "",
        fireBanToday: "",
        fireDangerTomorrow : "",
        fireBanTomorrow : "",
        councils : "",
      },
      weatherData: {
          display: false,
          region: "Albury",
          description: "",
          temperature : "",
          percipitation: "",
          humidity: "",
          windSpeed: "",
          windDirection: "",
          weatherIcon: "",
          location: "",
        }
    }
  }

          getWeather = async (city) => {
            if (city !== "Select") {
            let location = city;
            await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location},au&units=metric&APPID=97871ec16b11f660edcd3ce5632d6801`)
              .then(result => result.json())
              .then(data => {
                console.log(data)
                this.setState({
                  weatherData: {
                    display: true,
                    description: data.weather[0].description,
                    temperature : Math.round(data.main.temp),
                    percipitation: "",
                    humidity: data.main.humidity,
                    windSpeed: Math.round(data.wind.speed * 3.6),
                    windDirection: data.wind.deg,
                    weatherIcon: data.weather[0].icon,
                    location: data.name,}
                })
              })
          }
}
  /* The datafile was in XML, so had to be converted to JSON. I used NPM xml2js for this. Also the datafile had a cors issue, which was overcome using the proxyURL! So here the data is received as text, and then converted to json.

  The if is checking if select is being selected. if so, then the load wont happen!
  */

            getFireRating = async (index) => {
              if (index !== 21) {
              let indexValue = index;
              let xml2js = require('xml2js');
              let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
              let targetUrl = 'http://www.rfs.nsw.gov.au/feeds/fdrToban.xml';

              await fetch(proxyUrl + targetUrl)
                .then(response => response.text())
                .then(data => xml2js.parseStringPromise(data))
                .then(result => {
                  console.log(result)
                  this.setState({
                      fireRatingData: {
                        display: true,
                        regionName: result.FireDangerMap.District[indexValue].Name[0],
                        regionNumber: result.FireDangerMap.District[indexValue].RegionNumber[0],
                        fireDangerToday: result.FireDangerMap.District[indexValue].DangerLevelToday[0],
                        fireBanToday: result.FireDangerMap.District[indexValue].FireBanToday[0],
                        fireDangerTomorrow: result.FireDangerMap.District[indexValue].DangerLevelTomorrow[0],
                        fireBanTomorrow: result.FireDangerMap.District[indexValue].FireBanTomorrow[0],
                        councils: result.FireDangerMap.District[indexValue].Councils[0],
                      }
                  })
                })
              }
            }

  render(){

    const content = this.state.fireRatingData.display === false ?
    <div style={{height: "100vh"}}className={bgColorMode}></div>
    :
    (
          <div>
            <Container>
              <Row>
                <Col className={`fadeIn`}>
                  < FireChart
                    display={this.state.fireRatingData.display}
                    regionName={this.state.fireRatingData.regionName}
                    regionNumber={this.state.fireRatingData.regionNumber}
                    fireDangerToday={this.state.fireRatingData.fireDangerToday}
                    fireBanToday={this.state.fireRatingData.fireBanToday}
                    fireDangerTomorrow={this.state.fireRatingData.fireDangerTomorrow}
                    fireBanTomorrow={this.state.fireRatingData.fireBanTomorrow}
                    councils={this.state.fireRatingData.councils}
                  />
                </Col>

                <Col className={`fadeIn`}>
                  < Weather
                    display={this.state.fireRatingData.display}
                    region={this.state.weatherData.region}
                    description={this.state.weatherData.description}
                    temperature ={this.state.weatherData.temperature}
                    percipitation={this.state.weatherData.percipitation}
                    humidity={this.state.weatherData.humidity}
                    windSpeed={this.state.weatherData.windSpeed}
                    windDirection={this.state.weatherData.windDirection}
                    weatherIcon={this.state.weatherData.weatherIcon}
                    location={this.state.weatherData.location}
                  />
                </Col>

              </Row>
              <Row>
                <Col className={`fadeIn`}>
                  < Tweets />
                </Col>

                <Col className={`fadeIn`}>
                  <h5 className={titleTextMode}>Other Info</h5>
                </Col>
              </Row>
            </Container>
          </div>);

    return(
      <div className={bgColorMode}>
        <div className="centerDiv textCenter">
          <h1>FireDash<span className="textUp">NSW</span> for < SearchCouncil setDistrictNumber={this.getDistrictNumber} setDistrictName={this.getDistrictName} getWeather={this.getWeather} getIndex={this.getFireRating}/></h1>
        </div>
        {content}
      </div>
    )
  }
}

export default App

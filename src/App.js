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


class App extends Component {
  constructor() {
    super()
    this.state = {
      fireRatingData: {
        loading: false,
        regionName: "",
        regionNumber: "",
        fireDangerToday : "",
        fireBanToday: "",
        fireDangerTomorrow : "",
        fireBanTomorrow : "",
        councils : "",
      },
      weatherData: {
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
            let location = city;
            await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location},au&units=metric&APPID=97871ec16b11f660edcd3ce5632d6801`)
              .then(result => result.json())
              .then(data => {
                console.log(data)
                this.setState({
                  weatherData: {
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

  /* The datafile was in XML, so had to be converted to JSON. I used NPM xml2js for this. Also the datafile had a cors issue, which was overcome using the proxyURL! So here the data is received as text, and then converted to json. */

            getFireRating = async (index) => {
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

  render(){
    return(
      <div>
        <div className="centerDiv textCenter">
          <h1>FireDash<span className="textUp">NSW</span> for < SearchCouncil setDistrictNumber={this.getDistrictNumber} setDistrictName={this.getDistrictName} getWeather={this.getWeather} getIndex={this.getFireRating}/></h1>
        </div>
        <Container>
          <Row>
            <Col>

              < FireChart
                loading={this.state.fireRatingData.loading}
                regionName={this.state.fireRatingData.regionName}
                regionNumber={this.state.fireRatingData.regionNumber}
                fireDangerToday={this.state.fireRatingData.fireDangerToday}
                fireBanToday={this.state.fireRatingData.fireBanToday}
                fireDangerTomorrow={this.state.fireRatingData.fireDangerTomorrow}
                fireBanTomorrow={this.state.fireRatingData.fireBanTomorrow}
                councils={this.state.fireRatingData.councils}
              />

            </Col>
            <Col>

              < Weather
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
            <Col>

              < Tweets />

            </Col>
            <Col>

              <h3>Other Info</h3>

            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App

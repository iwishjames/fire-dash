import React, {Component} from "react";
import SearchCouncil from '../components/SearchCouncil';
import Weather from '../components/Weather';
import Tweets from '../components/Tweets'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class FireRatingChart extends Component {
    constructor() {
      super()
      this.state = {
        regionName: "",
        regionNumber: "",
        fireDangerToday : "",
        fireBanToday: "",
        fireDangerTomorrow : "",
        fireBanTodayTomorrow : "",
        councils : "",
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
          let location = city === null ? "Albury" : city;
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
                    regionName: result.FireDangerMap.District[indexValue].Name[0],
                    regionNumber: result.FireDangerMap.District[indexValue].RegionNumber[0],
                    fireDangerToday: result.FireDangerMap.District[indexValue].DangerLevelToday[0],
                    fireBanToday: result.FireDangerMap.District[indexValue].FireBanToday[0],
                    fireDangerTomorrow: result.FireDangerMap.District[indexValue].DangerLevelTomorrow[0],
                    fireBanTomorrow: result.FireDangerMap.District[indexValue].FireBanTomorrow[0],
                    councils: result.FireDangerMap.District[indexValue].Councils[0],
                })
              })
          }

    render(){

      const ratingsList = {
        "LOW MODERATE": [-75, "#17a462"],
        "HIGH": [-45, "#00adef"],
        "VERY HIGH": [-15, "#ffd600"],
        "SEVERE": [15, "#fd9e1d"],
        "EXTREME": [45, "#e5281b"],
        "CATASTROPHIC": [75, "#e5281b"]
      }

      let arrowDegree = "";
      let warningBgColor = "";
      let todaysWarning = "";

      function todaysRating(rating) {
        for (let key in ratingsList) {
          if (key === rating) {
            todaysWarning = rating;
            arrowDegree = ratingsList[key][0];
            warningBgColor = ratingsList[key][1];
          }
        }
      }
      todaysRating(this.state.fireDangerToday);

      let tomorrowsWarningColor = "";
      function tomorrowsRating(rating) {
        for (let key in ratingsList) {
          if (key === rating) {
            tomorrowsWarningColor = ratingsList[key][1];
          }
        }
      }
      tomorrowsRating(this.state.fireDangerTomorrow);


      const cataWarningColor = todaysWarning === "CATASTROPHIC" ? "white" : null;
      const mainWarningText = this.state.loading ? "loading..." : <span className="warningText" style={{backgroundColor: warningBgColor, color: cataWarningColor }}> {todaysWarning} </span>;
      const animation = this.state.loading ?
        <img src={require("../media/airrow.png")} alt="Fire Rating Arrow" height="120px" className="chartArrow" style={{transform:`rotate(${arrowDegree}deg)`}}/> :
        <img src={require("../media/airrow.png")} alt="Fire Rating Arrow" height="120px" className="chartArrow" style={{transform:`rotate(${arrowDegree}deg)`, animation: `arrowMovement 2s`}}/>;
      const fireBanToday = this.state.fireBanToday !== "Yes" ?  "" : "Total Fire Ban Today";
      const fireBanTomorrow = this.state.fireBanTomorrow !== "Yes" ?
        "" : "Total Fire Ban Tomorrow" + <img src={"../media/no-fire.svg"} alt="Fire ban symbol" height="1px" />;

      return(
        <div>
          <div className="centerDiv textCenter">
            <h1>FireDash<span className="textUp">NSW</span> for < SearchCouncil setDistrictNumber={this.getDistrictNumber} setDistrictName={this.getDistrictName} getWeather={this.getWeather} getIndex={this.getFireRating}/></h1>
          </div>

          <Container>
          <Row>
            <Col>
            <h3> Fire Danger Rating</h3>
            <div className="parent">
              <img src={require("../media/firechart.png")} alt="fire ratings chart" className="fireChart" height="220px"/>
              {animation}
              <h2>{mainWarningText}</h2>
              <p><span className="textBold">Region Name:</span> {this.state.regionName}</p>
              <p><span className="textBold">Region Number</span> (RFS Map Reference):  {this.state.regionNumber} </p>
              {/*<p><span className="textBold">Councils:</span> {this.state.councils}</p>*/}
              <p><span className="textBold">{fireBanToday}</span></p>
              <span>_______________</span>

              <p><span className="textBold">Fire Danger Rating for Tomorrow:</span> <span className="warningText textBold" style={{backgroundColor: tomorrowsWarningColor, color: cataWarningColor }}>{this.state.fireDangerTomorrow}</span></p>
              <p><span className="textBold">{fireBanTomorrow}</span></p>
              <br />

              <h5>You can confirm the data on the official RFS site - <a href="https://www.rfs.nsw.gov.au/fire-information/fdr-and-tobans" target="_blank">here!</a></h5>
            </div>
            <br />
            </Col>
            <Col>
              < Weather weatherLocation={this.state.districtName} weatherData={this.state.weatherData}/>
            </Col>
          </Row>

          <Row>
            <Col>
              <h3>Twitter Feed</h3>
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

export default FireRatingChart

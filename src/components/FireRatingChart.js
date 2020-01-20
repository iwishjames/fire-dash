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
        loading: false,
        regionName: "",
        regionNumber: "",
        fireDangerToday : "",
        fireBanToday: "",
        fireDangerTomorrow : "",
        fireBanTodayTomorrow : "",
        districtNumber: 0,
        districtName: 'Albury'
      }
      this.getDistrictName = this.getDistrictName.bind(this)
      this.getDistrictNumber = this.getDistrictNumber.bind(this)
    }

        getDistrictNumber(value) {
          this.setState({districtNumber: value})
        }

        getDistrictName(value) {
          this.setState({districtName: value})
        }


/* The datafile was in XML, so had to be converted to JSON. I used NPM xml2js for this. Also the datafile had a cors issue, which was overcome using the proxyURL! So here the data is received as text, and then converted to json. */
    componentDidMount() {
      var xml2js = require('xml2js');
      var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      var targetUrl = 'http://www.rfs.nsw.gov.au/feeds/fdrToban.xml';
      var indexValue = this.state.districtNumber;

      // this.setState({loading: true})
      fetch(proxyUrl + targetUrl)
        .then(response => response.text())
        .then(data => xml2js.parseStringPromise(data))
        .then(result => {
            this.setState({
              loading: false,
              regionName: result.FireDangerMap.District[indexValue].Name[0],
              regionNumber: result.FireDangerMap.District[indexValue].RegionNumber[0],
              fireDangerToday: result.FireDangerMap.District[indexValue].DangerLevelToday[0],
              fireBanToday: result.FireDangerMap.District[indexValue].FireBanToday[0],
              fireDangerTomorrow: result.FireDangerMap.District[indexValue].DangerLevelTomorrow[0],
              fireBanTomorrow: result.FireDangerMap.District[indexValue].FireBanTomorrow[0],
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
            <h1>FireDash<span className="textUp">NSW</span> for < SearchCouncil setDistrictNumber={this.getDistrictNumber} setDistrictName={this.getDistrictName}/></h1>
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
              <p><span className="textBold">Region Number:</span>  {this.state.regionNumber} (For RFS fire map reference)</p>
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
              < Weather weatherLocation={this.state.districtName}/>
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

import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

let dayHour = (new Date).getHours();
let whichMode = (dayHour > 5 && dayHour < 17) ? "lightMode" : "darkMode";
let titleTextMode = (dayHour > 5 && dayHour < 17) ? "titleTextLight" : "titleTextDark";

class FireRatingChart extends Component {
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
      todaysRating(this.props.fireDangerToday);

      let tomorrowsWarningColor = "";
      function tomorrowsRating(rating) {
        for (let key in ratingsList) {
          if (key === rating) {
            tomorrowsWarningColor = ratingsList[key][1];
          }
        }
      }
      tomorrowsRating(this.props.fireDangerTomorrow);


      const cataWarningColor = todaysWarning === "CATASTROPHIC" ? "white" : null;
      const mainWarningText = this.props.loading ? "loading..." : <span className="warningText" style={{backgroundColor: warningBgColor, color: cataWarningColor }}> {todaysWarning} </span>;
      const animation = this.props.loading ?
        <img src={require("../media/airrow.png")} alt="Fire Rating Arrow" height="120px" className="chartArrow" style={{transform:`rotate(${arrowDegree}deg)`}}/> :
        <img src={require("../media/airrow.png")} alt="Fire Rating Arrow" height="120px" className="chartArrow" style={{transform:`rotate(${arrowDegree}deg)`, animation: `arrowMovement 2s`}}/>;
      const fireBanTodayText = this.props.fireBanToday !== "Yes" ? "" : "Total Fire Ban Today ";
      const fireBanTodayIcon = this.props.fireBanToday !== "Yes" ? "" : <img src={require("../media/no-fire.svg")} alt="fire ban icon" height="20px"/>;

      const fireBanTomorrowText = this.props.fireBanTomorrow !== "Yes" ? "" : "Total Fire Ban Tomorrow";
      const fireBanTomorrowIcon = this.props.fireBanTomorrow !== "Yes" ? "" : <img src={require("../media/no-fire.svg")} alt="fire ban icon" height="20px"/>;;

      return(
        <Container>
          <Row>
            <h5 className={titleTextMode}>Fire Danger Rating</h5>
          </Row>
            <div className="parent">
              <Row>
              <div className={whichMode}>
                <img src={require("../media/firechart.png")} alt="fire ratings chart" className="fireChart" height="220px"/>
                {animation}
                <h2>{mainWarningText}</h2>
              </div>
              </Row>
              <Row>
              <div className={whichMode}>
              <p><span className="textBold">{fireBanTodayText}</span>{fireBanTodayIcon}</p>
              <p><span className="textBold">Region Name:</span> {this.props.regionName}</p>
              <p><span className="textBold">Region Number</span> (RFS Map Reference):  {this.props.regionNumber} </p>
              <p><span className="textBold">Councils:</span> {this.props.councils}</p>

              <p><span className="textBold">Fire Danger Rating for Tomorrow:</span><span className="warningText textBold" style={{backgroundColor: tomorrowsWarningColor, color: cataWarningColor }}>{this.props.fireDangerTomorrow}</span></p>
              <p><span className="textBold">{fireBanTomorrowText}</span>{fireBanTomorrowIcon}</p>
              <p><span>_______________</span></p>
              <p>You can confirm the data on the official RFS site - <a href="https://www.rfs.nsw.gov.au/fire-information/fdr-and-tobans" target="_blank">here!</a></p>
            </div>
            </Row>
          </div>
        </Container>
      )
      }
    }

export default FireRatingChart

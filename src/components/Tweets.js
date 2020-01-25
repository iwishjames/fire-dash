import React, {Component} from 'react';
import {TwitterTimelineEmbed} from 'react-twitter-embed';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

let dayHour = (new Date).getHours();
let theme = (dayHour > 5 && dayHour < 17) ? "light" : "dark";

class Tweets extends Component {

  render(){
    return(
      <Container>
      <Row>
        <h5 className={"titleText"}>NSW RFS Twitter Feed</h5>
      </Row>

      <Row md="auto" xs="auto" sm="auto">
      <div className={"lightMode"}>
      <TwitterTimelineEmbed
       sourceType="profile"
       screenName="NSWRFS"
       options={{
         height: "500",
         width: "500"
       }}
       theme={theme}
       noHeader="true"
       noFooter="true"
     />
     </div>
     </Row>
     </Container>
  )}
}

export default Tweets

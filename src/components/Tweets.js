import React, {Component} from 'react';
import {TwitterTimelineEmbed} from 'react-twitter-embed';

class Tweets extends Component {
  render(){
    return(
    <div>
      <TwitterTimelineEmbed
       sourceType="profile"
       screenName="NSWRFS"
       options={{
         height: "500",
         width: "40%",
       }}
     />
    </div>
  )}
}

export default Tweets

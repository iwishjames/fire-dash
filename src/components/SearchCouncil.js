import React, {Component} from 'react';

const councilAreas = [
  ["Ballina", "Byron", "Clarence Valley", "Kyogle", "Lismore", "Richmond Valley", "Tweed"],
  ["Bellingen", "Coffs Harbour", "Port Macquarie-Hastings", "Kempsey", "Nambucca", "Mid-Coast"],
  ["Cessnock", "Dungog", "Lake Macquarie", "Maitland", "Muswellbrook", "Newcastle", "Port Stephens", "Singleton", "Upper Hunter"],
  ["The Hills", "Blacktown", "Blue Mountains", "Burwood", "Camden", "Campbelltown", "Canada Bay", "Fairfield", "Hawkesbury", "Hornsby", "Hunters Hill", "Kogarah", "Ku-ring-gai", "Lane Cove", "Liverpool", "Mosman", "North Sydney", "Parramatta", "Penrith", "Randwick", "Ryde", "Strathfield", "Sutherland", "Sydney", "Waverley", "Willoughby", "Woollahra", "Bayside", "Canterbury-Bankstown", "Central Coast", "Cumberland", "Georges River", "Inner West", "Northern Beaches"],
  ["Kiama", "Shellharbour", "Shoalhaven", "Wingecarribee", "Wollondilly", "Wollongong"],
  ["Bega Valley", "Eurobodalla"],
  ["Snowy Monaro"],
  ["Canberra"],
  ["Goulburn Mulwaree", "Upper Lachlan", "Yass Valley", "Queanbeyan-Palerang"],
  ["Bathurst", "Blayney", "Cabonne", "Cowra", "Lithgow", "Mid-Western", "Oberon", "Orange"],
  ["Glen Innes Severn", "Tenterfield", "Uralla", "Walcha", "Armidale"],
  ["Gunnedah", "Gwydir", "Inverell", "Liverpool Plains", "Tamworth"],
  ["Moree Plains", "Narrabri", "Walgett", "Warrumbungle"],
  ["Bogan", "Coonamble", "Gilgandra", "Warren"],
  ["Bland", "Forbes", "Lachlan", "Narromine", "Parkes", "Temora", "Weddin", "Dubbo"],
  ["Cootamundra-Gundagai", "Hilltops", "Snowy Valleys"],
  ["Albury", "Coolamon", "Greater Hume", "Junee", "Lockhart", "Wagga Wagga"],
  ["Berrigan", "Edward River", "Federation", "Murray River", "Murrumbidgee (Sth)"],
  ["Carrathool", "Griffith", "Hay", "Leeton", "Narrandera", "Murrumbidgee (Nth)"],
  ["Balranald", "Wentworth"],
  ["Bourke", "Brewarrina", "Broken Hill", "Central Darling", "Cobar"],
];

const areasList = (councilAreas.flat()).sort();
const areasOptions = areasList.map((area) =>
  <option value={area}>{area}</option>
);

let dayHour = (new Date).getHours();
let colorMode = (dayHour > 5 && dayHour < 17) ? "selectorColorLight" : "selectorColorDark";

class SearchCouncil extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this);
  }

//as default map's second paramater is the index of the value.

  handleChange(event) {
    let locationName = event.target.value;
    let locationIndex;

    councilAreas.map((region, index) => {
    if (region.includes(locationName)) {
     locationIndex = index;
    };
    if (locationName === "Select") {
      locationIndex = 21;
    }
    });

    this.props.getWeather(locationName)
    this.props.getIndex(locationIndex)

  }

  render(){
    return(
      <select className={colorMode} onChange={this.handleChange}>
        <option value="Select">Select</option>
        {areasOptions}
      </select>
    )}
}

export default SearchCouncil


// Here we are getting the District name and checking through the array of arrays to get the index value. this will be the value which will be required to be used in the data URL.

// Potentially could change the numbers to the the specific region name, so the developers can understand and use the key's index number as the value for the .json file .

// Creating a consolidated list of all the values of the council areas. flat consolidates it all together into a single array. This will be used to create a dynamic select menu.

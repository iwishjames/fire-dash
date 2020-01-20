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

class SearchCouncil extends Component {
  constructor() {
    super()
    this.state = {
      districtName: '',
      districtNumber: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.getDistrictNumber = this.getDistrictNumber.bind(this);
  }

  getDistrictNumber(districtName) {
    let districtNumber = null
    councilAreas.map((region, index) => {
    if (region.includes(districtName)) {
     this.setState({fireDistrict: index});
     districtNumber = index;
    }
    });
    return districtNumber
  }

  handleChange(event) {
    let districtName = event.target.value;

    let districtNumber = this.getDistrictNumber(districtName);

    // Here we are getting the District name and checking through the array of arrays to get the index value. this will be the value which will be required to be used in the data URL.

    this.props.setDistrictNumber(districtNumber)
    this.props.setDistrictName(districtName)

    this.setState({districtName: districtName});
  }


  render(){
    // Potentially could change the numbers to the the specific region name, so the developers can understand and use the key's index number as the value for the .json file .


    // Creating a consolidated list of all the values of the council areas. flat consolidates it all together into a single array. This will be used to create a dynamic select menu.
    const areasList = (councilAreas.flat()).sort();
    const areasOptions = areasList.map((area) =>
      <option key={area} value={area}>{area}</option>
    );





    return(
      <select onChange={this.handleChange}>
        {areasOptions}
      </select>
    )}
}

export default SearchCouncil

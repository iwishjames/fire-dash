import React, {Component} from 'react';

class SearchCouncil extends Component {
  constructor() {
    super()
    this.state = {
      district: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({district: event.target.value});
  }


  render(){
    // Potentially could change the numbers to the the specific region name, so the developers can understand and use the key's index number as the value for the .json file .
    const councilAreas = [
      ["Ballina", "Byron", "Clarence Valley", "Kyogle", "Lismore", "Richmond Valley", "Tweed"],
      ["Bellingen", "Coffs Harbour", "Port Macquarie-Hastings", "Kempsey", "Nambucca", "Mid-Coast"],
      ["Cessnock", "Dungog", "Lake Macquarie", "Maitland", "Muswellbrook", "Newcastle", "Port Stephens", "Singleton", "Upper Hunter"],
      ["The Hills", "Blacktown", "Blue Mountains", "Burwood", "Camden", "Campbelltown", "Canada Bay", "Fairfield", "Hawkesbury", "Hornsby", "Hunters Hill", "Kogarah", "Ku-ring-gai", "Lane Cove", "Liverpool", "Mosman", "North Sydney", "Parramatta", "Penrith", "Randwick", "Ryde", "Strathfield", "Sutherland", "Sydney", "Waverley", "Willoughby", "Woollahra", "Bayside", "Canterbury-Bankstown", "Central Coast", "Cumberland", "Georges River", "Inner West", "Northern Beaches"],
      ["Kiama", "Shellharbour", "Shoalhaven", "Wingecarribee", "Wollondilly", "Wollongong"],
      ["Bega Valley", "Eurobodalla"],
      ["Snowy Monaro"],
      ["ACT"],
      ["Goulburn Mulwaree", "Upper Lachlan", "Yass Valley", "Queanbeyan-Palerang"],
      ["Bathurst", "Blayney", "Cabonne", "Cowra", "Lithgow", "Mid-Western", "Oberon", "Orange"],
      ["Glen Innes Severn", "Tenterfield", "Uralla", "Walcha", "Armidale"],
      ["Gunnedah", "Gwydir", "Inverell", "Liverpool Plains", "Tamworth"],
      ["Moree Plains", "Narrabri", "Walgett", "Warrumbungle"],
      ["Bogan", "Coonamble", "Gilgandra", "Warren"],
      ["Bland", "Forbes", "Lachlan", "Narromine", "Parkes", "Temora", "Weddin", "Dubbo"],
      ["Cootamundra-Gundagai", "Hilltops", "Snowy Valleys"],
      ["Albury", "Coolamon", "Greater Hume", "Junee", "Lockhart", "Wagga Wagga"],
      ["Berrigan", "Edward River", "Federation", "Murray River", "Murrumbidgee (Southern parts)"],
      ["Carrathool", "Griffith", "Hay", "Leeton", "Narrandera", "Murrumbidgee (Northern parts)"],
      ["Balranald", "Wentworth"],
      ["Bourke", "Brewarrina", "Broken Hill", "Central Darling", "Cobar"]
    ];

    // Creating a consolidated list of all the values of the council areas. flat consolidates it all together into a single array. This will be used to create a dynamic select menu.
    const areasList = (councilAreas.flat()).sort();
    const areasOptions = areasList.map((area) =>
      <option key={area} value={area}>{area}</option>
    );
    var indexValue = this.state.district;

    let fireDistrict = null;
      councilAreas.map((region, index) => {
      if (region.includes(indexValue)) {
       fireDistrict = index;
      }
      });


    return(
      <span>
      <select onChange={this.handleChange}>
        <option value="select">Select</option>
        {areasOptions}
      </select>

      <span>
      {fireDistrict}
      {this.state.district}
      </span>
      </span>
    )}
}

export default SearchCouncil
